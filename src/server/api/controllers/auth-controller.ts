import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import slugify from 'slugify';

import { TLogin, TRegister } from '@interfaces/auth-user';

import {
  createUser,
  getUserByEmail,
  getUserBySlug,
  getUserWithoutPassword,
} from '../services';

export const createUniqueSlugByName = async (name: string) => {
  try {
    const slug = slugify(name, { lower: true, locale: 'fr' });
    let uniqueSlug = slug;
    while (await getUserBySlug(uniqueSlug)) {
      uniqueSlug = `${slug}-${Math.random().toString(36).substring(2, 8)}`;
    }
    return uniqueSlug;
  } catch (e) {
    throw new TRPCError(e);
  }
};

export const loginController = async (loginCredentials: TLogin) => {
  const { email, password } = loginCredentials;

  const userFound = await getUserByEmail(email);

  if (!userFound) {
    throw new Error('Vos identifiants sont incorrects.');
  } else {
    if (!userFound?.password) {
      throw new Error(
        'Veuillez vous connecter via google pour accéder à votre compte.'
      );
    }
    const match = await bcrypt.compare(password, userFound?.password);
    if (!match) {
      throw new Error('Identifiants incorrects. veuillez réessayer.');
    }
    return getUserWithoutPassword({ ...userFound, id: userFound.id });
  }
};

export const registerController = async (registerCredentials: TRegister) => {
  const { email, password, firstName, isCustomer, isProvider, lastName } =
    registerCredentials;

  try {
    const userFound = await getUserByEmail(email);
    if (userFound) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Cet utilisateur existe déjà. Veuillez vous connecter. ',
      });
    } else {
      const name = `${firstName} ${lastName}`;
      const hashedPassword = await bcrypt.hash(password, 10);
      const uniqueSlug = await createUniqueSlugByName(name);

      const userCreated = await createUser({
        data: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          is_provider: isProvider,
          is_purchaser: isCustomer,
          password: hashedPassword,
          slug: uniqueSlug,
        },
      });
      const UserName = `${userCreated?.first_name} ${userCreated?.last_name}`;

      return {
        user: getUserWithoutPassword(userCreated),
        success: true,
        redirect_url: '/login',
        message: `Votre compte a bien été crée ${UserName}, veuillez vous connecter afin d'accéder à votre espace personnel.`,
      };
    }
  } catch (e) {
    throw new TRPCError(e);
  }
};
