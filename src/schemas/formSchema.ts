import { z } from 'zod';


export const formSchema = z.object({
  name: z
    .string().min(2, { message: "Mínimo de 2 caracteres" }),
  date: z.date().refine(date => !isNaN(date.getTime()), {
    message: "Data inválida"
  }),
});
