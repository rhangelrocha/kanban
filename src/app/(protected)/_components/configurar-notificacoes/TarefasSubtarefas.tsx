"use client"
import { UseFormReturn } from "react-hook-form"
import RowSecaoTarefas from "./RowSecaoTarefas"

import MarcarTodasOpcoes from "./MarcarTodasOpcoes"
import { ConfigurarNotificacoesTarefasFormValues } from "@/schemas/configurarNotificacoesTarefasFormSchema"

export default function TarefasSubtarefas({
  form,
}: {
  form: UseFormReturn<ConfigurarNotificacoesTarefasFormValues>
}) {
  const handleCheckedChange = (suffix: string, checked: boolean) => {
    for (const name of Object.keys(form.getValues())) {
      if (name.endsWith(suffix)) {
        form.setValue(
          name as keyof ConfigurarNotificacoesTarefasFormValues,
          checked
        )
      }
    }
  }
  return (
    <>
      <div className="pt-10 pb-2 grid grid-cols-custom">
        <h2 className="font-bold">Tarefas/Subtarefas</h2>
        <MarcarTodasOpcoes
          titulo="Você está alocado"
          onCheckedChange={(checked) =>
            handleCheckedChange("_voce_esta_alocado", checked)
          }
        />
        <MarcarTodasOpcoes
          titulo="Você criou"
          onCheckedChange={(checked) =>
            handleCheckedChange("_voce_criou", checked)
          }
        />
        <MarcarTodasOpcoes
          titulo="Você segue"
          onCheckedChange={(checked) =>
            handleCheckedChange("_voce_segue", checked)
          }
        />
        <MarcarTodasOpcoes
          titulo="Suas equipes"
          onCheckedChange={(checked) =>
            handleCheckedChange("_suas_equipes", checked)
          }
        />
      </div>
      <RowSecaoTarefas
        form={form}
        titulo="Nova tarefa criada"
        names={[
          "nova_tarefa_criada_voce_esta_alocado",
          "nova_tarefa_criada_voce_segue",
          "nova_tarefa_criada_suas_equipes",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Tarefa marcada como urgente"
        names={[
          "tarefa_marcada_como_urgente_voce_esta_alocado",
          "tarefa_marcada_como_urgente_voce_segue",
          "tarefa_marcada_como_urgente_suas_equipes",
          "tarefa_marcada_como_urgente_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Tarefa desmarcada como urgente"
        names={[
          "tarefa_desmarcada_como_urgente_voce_esta_alocado",
          "tarefa_desmarcada_como_urgente_voce_segue",
          "tarefa_desmarcada_como_urgente_suas_equipes",
          "tarefa_desmarcada_como_urgente_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Tarefa foi transferida para equipe ou usuário"
        names={[
          "tarefa_foi_transferida_para_equipe_ou_usuario_voce_esta_alocado",
          "tarefa_foi_transferida_para_equipe_ou_usuario_voce_segue",
          "tarefa_foi_transferida_para_equipe_ou_usuario_suas_equipes",
          "tarefa_foi_transferida_para_equipe_ou_usuario_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Teve início trabalho na tarefa"
        names={[
          "teve_inicio_trabalho_na_tarefa_voce_esta_alocado",
          "teve_inicio_trabalho_na_tarefa_voce_segue",

          "teve_inicio_trabalho_na_tarefa_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Tarefa foi fechada"
        names={[
          "tarefa_foi_fechada_voce_esta_alocado",
          "tarefa_foi_fechada_voce_segue",

          "tarefa_foi_fechada_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Parte da tarefa foi fechada"
        names={[
          "parte_da_tarefa_foi_fechada_voce_esta_alocado",
          "parte_da_tarefa_foi_fechada_voce_segue",

          "parte_da_tarefa_foi_fechada_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Tarefa foi reaberta"
        names={[
          "tarefa_foi_reaberta_voce_esta_alocado",
          "tarefa_foi_reaberta_voce_segue",

          "tarefa_foi_reaberta_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Parte da tarefa foi reaberta"
        names={[
          "parte_da_tarefa_foi_reaberta_voce_esta_alocado",
          "parte_da_tarefa_foi_reaberta_voce_segue",

          "parte_da_tarefa_foi_reaberta_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Tarefa foi convertida ou movida para outra tarefa/subtarefa"
        names={[
          "tarefa_foi_convertida_ou_movida_para_outra_tarefa_subtarefa_voce_esta_alocado",
          "tarefa_foi_convertida_ou_movida_para_outra_tarefa_subtarefa_voce_segue",

          "tarefa_foi_convertida_ou_movida_para_outra_tarefa_subtarefa_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Comentário na tarefa (Novo comentário, responder e editar)"
        names={[
          "comentario_na_tarefa_novo_comentario_responder_e_editar_voce_esta_alocado",
          "comentario_na_tarefa_novo_comentario_responder_e_editar_voce_segue",
          "comentario_na_tarefa_novo_comentario_responder_e_editar_suas_equipes",
          "comentario_na_tarefa_novo_comentario_responder_e_editar_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Novo seguidor na tarefa"
        names={[
          "novo_seguidor_na_tarefa_voce_esta_alocado",
          "novo_seguidor_na_tarefa_voce_segue",

          "novo_seguidor_na_tarefa_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Tarefa perdeu seguidor"
        names={[
          "tarefa_perdeu_seguidor_voce_esta_alocado",
          "tarefa_perdeu_seguidor_voce_segue",

          "tarefa_perdeu_seguidor_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Status de aprovação individuais de aprovação e reprovação"
        names={[
          "status_de_aprovacao_individuais_de_aprovacao_e_reprovacao_voce_esta_alocado",
          "status_de_aprovacao_individuais_de_aprovacao_e_reprovacao_voce_segue",

          "status_de_aprovacao_individuais_de_aprovacao_e_reprovacao_voce_criou",
        ]}
        card="Notifica o status de cada usuário quando for de aprovação ou reprovação"
      />
      <RowSecaoTarefas
        form={form}
        titulo="Status de aprovação geral da tarefa"
        names={[
          "status_de_aprovacao_geral_da_tarefa_voce_esta_alocado",
          "status_de_aprovacao_geral_da_tarefa_voce_segue",

          "status_de_aprovacao_geral_da_tarefa_voce_criou",
        ]}
        card="Apenas notifica quando houver a primeira reprovação da tarefa, quando todos aprovarem ou o status voltar a ser pendente"
      />
      <RowSecaoTarefas
        form={form}
        titulo="Solicitação de aprovação editada"
        names={[
          "solicitacao_de_aprovacao_editada_voce_esta_alocado",
          "solicitacao_de_aprovacao_editada_voce_segue",

          "solicitacao_de_aprovacao_editada_voce_criou",
        ]}
        card="Notifica o status de cada usuário quando for de aprovação ou reprovação"
      />
      <RowSecaoTarefas
        form={form}
        titulo="Novo anexo na tarefa"
        names={[
          "novo_anexo_na_tarefa_voce_esta_alocado",
          "novo_anexo_na_tarefa_voce_segue",

          "novo_anexo_na_tarefa_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Tarefa apagada"
        names={[
          "tarefa_apagada_voce_esta_alocado",
          "tarefa_apagada_voce_segue",
          "tarefa_apagada_suas_equipes",
          "tarefa_apagada_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Novo usuário foi alocado"
        names={[
          "novo_usuario_foi_alocado_voce_esta_alocado",
          "novo_usuario_foi_alocado_voce_segue",

          "novo_usuario_foi_alocado_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Um usuário foi desalocado"
        names={[
          "um_usuario_foi_desalocado_voce_esta_alocado",
          "um_usuario_foi_desalocado_voce_segue",

          "um_usuario_foi_desalocado_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Tarefa perdeu prioridade"
        names={["tarefa_perdeu_prioridade_voce_esta_alocado"]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Alteração de pré-requisitos da tarefa"
        names={["alteracao_de_pre_requisitos_da_tarefa_voce_esta_alocado"]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Tarefa agendada começará em 10 minutos"
        names={[
          "tarefa_agendada_comecara_em_10_minutos_voce_esta_alocado",

          "tarefa_agendada_comecara_em_10_minutos_suas_equipes",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Tarefa foi compartilhada"
        names={[
          "tarefa_foi_compartilhada_voce_esta_alocado",
          "tarefa_foi_compartilhada_voce_segue",
          "tarefa_foi_compartilhada_suas_equipes",
          "tarefa_foi_compartilhada_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Aprovação/Reprovação de anexos de tarefas"
        names={[
          "aprovacao_reprovacao_de_anexos_de_tarefas_voce_esta_alocado",
          "aprovacao_reprovacao_de_anexos_de_tarefas_voce_segue",
          "aprovacao_reprovacao_de_anexos_de_tarefas_suas_equipes",
          "aprovacao_reprovacao_de_anexos_de_tarefas_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Mensagens no chat do anexo com usuário externo"
        names={[
          "mensagens_no_chat_do_anexo_com_usuario_convidado_voce_esta_alocado",
          "mensagens_no_chat_do_anexo_com_usuario_convidado_voce_segue",
          "mensagens_no_chat_do_anexo_com_usuario_convidado_suas_equipes",
          "mensagens_no_chat_do_anexo_com_usuario_convidado_voce_criou",
        ]}
      />
      <RowSecaoTarefas
        form={form}
        titulo="Mensagens no chat da tarefa com usuário externo"
        names={[
          "mensagens_no_chat_da_tarefa_com_usuario_convidado_voce_esta_alocado",
          "mensagens_no_chat_da_tarefa_com_usuario_convidado_voce_segue",
          "mensagens_no_chat_da_tarefa_com_usuario_convidado_suas_equipes",
          "mensagens_no_chat_da_tarefa_com_usuario_convidado_voce_criou",
        ]}
      />
    </>
  )
}
