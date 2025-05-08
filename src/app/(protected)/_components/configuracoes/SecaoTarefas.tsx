"use client"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import Secao from "./Secao"
import { Checkbox } from "@/components/ui/checkbox"
import { UseFormReturn } from "react-hook-form"
import { ConfiguracoesFormValues } from "@/schemas/configuracoesFormSchema"

export default function SecaoTarefas({
  form,
}: {
  form: UseFormReturn<ConfiguracoesFormValues>
}) {
  return (
    <Secao titulo="Tarefas" id="tarefas">
      <FormField
        control={form.control}
        name="apenas_administradores_podem_apagar_tarefas"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                Apenas Administradores podem apagar tarefas.
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="habilitar_pontuacao_scrum"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                Habilitar pontuação Scrum.
              </FormLabel>
              <FormDescription>
                Ativa a utilização de pontos em tarefas, etapas e Burnup de
                Pontos nos projetos.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="entregar_tarefa_ao_finalizar_ultima_parte"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                Entregar automaticamente a tarefa assim que todas as partes
                forem entregues.
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="criem_recebam_tarefas_via_formulario"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                Criar tarefas apenas via formulários
              </FormLabel>
              <FormDescription>
                Caso desabilitado, será possível criar tarefas a partir dos
                formulários e também pelo &quot;Criar nova tarefa&quot;. Este
                ajuste não altera a criação de tarefas pela opção
                &quot;Adicionar tarefa&quot; presente nas etapas ou pelas
                subtarefas.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <h3 className="font-bold">Tarefas pré-requisitos</h3>
      <FormField
        control={form.control}
        name="alterar_data_entrega_desejada_tarefa_pre_requisito"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                Ao alterar a data de entrega desejada de uma tarefa
                pré-requisito, as tarefas subsequentes também terão suas datas
                desejadas alteradas.
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </Secao>
  )
}
