"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

import React from "react"
import ConfiguracoesGlobais from "./ConfiguracoesGlobais"
import {
  ConfigurarNotificacoesFormValues,
  FormSchemaConfigurarNotificacoes,
} from "@/schemas/configurarNotificacoesFormSchema"
import TarefasSubtarefas from "./TarefasSubtarefas"
import {
  ConfigurarNotificacoesTarefasFormValues,
  formSchemaConfigurarTarefasNotificacoes,
} from "@/schemas/configurarNotificacoesTarefasFormSchema"
import Mural from "./Mural"
import {
  ConfigurarNotificacoesMuralFormValues,
  FormSchemaConfigurarMuralNotificacoes,
} from "@/schemas/configurarNotificacoesMuralFormSchema"

const schema = FormSchemaConfigurarNotificacoes.merge(
  formSchemaConfigurarTarefasNotificacoes.merge(
    FormSchemaConfigurarMuralNotificacoes
  )
)

export function ConfigurarNotificacoesFormEmail() {
  const form = useForm<
    ConfigurarNotificacoesFormValues &
      ConfigurarNotificacoesTarefasFormValues &
      ConfigurarNotificacoesMuralFormValues
  >({
    resolver: zodResolver(schema),
    defaultValues: {
      etapas_de_quadro: true,
      email_diario_de_tarefas: true,
      alguem_te_adicionou_como_seguidor_em_uma_tarefa: false,
      alguem_te_removeu_como_seguidor_de_uma_tarefa: false,
      nova_tarefa_criada_suas_equipes: true,
      nova_tarefa_criada_voce_esta_alocado: true,
      nova_tarefa_criada_voce_segue: false,
      comentarios_no_mural_toda_a_empresa: true,
      comentarios_no_mural_suas_equipes: true,
    },
  })

  function onSubmit(
    data: ConfigurarNotificacoesFormValues &
      ConfigurarNotificacoesTarefasFormValues &
      ConfigurarNotificacoesMuralFormValues
  ) {
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
        <ConfiguracoesGlobais form={form} />
        <TarefasSubtarefas form={form} />
        <Mural form={form} />
        <div className="fixed  left-0 right-0  bottom-0 bg-white w-full  h-16 border-t-2 pt-3 dark:bg-[#020817]">
          <Button className="absolute right-6" type="submit">
            SALVAR
          </Button>
        </div>
      </form>
    </Form>
  )
}
