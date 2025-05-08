import { z } from "zod"

export const FormSchemaConfigurarMuralNotificacoes = z.object({
  comentarios_no_mural_toda_a_empresa: z.boolean().default(false).optional(),
  comentarios_no_mural_suas_equipes: z.boolean().default(false).optional(),

 
})

export type ConfigurarNotificacoesMuralFormValues = z.infer<typeof FormSchemaConfigurarMuralNotificacoes>