import {z} from 'zod';

export const formSchema = z.object({
    id: z.string(),
    //   nome: z
    //     .string({
    //       required_error: "Campo é obrigatório.",
    //     })
    //     .min(3, {
    //       message: "Nome precisa ter no mínimo 3 caracteres.",
    //     }),
    //   client_id: z.string(),
    //   step_id: z.string().optional(),
    active: z.boolean().optional(),
    client: z.string({
        required_error: "Cliente é obrigatório",
    }),
    project_group: z.string({
        required_error: "Cliente é obrigatório",
    }),
    callbackURL: z.any(),
})

export type projetoEditarFormType = z.infer<typeof formSchema>;