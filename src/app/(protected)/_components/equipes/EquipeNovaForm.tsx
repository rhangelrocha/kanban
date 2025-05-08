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

import {
  equipeCriarFormType,
  formSchema,
} from "@/schemas/equipeCriarFormSchema"
import { ReloadIcon } from "@radix-ui/react-icons"

import equipeCriar from "@/actions/equipe-post"

function ErrorSpace({ error }: { error: FieldError | undefined | {} }) {
  return <div className={`h-[19px] ${!error ? "block" : "hidden"}`}></div>
}

export function EquipeNovaForm() {
  // 1. Define your form.

  // console.log(equipe)
  const form = useForm<equipeCriarFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: equipeCriarFormType) {
    await equipeCriar(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" items-center">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className="block mb-7">
                    Digite a palavra &quot;APAGAR&quot;
                  </FormLabel> */}

              <FormControl>
                <Input placeholder="Nome da equipe" {...field} />
              </FormControl>
              <ErrorSpace error={form.formState.errors.name} />

              <FormMessage />
            </FormItem>
          )}
        />

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
            CRIAR EQUIPE
          </Button>
        </div>
      </form>
    </Form>
  )
}
