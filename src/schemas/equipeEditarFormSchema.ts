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
  lideres: z
  .array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  )
    .optional()
    .refine((lider) => lider !== undefined && lider.length > 0, {
      message: "Campo é obrigatório.",
    }),
  centro_de_custo: z.string().optional(),
  membros: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .optional()
    .refine((membros) => membros !== undefined && membros.length > 0, {
      message: "Campo é obrigatório.",
    }),
})

export type equipeEditarFormType = z.infer<typeof formSchema>;