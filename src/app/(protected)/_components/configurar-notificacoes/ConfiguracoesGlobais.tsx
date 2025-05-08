"use client"
import { UseFormReturn } from "react-hook-form"

import { ConfigurarNotificacoesFormValues } from "@/schemas/configurarNotificacoesFormSchema"
import RowSecaoGlobal from "./RowSecaoGlobal"

export default function ConfiguracoesGlobais({
  form,
}: {
  form: UseFormReturn<ConfigurarNotificacoesFormValues>
}) {
  return (
    <>
      <div className="pt-10 pb-2 grid grid-cols-custom">
        <h2 className="font-bold">Configurações globais</h2>
      </div>
      <RowSecaoGlobal
        name="etapas_de_quadro"
        form={form}
        titulo="Etapas do quadro"
      />
      <RowSecaoGlobal
        name="email_diario_de_tarefas"
        form={form}
        titulo="Email diário de tarefas"
      />
      <RowSecaoGlobal
        name="alguem_te_adicionou_como_seguidor_em_uma_tarefa"
        form={form}
        titulo="Alguém te adicionou como seguidor em uma tarefa"
      />
      <RowSecaoGlobal
        name="alguem_te_removeu_como_seguidor_de_uma_tarefa"
        form={form}
        titulo="Alguém te removeu como seguidor de uma tarefa"
      />
    </>
  )
}
