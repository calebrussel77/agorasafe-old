import { TRPCError } from '@trpc/server';
import { Session } from 'next-auth';

import { TUserInfosUpdate } from '@interfaces/user-infos';

import { getUserById, updateUser } from '../services';
import { getUserWithoutPassword } from './utils';

export const updateUserInfosController = async (
  updateDataCredentials: TUserInfosUpdate,
  session: Session
) => {
  const {
    first_name,
    is_purchaser,
    is_provider,
    last_name,
    bio,
    avatar,
    birthdate,
    is_home_service_provider,
    is_remote_service_provider,
    adresse,
    phone,
    sex,
    website_url,
  } = updateDataCredentials;

  const userId = session?.user?.id;

  try {
    const userFound = await getUserById(userId);
    if (!userFound) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: "Vous n'avez pas le droit d'effectuer cette action ",
      });
    } else {
      const updatedUser = await updateUser({
        where: {
          id: userId,
        },
        data: {
          first_name: first_name || userFound.first_name,
          last_name: last_name || userFound.last_name,
          is_provider: is_provider || userFound.is_provider,
          is_purchaser: is_purchaser || userFound.is_purchaser,
          is_remote_service_provider:
            is_remote_service_provider || userFound.is_remote_service_provider,
          bio: bio || userFound.bio,
          birthdate: birthdate || userFound.birthdate,
          is_home_service_provider:
            is_home_service_provider || userFound.is_home_service_provider,
          adresse: adresse || userFound.adresse,
          website_url: website_url || userFound.website_url,
          phone: phone || userFound.phone,
          sex: sex || userFound.sex,
        },
      });

      return {
        user: getUserWithoutPassword(updatedUser),
        success: true,
        message: `Vos informations ont bien été mise à jour.`,
      };
    }
  } catch (e) {
    throw new TRPCError(e);
  }
};

export const getUserMeController = async (session: Session) => {
  const userId = session?.user?.id;

  try {
    const userFound = await getUserById(userId);
    if (!userFound) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: "Vous n'avez pas le droit d'effectuer cette action ",
      });
    } else {
      return {
        user: getUserWithoutPassword(userFound),
        success: true,
        message: `Informations de ${userFound?.first_name}`,
      };
    }
  } catch (e) {
    throw new TRPCError(e);
  }
};
