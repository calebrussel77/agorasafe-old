import {z} from 'zod';

export const ZHelloInput = z.object({text: z.string()});

export type THelloInput = z.infer<typeof ZHelloInput>;
