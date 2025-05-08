"use client"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import Secao from "./Secao"
import { Checkbox } from "@/components/ui/checkbox"

import { UseFormReturn } from "react-hook-form"
import { ConfiguracoesFormValues } from "@/schemas/configuracoesFormSchema"

export default function SecaoUsuariosConvidados({
  form,
}: {
  form: UseFormReturn<ConfiguracoesFormValues>
}) {
  return (
    <Secao titulo="Usuários convidados" id="usuarios-convidados">
      <FormField
        control={form.control}
        name="habilitar_compartilhamento_com_usuarios_convidados"
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
                Habilitar compartilhamento de projetos e tarefas com usuários
                convidados.
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
    </Secao>
  )
}
