import { z } from 'zod';

import { loginSchema, registerSchema } from '@validations/auth-user-schema';

export type TRegister = z.infer<typeof registerSchema>;

export type TLogin = z.infer<typeof loginSchema>;
