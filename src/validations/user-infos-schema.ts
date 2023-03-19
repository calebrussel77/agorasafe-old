import { Sex } from '@prisma/client';
import { z } from 'zod';

import { MAX_IMAGE_UPLOAD_SIZE } from '@constants/index';

import { dateSchema } from './shared';

export const showCaseSchema = z.object({
  photos: z
    .array(
      z.object({
        name: z.string().nullish().optional(),
        description: z.string().nullish().optional(),
        file: z
          .any()
          .refine(files => {
            const file = Array.isArray(files) ? files?.[0] : files;
            if (file) {
              return file?.size < MAX_IMAGE_UPLOAD_SIZE;
            }
            return true;
          }, `Le poids max. de la photo est de 2MB.`)
          .optional(),
      })
    )
    .max(3)
    .optional(),

  skills: z
    .array(
      z.object({
        label: z.string().optional(),
        value: z.string().optional(),
      })
    )
    .optional(),
});

export const profilSchema = z.object({
  avatar: z
    .any()
    .refine(files => {
      const file = Array.isArray(files) ? files?.[0] : files;
      if (file) {
        return file?.size < MAX_IMAGE_UPLOAD_SIZE;
      }
      return true;
    }, `Le poids max. de l'avatar est de 2MB.`)
    .optional(),
  // .refine(files => Boolean(files?.name), 'Image is required.'),
  website_url: z.string().nullish().optional(),
  bio: z.string().nullish().optional(),
  is_provider: z.boolean().optional(),
  is_purchaser: z.boolean().optional(),
  is_home_service_provider: z.boolean().optional(),
  is_remote_service_provider: z.boolean().optional(),
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
