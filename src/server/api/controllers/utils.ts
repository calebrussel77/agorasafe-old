import { User } from '@prisma/client';

import { cloudinaryConfig } from '@utils/cloudinary-config';

import { exclude } from '../services';

export const getUserWithoutPassword = <T extends User>(userData: T) =>
  exclude(userData, ['password']);

export const getUploadedFile = async (
  file,
  { public_id, folder = 'users' }
) => {
  const res = await cloudinaryConfig.uploader.upload(file, {
    public_id,
    folder,
  });

  return res;
};
