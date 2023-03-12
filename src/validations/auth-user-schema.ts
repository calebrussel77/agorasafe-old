import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(2, { message: 'Votre adresse email est requise' })
    .email('Cette adresse email est invalide')
    .trim(),
  password: z
    .string()
    .min(6, 'Votre mot de passe doit contenir au moins 06 charactères')
    .trim(),
});

export const registerSchema = loginSchema
  .extend({
    firstName: z.string().min(2, { message: 'Votre nom est requis' }).trim(),
    lastName: z.string().min(2, { message: 'Votre prénom est requis' }).trim(),
    confirmPassword: z
      .string()
      .min(6, 'Veuillez ressaisir votre mot de passe')
      .trim(),
    isProvider: z.boolean(),
    isCustomer: z.boolean(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmError'], // path of error
  })
  .refine(
    data => {
      if (!data.isCustomer && !data.isProvider) {
        return false;
      }
      return true;
    },
    {
      message: 'Vous devez sélectionner au moins une option de souhait',
      path: ['desireError'], // path of error
    }
  );
