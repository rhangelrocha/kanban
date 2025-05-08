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

import { UseFormReturn } from "react-hook-form"
import { ConfiguracoesFormValues } from "@/schemas/configuracoesFormSchema"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"

export default function SecaoGestaoTempo({
  form,
}: {
  form: UseFormReturn<ConfiguracoesFormValues>
}) {
  const limitar_dias_uteis_anteriores = form.watch(
    "limitar_dias_uteis_anteriores"
  )
  const registro_tempo_inferior = form.watch("registro_tempo_inferior")
  const registro_tempo_superior = form.watch("registro_tempo_superior")
  return (
    <Secao titulo="Gestão de tempo" id="gestao-tempo">
      <FormField
        control={form.control}
        name="habilitar_gestao_tempo"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none mb-3">
              <FormLabel className="cursor-pointer">
                Habilitar a contabilização de tempo
              </FormLabel>
              <FormDescription>
                Permite que o usuário registre horas trabalhadas em uma tarefa.
                Ao ativar esse recurso as seguintes funcionalidades serão
                habilitadas:
              </FormDescription>

              <ul className="list-disc pl-6 pt-3 text-[0.8rem] text-muted-foreground">
                <li className="mb-2">Custos</li>
                <li className="mb-2">Gantt e Capacidade</li>
                <li className="mb-2">Esforço por tipo de tarefa</li>
                <li className="mb-2">Métricas relacionadas a tempo</li>
                <li className="mb-2">Relatórios relacionados a tempo</li>
              </ul>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tempo_contado"
        render={({ field }) => (
          <FormItem className="space-y-3 pl-5 mt-3">
            <FormLabel className="font-bold">Como o tempo é contado</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-start space-x-3  space-y-0">
                  <FormControl className="mt-2">
                    <RadioGroupItem value="smart_time" />
                  </FormControl>
                  <div className="">
                    <FormLabel className="font-normal cursor-pointer">
                      Smart Time Tracking
                    </FormLabel>
                    <FormDescription>
                      Contabiliza apenas horas úteis com base na jornada de
                      trabalho configurada para cada usuário.
                    </FormDescription>
                  </div>
                </FormItem>
                <FormItem className="flex items-start space-x-3 space-y-0">
                  <FormControl className="mt-2">
                    <RadioGroupItem value="tempo_padrao" />
                  </FormControl>
                  <div className="">
                    <FormLabel className="font-normal cursor-pointer">
                      Contabilização de tempo padrão
                    </FormLabel>
                    <FormDescription>
                      Contabiliza todas as horas em que a tarefa estiver com o
                      play ligado.
                    </FormDescription>
                  </div>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <h2 className="font-bold mt-5">Tarefas sem registro de horas</h2>
      <FormField
        control={form.control}
        name="lembrar_registro_entrega"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none mb-3">
              <FormLabel className="cursor-pointer">
                Lembrar sobre o registro no momento da entrega
              </FormLabel>
              <FormDescription>
                Quando o usuário for entregar uma tarefa sem ter registrado suas
                horas trabalhadas, solicitar que ele confirme o tempo investido.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <h2 className="font-bold mt-5">Ajuste de horas</h2>
      <FormField
        control={form.control}
        name="limitar_dias_uteis_anteriores"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none mb-3">
              <FormLabel className="cursor-pointer">
                Limitar a quantidade de dias úteis anteriores em que o ajuste de
                horas poderá ser feito
              </FormLabel>
              <FormDescription>
                Se desmarcado, não haverá limite de dias para ajustar horas nas
                tarefas.
              </FormDescription>
            </div>
            <FormField
              control={form.control}
              name="total_de_dias"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <Input
                      disabled={limitar_dias_uteis_anteriores ? false : true}
                      {...field}
                      // value={limitar_dias_uteis_anteriores ? field.value : ""}
                      type="number"
                      className="w-20"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormItem>
        )}
      />
      <h2 className="font-bold mt-5 mb-2">
        Bloqueio de acesso para ajustes de registro de tempo
      </h2>
      <p className="text-sm">
        Bloqueia o usuário no sistema para que justifique ou ajuste as horas
        trabalhadas. Por padrão, o bloqueio não é habilitado para
        administradores, gestores ou usuários que não estejam alocados em
        nenhuma tarefa. Estas alterações serão válidas a partir do dia seguinte.
        O bloqueio ocorrerá nos últimos 6 dias caso:
      </p>

      <FormField
        control={form.control}
        name="registro_tempo_inferior"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0  p-4">
            <div className="flex  space-x-3 items-center">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="leading-none ">
                <FormLabel className="cursor-pointer">
                  O registro da sua jornada diária tenha sido inferior a
                </FormLabel>
              </div>
            </div>
            <FormField
              control={form.control}
              name="porcentagem_inferior"
              render={({ field }) => (
                <FormItem className="flex gap-2">
                  <FormControl>
                    <Input
                      {...field}
                      // value={registro_tempo_inferior ? field.value : ""}
                      type="number"
                      className="w-20"
                      disabled={registro_tempo_inferior ? false : true}
                    />
                  </FormControl>
                  <FormDescription className="font-bold"> % </FormDescription>
                </FormItem>
              )}
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="registro_tempo_superior"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between space-x-3 space-y-0  p-4">
            <div className="flex  space-x-3 items-center">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="leading-none ">
                <FormLabel className="cursor-pointer">
                  O registro da sua jornada diária tenha sido superior a
                </FormLabel>
              </div>
            </div>
            <FormField
              control={form.control}
              name="porcentagem_superior"
              render={({ field }) => (
                <FormItem className="flex gap-2">
                  <FormControl>
                    <Input
                      {...field}
                      // value={registro_tempo_inferior ? field.value : ""}
                      type="number"
                      className="w-20"
                      disabled={registro_tempo_superior ? false : true}
                    />
                  </FormControl>
                  <FormDescription className="font-bold"> % </FormDescription>
                </FormItem>
              )}
            />
          </FormItem>
        )}
      />
    </Secao>
  )
}
