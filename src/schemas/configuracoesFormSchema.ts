import { z } from "zod"

export const FormSchema = z.object({
  mudar_fotos: z.boolean().default(false).optional(),
  criem_recebam_tarefas: z.boolean().default(false).optional(),
  gerencie_tags: z.boolean().default(false).optional(),
  criem_quadros: z.boolean().default(false).optional(),
  criem_portais: z.boolean().default(false).optional(),
  criem_gerenciem_clientes_projetos: z.boolean().default(false).optional(),
  permitir_acoes_em_massa: z.boolean().default(false).optional(),
  politica_senha_restritiva: z.boolean().default(false).optional(),
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),

  habilitar_compartilhamento_com_usuarios_convidados: z
    .boolean()
    .default(false)
    .optional(),
  apenas_administradores_podem_apagar_tarefas: z
    .boolean()
    .default(false)
    .optional(),
  habilitar_pontuacao_scrum: z.boolean().default(false).optional(),
  entregar_tarefa_ao_finalizar_ultima_parte: z
    .boolean()
    .default(false)
    .optional(),
  criem_recebam_tarefas_via_formulario: z.boolean().default(false).optional(),
  alterar_data_entrega_desejada_tarefa_pre_requisito: z
    .boolean()
    .default(false)
    .optional(),
  permitir_respostas_por_email: z.boolean().default(false).optional(),
  bloquear_funcao_anexar_arquivos_imagens: z
    .boolean()
    .default(false)
    .optional(),

  alteracoes_comentarios_anexos: z.enum(["permitir", "bloquear"], {
    required_error: "Você precisa selecionar um tipo de notificação.",
  }),

  tempo_bloqueio: z.string().default("00:00"),
  habilitar_cliente_projeto: z.boolean().default(false).optional(),
  habilitar_grupo_projeto: z.boolean().default(false).optional(),
  habilitar_subgrupo_projeto: z.boolean().default(false).optional(),
  habilitar_mural: z.boolean().default(false).optional(),
  habilitar_gestao_tempo: z.boolean().default(false).optional(),
  tempo_contado: z.enum(["smart_time", "tempo_padrao"], {
    required_error: "Você precisa selecionar um tipo de tempo",
  }),
  lembrar_registro_entrega: z.boolean().default(false).optional(),
  limitar_dias_uteis_anteriores: z.boolean().default(false).optional(),
  total_de_dias: z.number().default(0).optional(),
  registro_tempo_inferior: z.boolean().default(false).optional(),
  porcentagem_inferior: z.number().default(0).optional(),
  registro_tempo_superior: z.boolean().default(false).optional(),
  porcentagem_superior: z.number().default(0).optional(),
})

export type ConfiguracoesFormValues = z.infer<typeof FormSchema>