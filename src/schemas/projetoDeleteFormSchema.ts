import {z} from 'zod';

export const formSchema = z.object({
  confirmar_apagar: z
    .string().min(1, {message: "Campo obrigatório"})
    .refine((value) => value === "APAGAR", {
      message: "Digite a palavra 'APAGAR' para confirmar a exclusão",
    }),
  
  id: z.string(),
   
})

export type projetoDeleteFormType = z.infer<typeof formSchema>;