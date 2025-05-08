"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

import React from "react"

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
import EtapasdoQuadro from "./EtapasdoQuadro"
import {
  ConfigurarNotificacoesEtapasQuadroFormValues,
  FormSchemaConfigurarEtapasQuadroNotificacoes,
} from "@/schemas/configurarNotificacoesEtapasQuadroFormSchema"

const schema = formSchemaConfigurarTarefasNotificacoes
  .merge(FormSchemaConfigurarMuralNotificacoes)
  .merge(FormSchemaConfigurarEtapasQuadroNotificacoes)

export function ConfigurarNotificacoesFormWeb() {
  const form = useForm<
    ConfigurarNotificacoesTarefasFormValues &
      ConfigurarNotificacoesMuralFormValues &
      ConfigurarNotificacoesEtapasQuadroFormValues
  >({
    resolver: zodResolver(schema),
    defaultValues: {},
  })

  function onSubmit(
    data: ConfigurarNotificacoesTarefasFormValues &
      ConfigurarNotificacoesMuralFormValues &
      ConfigurarNotificacoesEtapasQuadroFormValues
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
        <TarefasSubtarefas form={form} />
        <Mural form={form} />
        <EtapasdoQuadro form={form} />
        <div className="fixed  left-0 right-0  bottom-0 bg-white w-full  h-16 border-t-2 pt-3 dark:bg-[#020817]">
          <Button className="absolute right-6" type="submit">
            SALVAR
          </Button>
        </div>
      </form>
    </Form>
  )
}
