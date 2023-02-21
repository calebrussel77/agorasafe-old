import { z } from 'zod';

export const SubscriptionSchema = z.object({
  name: z.string().min(1, { message: 'Votre nom est requis' }).trim(),
  email: z
    .string()
    .min(1, { message: 'Votre adresse email est requise' })
    .email('Cette adresse email est invalide'),
});

export type TSubscriptionForm = z.infer<typeof SubscriptionSchema>;
