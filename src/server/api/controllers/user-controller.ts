import { TRPCError } from '@trpc/server';
import { Session } from 'next-auth';

import { formatDateToString, getTimestampInSeconds } from '@helpers/misc';

import { TUserInfosUpdate } from '@interfaces/user-infos';

import { ME_ERROR_MESSAGE } from '@constants/index';

import { getUserById, updateUser } from '../services';
import { getUploadedFile, getUserWithoutPassword } from './utils';

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
    photos,
    skills: requestedSkills,
  } = updateDataCredentials;

  const userId = session?.user?.id;

  try {
    const { skills, show_case_photos, ...userRestFoundData } =
      await getUserById(userId);

    if (!userRestFoundData) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: "Vous n'avez pas le droit d'effectuer cette action ",
      });
    }

    let newAvatarUrl = avatar || userRestFoundData?.avatar;
    if (avatar && typeof avatar !== 'string') {
      const timestamps = getTimestampInSeconds();
      const cloudinaryResponse = await getUploadedFile(avatar?.preview, {
        public_id: `${userRestFoundData?.slug}-${timestamps}`,
      });
      newAvatarUrl = cloudinaryResponse.secure_url;
    }

    const updatedUser = await updateUser({
      where: { id: userId },
      data: {
        ...userRestFoundData,
        first_name,
        last_name,
        is_purchaser,
        is_provider,
        website_url,
        bio,
        birthdate,
        is_home_service_provider,
        is_remote_service_provider,
        adresse,
        phone,
        sex,
        avatar: newAvatarUrl,
        skills: {
          connect: requestedSkills
            ?.filter(el => el?.value)
            ?.map(el => ({ id: el?.value })),
        },
      },
    });

    const message = 'Vos informations ont bien été mise à jour.';
    const user = getUserWithoutPassword(updatedUser);

    return { user, success: true, message };
  } catch (error) {
    throw new TRPCError(error);
  }
};

export const getUserMeController = async (userId: string) => {
  try {
    const userFound = await getUserById(userId);
    if (!userFound) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: ME_ERROR_MESSAGE,
      });
    } else {
      const userData = getUserWithoutPassword(userFound);

      return {
        user: {
          ...userData,
          birthdate: formatDateToString(userData?.birthdate),
        },
        success: true,
        message: `Informations de ${userFound?.first_name}`,
      };
    }
  } catch (e) {
    throw new TRPCError(e);
  }
};
