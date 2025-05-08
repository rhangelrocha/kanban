"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FieldError, useForm } from "react-hook-form"
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
import Link from "next/link"
import { Holiday } from "@/models"

import { ReloadIcon } from "@radix-ui/react-icons"
import {
  feriadoEditarFormType,
  formSchema,
} from "@/schemas/feriadoEditarFormSchema"
import feriadoPut from "@/actions/feriado-put"

function ErrorSpace({ error }: { error: FieldError | undefined | {} }) {
  return <div className={`h-[19px] ${!error ? "block" : "hidden"}`}></div>
}

export function FeriadosForm({ feriado }: { feriado: Holiday }) {
  const [error, setError] = React.useState(false)

  const [day, month] = feriado.dayMonth.split("/")
  const year = feriado.year
  const formattedDate = `${year}-${month}-${day}`

  const form = useForm<feriadoEditarFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: feriado.id,
      nome: feriado.description,
      date: formattedDate,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: feriadoEditarFormType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // console.log(values)
    const response = await feriadoPut(values)

    if (response?.error) {
      setError(true)
    }
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lideres">Data</FormLabel>

                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <ErrorSpace error={form.formState.errors.date} />

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {error && (
          <div className="bg-red-100 p-4 rounded-lg text-red-600">
            Erro ao editar feriado
          </div>
        )}
        {/* <Input type="hidden" value={equipe.id} name="id" /> */}
        <Button className="mr-4" variant="outline" type="button">
          <Link href="/feriados">CANCELAR</Link>
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
