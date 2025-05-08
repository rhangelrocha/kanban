"use client"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { ConfigurarNotificacoesTarefasFormValues } from "@/schemas/configurarNotificacoesTarefasFormSchema"
import { InfoCircledIcon } from "@radix-ui/react-icons"
import { UseFormReturn } from "react-hook-form"

export default function RowSecaoTarefas({
  titulo,
  form,
  card,
  // name,
  names,
}: {
  titulo: string
  form: UseFormReturn<ConfigurarNotificacoesTarefasFormValues>
  card?: string
  // name?: keyof ConfigurarNotificacoesTarefasFormValues
  names?: Array<keyof ConfigurarNotificacoesTarefasFormValues>
}) {
  const order = [
    "_voce_esta_alocado",
    "_voce_criou",
    "_voce_segue",
    "_suas_equipes",
  ]
  return (
    <div className="grid grid-cols-custom pt-6 items-center border-t-2">
      <div className="relative w-max">
        {titulo}
        {card && (
          <div className="absolute top-1 -right-6">
            <HoverCard openDelay={0} closeDelay={0}>
              <HoverCardTrigger>
                <InfoCircledIcon />
              </HoverCardTrigger>
              <HoverCardContent side="bottom" className="pointer-events-none">
                {card}
              </HoverCardContent>
            </HoverCard>
          </div>
        )}
      </div>
      {order.map((suffix) => {
        const name = names?.find((n) => n.endsWith(suffix))
        return (
          <div key={suffix} className="justify-self-center">
            {name ? (
              <FormField
                name={name}
                control={form.control}
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
            ) : (
              "N/A"
            )}
          </div>
        )
      })}
    </div>
  )
}
