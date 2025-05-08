"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from "react"
import Select, { NoticeProps, StylesConfig } from "react-select"
import SelectMembros from "./SelectMembros"
import Link from "next/link"
import { Team, UserList } from "@/models"
import equipePut from "@/actions/equipe-put"
import {
  equipeEditarFormType,
  formSchema,
} from "@/schemas/equipeEditarFormSchema"
import { ReloadIcon } from "@radix-ui/react-icons"

function ErrorSpace({ error }: { error: FieldError | undefined | {} }) {
  return <div className={`h-[19px] ${!error ? "block" : "hidden"}`}></div>
}

export function EquipesForm({
  equipe,
  users,
}: {
  equipe: Team
  users: UserList
}) {
  const options: { value: string; label: string }[] = users.users?.map((user) => ({
    value: user.id,
    label: user.name,
  })) || []

  // console.log(equipe)
  const form = useForm<equipeEditarFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: equipe.id,
      nome: equipe.name,
      lideres: equipe.leaders?.map((leader) => ({
        value: leader.userId,
        label: leader.user.name,
      })),
      centro_de_custo: equipe.costCenter ? equipe.costCenter : "",
      membros: equipe.users?.map((user) => ({
        value: user.userId,
        label: user.user.name,
      })),
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: equipeEditarFormType): Promise<void> {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // console.log(values)
    await equipePut(values)
    // Check the value of the 'membros' field
    // console.log(values.membros)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-5">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <ErrorSpace error={form.formState.errors.nome} />

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lideres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lideres">Líder</FormLabel>
                    <FormControl>
                    <Select
                      inputId="lider"
                      noOptionsMessage={() => "Nenhum usuário encontrado"}
                      placeholder="Selecione"
                      {...field}
                      options={options}
                      isMulti
                      styles={{
                        control: (baseStyles: React.CSSProperties, state: { isFocused: boolean }) => ({
                          ...baseStyles,
                          borderColor: state.isFocused
                            ? "hsl(var(--ring)) !important"
                            : "hsl(var(--input))",
                          boxShadow: "none !important",
                          backgroundColor: "transparent !important",
                        }),

                        menu: (baseStyles: React.CSSProperties) => ({
                          ...baseStyles,
                          backgroundColor: "hsl(var(--background))",
                          borderColor: "hsl(var(--input)) !important",
                        }),

                        option: (baseStyles: React.CSSProperties, state: { isFocused: boolean }) => ({
                          ...baseStyles,
                          backgroundColor: state.isFocused
                            ? "hsl(var(--ring)) !important"
                            : "hsl(var(--background))",
                          // color: state.isFocused
                          //   ? "hsl(var(--foreground)) !important"
                          //   : "hsl(var(--input))",
                        }),
                      }}
                    />
                    </FormControl>
                  <ErrorSpace error={form.formState.errors.lideres} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="centro_de_custo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Centro de custo:</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <ErrorSpace error={form.formState.errors.centro_de_custo} />

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="membros"
              render={({ field }) => (
                <FormItem className="mt-0">
                  <FormLabel htmlFor="membros">Membros</FormLabel>

                  <FormControl>
                    <Select
                      inputId="membros"
                      isMulti
                      {...field}
                      options={options}
                      placeholder="Selecione um usuário existente..."
                      noOptionsMessage={() => "Nenhum usuário encontrado"}
                      styles={{
                        control: (baseStyles: React.CSSProperties, state: { isFocused: boolean }) => ({
                          ...baseStyles,
                          borderColor: state.isFocused
                            ? "hsl(var(--ring)) !important"
                            : "hsl(var(--input))",
                          boxShadow: "none !important",
                          backgroundColor: "transparent !important",
                        }),

                        menu: (baseStyles: React.CSSProperties) => ({
                          ...baseStyles,
                          backgroundColor: "hsl(var(--background))",
                          borderColor: "hsl(var(--input)) !important",
                        }),

                        option: (baseStyles: React.CSSProperties, state: { isFocused: boolean }) => ({
                          ...baseStyles,
                          backgroundColor: state.isFocused
                            ? "hsl(var(--ring)) !important"
                            : "hsl(var(--background))",
                          // color: state.isFocused
                          //   ? "hsl(var(--foreground)) !important"
                          //   : "hsl(var(--input))",
                        }),
                      }}
                    />
                  </FormControl>

                  <ErrorSpace error={form.formState.errors.membros} />

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* <Input type="hidden" value={equipe.id} name="id" /> */}
        <Button className="mr-4" variant="outline" type="button">
          <Link href="/equipes">CANCELAR</Link>
        </Button>
        <Button disabled={form.formState.isSubmitting} type="submit">
          {form.formState.isSubmitting && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          SALVAR
        </Button>
      </form>
    </Form>
  )
}
