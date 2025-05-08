"use client"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { ConfiguracoesFormValues } from "@/schemas/configuracoesFormSchema"
import { ConfigurarNotificacoesFormValues } from "@/schemas/configurarNotificacoesFormSchema"
import { UseFormReturn } from "react-hook-form"

export default function RowSecaoGlobal({
  titulo,
  form,
  name,
}: {
  titulo: string
  form: UseFormReturn<ConfigurarNotificacoesFormValues>
  name: keyof ConfigurarNotificacoesFormValues
  names?: Array<keyof ConfigurarNotificacoesFormValues>
}) {
  return (
    <div className="grid grid-cols-custom pt-6 items-center border-t-2">
      <div>{titulo}</div>

      <div className=" justify-self-center">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
