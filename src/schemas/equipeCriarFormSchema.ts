import {z} from 'zod';

export const formSchema = z.object({
  name: z
    .string().min(2, {message: "Mínimo de 2 caracteres"}),

   
})

export type equipeCriarFormType = z.infer<typeof formSchema>;