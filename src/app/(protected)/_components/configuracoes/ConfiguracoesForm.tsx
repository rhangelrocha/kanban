"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

import SecaoUsuario from "./SecaoUsuario"
import SecaoUsuariosConvidados from "./SecaoUsuariosConvidados"
import SecaoTarefas from "./SecaoTarefas"
import SecaoComentariosAnexos from "./SecaoComentariosAnexos"
import SecaoClienteProjeto from "./SecaoClienteProjeto"
import SecaoMural from "./SecaoMural"
import SecaoGestaoTempo from "./SecaoGestaoTempo"
import {
  ConfiguracoesFormValues,
  FormSchema,
} from "@/schemas/configuracoesFormSchema"

export function ConfiguracoesForm() {
  const form = useForm<ConfiguracoesFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      mudar_fotos: true,
      criem_recebam_tarefas: true,
      gerencie_tags: false,
      criem_quadros: false,
      criem_portais: false,
      criem_gerenciem_clientes_projetos: true,
      permitir_acoes_em_massa: false,
      politica_senha_restritiva: false,
      type: "all",
      habilitar_compartilhamento_com_usuarios_convidados: false,
      apenas_administradores_podem_apagar_tarefas: false,
      habilitar_pontuacao_scrum: false,
      entregar_tarefa_ao_finalizar_ultima_parte: true,
      criem_recebam_tarefas_via_formulario: false,
      alterar_data_entrega_desejada_tarefa_pre_requisito: true,
      permitir_respostas_por_email: false,
      bloquear_funcao_anexar_arquivos_imagens: false,
      alteracoes_comentarios_anexos: "permitir",
      tempo_bloqueio: "00:15",
      habilitar_cliente_projeto: true,
      habilitar_grupo_projeto: true,
      habilitar_subgrupo_projeto: false,
      habilitar_mural: false,
      habilitar_gestao_tempo: true,
      tempo_contado: "tempo_padrao",
      lembrar_registro_entrega: true,
      limitar_dias_uteis_anteriores: true,
      total_de_dias: 3,
      registro_tempo_inferior: true,
      porcentagem_inferior: 10,
      registro_tempo_superior: true,
      porcentagem_superior: 110,
    },
  })

  function onSubmit(data: ConfiguracoesFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[1040px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <SecaoUsuario form={form} />
        <SecaoUsuariosConvidados form={form} />
        <SecaoTarefas form={form} />
        <SecaoComentariosAnexos form={form} />
        <SecaoClienteProjeto form={form} />
        <SecaoMural form={form} />
        <SecaoGestaoTempo form={form} />

        <div className="fixed bottom-0 bg-white w-full max-w-2xl h-16 border-t-2 pt-3 dark:bg-[#020817]">
          <Button type="submit">SALVAR</Button>
        </div>
      </form>
    </Form>
  )
}
