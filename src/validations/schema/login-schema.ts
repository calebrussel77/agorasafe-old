import {registerSchema} from './register-schema';

export const loginSchema = registerSchema.pick({email: true, password: true});
