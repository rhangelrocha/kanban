import {z} from 'zod';

export const projetoCreateFormType = z.object({
    name: z
        .string({
            required_error: "Campo é obrigatório.",
        })
        .min(3, {
            message: "Nome do projeto precisa ter no mínimo 3 caracteres.",
        }),
    clientId: z.string().min(1, "A seleção de um cliente é obrigatória."),
    groupId: z.optional(z.string()),
    callbackURL: z.any(),
})