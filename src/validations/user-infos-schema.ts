import { Sex } from '@prisma/client';
import { z } from 'zod';

import { MAX_IMAGE_UPLOAD_SIZE } from '@constants/index';

import { dateSchema } from './shared';

export const profilSchema = z.object({
  avatar: z
    .any()
    .or(z.string())
    .refine(files => {
      const file = Array.isArray(files) ? files?.[0] : files;
      if (file) {
        return file?.size < MAX_IMAGE_UPLOAD_SIZE;
      }
      return true;
    }, `La taille maximale d'upload de photo est de 2MB.`)
    .optional(),
  // .refine(files => Boolean(files?.name), 'Image is required.'),
  website_url: z.string().optional(),
  bio: z.string().optional(),
  is_provider: z.boolean(),
  is_purchaser: z.boolean(),
  is_home_service_provider: z.boolean(),
  is_remote_service_provider: z.boolean(),
});

export const personalInfosSchema = z.object({
  first_name: z.string().min(2, { message: 'Votre nom est requis' }).trim(),
  last_name: z.string().min(2, { message: 'Votre prénom est requis' }).trim(),
  phone: z.string().optional(),
  adresse: z
    .string()
    .min(2, { message: 'Votre adresse de localisation est requise' })
    .trim(),
  birthdate: dateSchema
    .max(new Date(), 'Insérez une date antérieure à la date du jour.')
    .or(z.string().length(0).optional())
    .nullish()
    .optional(),
  sex: z.nativeEnum(Sex),
});
