import { z } from "zod"

export const FormSchemaConfigurarNotificacoes = z.object({
  etapas_de_quadro: z.boolean().default(false).optional(),
  email_diario_de_tarefas: z.boolean().default(false).optional(),
  alguem_te_adicionou_como_seguidor_em_uma_tarefa: z.boolean().default(false).optional(),
  alguem_te_removeu_como_seguidor_de_uma_tarefa: z.boolean().default(false).optional(),
 
})

export type ConfigurarNotificacoesFormValues = z.infer<typeof FormSchemaConfigurarNotificacoes>