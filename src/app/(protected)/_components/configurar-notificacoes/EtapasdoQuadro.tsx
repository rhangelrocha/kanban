"use client"
import { UseFormReturn } from "react-hook-form"

import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

import { ConfigurarNotificacoesEtapasQuadroFormValues } from "@/schemas/configurarNotificacoesEtapasQuadroFormSchema"

export default function EtapasdoQuadro({
  form,
}: {
  form: UseFormReturn<ConfigurarNotificacoesEtapasQuadroFormValues>
}) {
  return (
    <>
      <div className="pt-10 pb-2 grid grid-cols-custom">
        <h2 className="font-bold">Etapas do quadro</h2>
      </div>
      <div className="grid grid-cols-custom pt-6 items-center border-t-2">
        <div>Configurações globais</div>

        <div className=" justify-self-center">
          <FormField
            control={form.control}
            name="configuracoes_globais"
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
    </>
  )
}
