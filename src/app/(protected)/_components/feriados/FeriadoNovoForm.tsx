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

import { ReloadIcon } from "@radix-ui/react-icons"

import {
  feriadoCriarFormType,
  formSchema,
} from "@/schemas/feriadoCriarFormSchema"
import feriadoCriar from "@/actions/feriado-post"

function ErrorSpace({ error }: { error: FieldError | undefined | {} }) {
  return <div className={`h-[19px] ${!error ? "block" : "hidden"}`}></div>
}

export function FeriadoNovoForm() {
  const [error, setError] = React.useState(false)
  // 1. Define your form.

  // console.log(equipe)
  const form = useForm<feriadoCriarFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: feriadoCriarFormType) {
    const response = await feriadoCriar(values)
    if (response?.error) {
      setError(true)
    }
    console.log(response)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" items-center">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block mb-3">Nome do Feriado</FormLabel>

              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <ErrorSpace error={form.formState.errors.name} />

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block mb-3">Data do Feriado</FormLabel>

              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <ErrorSpace error={form.formState.errors.name} />

              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <FormDescription className="text-red-500">
            Erro ao criar feriado
          </FormDescription>
        )}
        <div className="flex items-center justify-center">
          <Button
            disabled={form.formState.isSubmitting}
            className=" mt-2  "
            variant={"default"}
            type="submit"
          >
            {form.formState.isSubmitting && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            CRIAR FERIADO
          </Button>
        </div>
      </form>
    </Form>
  )
}
