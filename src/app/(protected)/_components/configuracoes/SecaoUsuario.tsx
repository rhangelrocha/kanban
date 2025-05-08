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

export default function SecaoUsuario({
  form,
}: {
  form: UseFormReturn<ConfiguracoesFormValues>
}) {
  return (
    <Secao titulo="Usuários" id="usuarios">
      <FormField
        control={form.control}
        name="mudar_fotos"
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
                Permitir que usuários mudem suas fotos.
              </FormLabel>
              <FormDescription>
                Se desmarcado, apenas administradores poderão mudar as fotos dos
                usuários.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="criem_recebam_tarefas"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4 cursor-pointer">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                Permitir por padrão que novos usuários criem e recebam tarefas
                de todos.
              </FormLabel>
              {/* <FormDescription>
              Se desmarcado, apenas administradores poderão mudar as fotos
              dos usuários.
            </FormDescription> */}
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="gerencie_tags"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4 cursor-pointer">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                Permitir que todos gerenciem tags.
              </FormLabel>
              <FormDescription>
                Se desmarcado, apenas administradores e gestores estarão
                autorizados a gerenciar tags.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="criem_quadros"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4 cursor-pointer">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                Permitir que todos criem quadros.
              </FormLabel>
              <FormDescription>
                Se desmarcado, apenas administradores e gestores estarão
                autorizados a criar quadros.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="criem_portais"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4 cursor-pointer">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                Permitir que todos os usuários criem portais.
              </FormLabel>
              <FormDescription>
                Se desmarcado, apenas administradores e gestores poderão criar
                portais.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="criem_gerenciem_clientes_projetos"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4 cursor-pointer">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                Permitir que Líderes de Equipe criem e gerenciem clientes,
                projetos, modelos de projeto e tipos de tarefa.
              </FormLabel>
              <FormDescription>
                Se desmarcado, apenas administradores e gestores estarão
                autorizados a criar e gerenciar.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="permitir_acoes_em_massa"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4 cursor-pointer">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                Permitir que todos os usuários executem ações em massa.
              </FormLabel>
              <FormDescription>
                Se desmarcado, apenas administradores e gestores poderão
                executar ações em massa.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="politica_senha_restritiva"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0  p-4 cursor-pointer">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="cursor-pointer">
                Ativar política de senha mais restritiva
              </FormLabel>
              <FormDescription>
                Os usuários deverão atualizar a senha a cada 90 dias. Não é
                permitido repetir nenhuma das últimas 5 senhas cadastradas.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem className="space-y-3 pl-5 mt-3">
            <FormLabel className="font-bold">
              Quem pode criar novos usuários:
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="all" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Apenas os administradores da conta
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="mentions" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Administradores, gestores e líderes de equipe
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="none" />
                  </FormControl>
                  <FormLabel className="font-normal cursor-pointer">
                    Todos os usuários
                  </FormLabel>
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
