import { z } from 'zod';


export const formSchema = z.object({
    id: z.string(),
    name: z
        .string({
            required_error: "Nome do projeto é obrigatório",
        })
        .min(3, {
            message: "Nome do projeto precisa ter no mínimo 3 caracteres.",
        }),
});

export type projetoTituloEditarSchema = z.infer<typeof formSchema>;