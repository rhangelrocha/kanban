import { z } from 'zod';


export const formSchema = z.object({
    id: z.string(),
    description: z.optional(z.string()),
});

export type projetoDescricaoEditarSchema = z.infer<typeof formSchema>;