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

export default function SecaoClienteProjeto({
  form,
}: {
  form: UseFormReturn<ConfiguracoesFormValues>
}) {
  return (
    <Secao titulo="Cliente > Projeto" id="cliente-projeto">
      <FormField
        control={form.control}
        name="habilitar_cliente_projeto"
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
                Habilitar Cliente {">"} Projeto
              </FormLabel>
              <FormDescription>
                As tarefas serão agrupadas dentro da hierarquia &quot;Cliente{" "}
                {">"} Projeto&quot;. Cada tarefa estará em um projeto
                especifico, vinculado a um cliente.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <h2 className="font-bold">Grupo e Subgrupo</h2>
      <FormField
        control={form.control}
        name="habilitar_grupo_projeto"
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
                Habilitar grupos de projetos
              </FormLabel>
              <FormDescription>
                Adiciona o nível Grupo na hierarquia de projetos. Exemplo:
                “Cliente &gt; Grupo &gt; Projeto”
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="habilitar_subgrupo_projeto"
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
                Habilitar subgrupos de projetos
              </FormLabel>
              <FormDescription>
                Adiciona o nível Subgrupo na hierarquia de projetos. Exemplo:{" "}
                {"Cliente > Grupo > Subgrupo > Projeto"}
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </Secao>
  )
}
