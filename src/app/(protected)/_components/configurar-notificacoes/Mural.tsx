"use client"
import { UseFormReturn } from "react-hook-form"

import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { ConfigurarNotificacoesMuralFormValues } from "@/schemas/configurarNotificacoesMuralFormSchema"

export default function Mural({
  form,
}: {
  form: UseFormReturn<ConfigurarNotificacoesMuralFormValues>
}) {
  return (
    <>
      <div className="pt-10 pb-2 grid grid-cols-custom">
        <h2 className="font-bold">Mural</h2>
        <p className="text-center font-bold">Toda a empresa</p>
        <p className="text-center font-bold">Suas equipes</p>
      </div>
      <div className="grid grid-cols-custom pt-6 items-center border-t-2">
        <div>Comentários no mural</div>

        <div className=" justify-self-center">
          <FormField
            control={form.control}
            name="comentarios_no_mural_toda_a_empresa"
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
        <div className=" justify-self-center">
          <FormField
            control={form.control}
            name="comentarios_no_mural_suas_equipes"
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
