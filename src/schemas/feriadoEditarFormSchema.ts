import {z} from 'zod';

export const formSchema = z.object({
  id: z.string(),
  nome: z
    .string({
      required_error: "Campo é obrigatório.",
    })
    .min(3, {
      message: "Nome precisa ter no mínimo 3 caracteres.",
    }),
    date: z.string().optional().refine((date) =>( date !== undefined && date !== "") , {
      message: "Campo é obrigatório.",
    }),
})

export type feriadoEditarFormType = z.infer<typeof formSchema>;