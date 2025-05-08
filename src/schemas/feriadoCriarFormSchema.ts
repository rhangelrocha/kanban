import {z} from 'zod';

export const formSchema = z.object({
  name: z
    .string().min(2, {message: "Mínimo de 2 caracteres"}),
  date: z.string().optional().refine((date) =>( date !== undefined && date !== "") , {
    message: "Campo é obrigatório.",
  }),
});

export type feriadoCriarFormType = z.infer<typeof formSchema>;