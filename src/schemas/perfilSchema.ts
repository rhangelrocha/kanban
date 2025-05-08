import {z} from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const formSchema = z.object({
  avatar: z
    .any()
    .optional()
    .refine(
      (file) => file === undefined || file?.size <= MAX_FILE_SIZE,
      `Tamanho máximo de 5MB excedido.`
    )
    .refine(
      (file) => file === undefined || ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Apenas formatos .jpg, .jpeg, .png e .webp são suportados."
    ),
 
  nome: z
    .string({
      required_error: "Campo é obrigatório.",
    })
    .min(3, {
      message: "Nome precisa ter no mínimo 3 caracteres.",
    }),
  telefone: z
    .string({
      required_error: "Campo é obrigatório.",
    }).min(14, { message: "Telefone inválido." } ),
  email: z
    .string({
      required_error: "Campo é obrigatório.",
    })
    .email({
      message: "E-mail inválido.",
    }),
  cargo: z
    .string({
      required_error: "Campo é obrigatório.",
    }).optional(),

  na_empresa_desde: z.string().optional().refine((date) =>( date !== undefined && date !== "") , {
    message: "Campo é obrigatório.",
  }),
  data_de_nascimento: z.string().optional().refine((date) =>( date !== undefined && date !== "") , {
    message: "Campo é obrigatório.",
  }),
});



export type perfilFormType = z.infer<typeof formSchema>;