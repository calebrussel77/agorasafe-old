import {z} from 'zod';

export const registerSchema = z
  .object({
    firstName: z.string().min(1, {message: 'Votre nom est requis'}).trim(),
    lastName: z.string().min(1, {message: 'Votre prénom est requis'}).trim(),
    email: z
      .string()
      .min(1, {message: 'Votre adresse email est requise'})
      .email('Cette adresse email est invalide'),
    password: z
      .string()
      .min(6, 'Votre mot de passe doit contenir au moins 06 charactères')
      .trim(),
    confirm_password: z
      .string()
      .min(6, 'Veuillez ressaisir votre mot de passe')
      .trim(),
    isProvider: z.boolean(),
    isCustomer: z.boolean(),
  })
  .required();

export const registerSchemaValidation = registerSchema
  .refine(data => data.password === data.confirm_password, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirm'], // path of error
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
      path: ['desire'], // path of error
    }
  );
