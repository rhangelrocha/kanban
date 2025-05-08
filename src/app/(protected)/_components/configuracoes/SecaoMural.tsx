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

export default function SecaoMural({
  form,
}: {
  form: UseFormReturn<ConfiguracoesFormValues>
}) {
  return (
    <Secao titulo="Mural" id="mural">
      <FormField
        control={form.control}
        name="habilitar_mural"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">Habilitar mural</FormLabel>
              <FormDescription>
                Permite a publicação de mensagens para toda empresa ou equipes
                dentro da plataforma.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </Secao>
  )
}
