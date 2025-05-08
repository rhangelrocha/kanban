"use client"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Secao from "./Secao"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UseFormReturn } from "react-hook-form"
import { ConfiguracoesFormValues } from "@/schemas/configuracoesFormSchema"
import { Input } from "@/components/ui/input"

export default function SecaoComentariosAnexos({
  form,
}: {
  form: UseFormReturn<ConfiguracoesFormValues>
}) {
  const alterar_anexos = form.watch("alteracoes_comentarios_anexos")

  return (
    <Secao titulo="Comentários e anexos" id="comentarios-anexos">
      <FormField
        control={form.control}
        name="permitir_respostas_por_email"
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
                Permitir que os usuários respondam aos comentários por e-mail.
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bloquear_funcao_anexar_arquivos_imagens"
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
                Bloquear a função “anexar arquivos e imagens” para todos os
                usuários.
              </FormLabel>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="alteracoes_comentarios_anexos"
        render={({ field }) => (
          <FormItem className="space-y-3 pl-5 mt-3">
            <FormLabel className="font-bold">
              Alterações em comentários e anexos
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-start space-x-3  space-y-0">
                  <FormControl className="mt-2">
                    <RadioGroupItem value="permitir" />
                  </FormControl>
                  <div className="">
                    <FormLabel className="font-normal cursor-pointer">
                      Permitir que usuários editem ou apaguem
                    </FormLabel>
                    <FormDescription>
                      Usuários podem editar ou apagar seus comentários ou anexos
                      a qualquer momento. Administradores podem apagar quaisquer
                      comentários ou anexos.{" "}
                    </FormDescription>
                  </div>
                </FormItem>
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl className="mt-2">
                    <RadioGroupItem value="bloquear" />
                  </FormControl>
                  <div className="">
                    <FormLabel className="font-normal cursor-pointer">
                      Bloquear que usuários editem ou apaguem
                    </FormLabel>
                    <FormDescription>
                      Impede que comentários e anexos de uma tarefa sejam
                      apagados ou alterados após um determinado tempo. Por
                      padrão esse período é de 15 minutos, e pode ser ajustado
                      até 24 horas.
                    </FormDescription>
                  </div>

                  <FormField
                    control={form.control}
                    name="tempo_bloqueio"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormControl>
                          <Input
                            {...field}
                            type="time"
                            className="w-16"
                            value={
                              alterar_anexos === "permitir"
                                ? "00:00"
                                : field.value
                            }
                            disabled={alterar_anexos === "permitir"}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Secao>
  )
}
