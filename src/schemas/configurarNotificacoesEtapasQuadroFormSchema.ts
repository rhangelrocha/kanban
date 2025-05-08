import { z } from "zod"

export const FormSchemaConfigurarEtapasQuadroNotificacoes = z.object({
  configuracoes_globais: z.boolean().default(false).optional(),


 
})

export type ConfigurarNotificacoesEtapasQuadroFormValues = z.infer<typeof FormSchemaConfigurarEtapasQuadroNotificacoes>