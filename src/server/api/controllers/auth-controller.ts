import { TRPCError } from '@trpc/server';
import bcrypt from 'bcryptjs';
import slugify from 'slugify';

import { TLogin, TRegister } from '@interfaces/auth-user';

import { createUser, getUserByEmail, getUserBySlug } from '../services';

export const createUniqueSlugByName = async (name: string) => {
  try {
    const slug = slugify(name, { lower: true, locale: 'fr' });
    let uniqueSlug = slug;
    while (await getUserBySlug(uniqueSlug)) {
      uniqueSlug = `${slug}-${Math.random().toString(36).substring(2, 8)}`;
    }
    return uniqueSlug;
  } catch (e) {
    console.log(e, 'From provider signIn');
    return null;
  }
};

export const loginController = async (loginCredentials: TLogin) => {
  const { email, password } = loginCredentials;

  const userFound = await getUserByEmail(email);
  console.log(userFound);

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
    return userFound;
  }
};

export const registerController = async (registerCredentials: TRegister) => {
  const { email, password, firstName, isCustomer, isProvider, lastName } =
    registerCredentials;

  try {
    const userFound = await getUserByEmail(email);
    if (userFound) {
      throw new Error('Cet utilisateur existe déjà. Veuillez vous connecter.');
    } else {
      const name = `${firstName} ${lastName}`;
      const hashedPassword = await bcrypt.hash(password, 10);
      const uniqueSlug = await createUniqueSlugByName(name);

      const userCreated = await createUser({
        first_name: firstName,
        last_name: lastName,
        email: email,
        is_provider: isProvider,
        is_purchaser: isCustomer,
        password: hashedPassword,
        slug: uniqueSlug,
      });
      return {
        user: userCreated,
        success: true,
        redirect_url: '/login',
        message:
          "Votre compte a bien été créer, veuillez vous connecter afin d'accéder à votre espace personnel.",
      };
    }
  } catch (e) {
    console.log(e);
    // throw new TRPCError({ code: 'UNAUTHORIZED' });
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        'Une erreur inattendue est survenue, veuillez réessayer plus tard ',
    });
  }
};
