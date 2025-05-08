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

import {
  equipeDeleteFormType,
  formSchema,
} from "@/schemas/equipeDeleteFormSchema"
import { ReloadIcon } from "@radix-ui/react-icons"
import feriadoDelete from "@/actions/feriado-delete"
import { feriadoDeleteFormType } from "@/schemas/feriadoDeleteFormSchema"

function ErrorSpace({ error }: { error: FieldError | undefined | {} }) {
  return <div className={`h-[19px] ${!error ? "block" : "hidden"}`}></div>
}

export function FeriadoDeleteForm({ id }: { id: string }) {
  // 1. Define your form.

  // console.log(equipe)
  const form = useForm<feriadoDeleteFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // confirmar_apagar: "",
      id: id,
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: feriadoDeleteFormType) {
    // Do something with the form values.
    // console.log(`${JSON.stringify(values)}`)

    // await sleep(5000)
    await feriadoDelete(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex space-y-4 items-center"
      >
        <div className="flex max-w-96 gap-5 mr-5 flex-1">
          <div className=" flex-1">
            <FormField
              control={form.control}
              name="confirmar_apagar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block mb-7">
                    Digite a palavra &quot;APAGAR&quot;
                  </FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <ErrorSpace error={form.formState.errors.confirmar_apagar} />
                  {/* {JSON.stringify(form.formState.errors)} */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Input type="hidden" value={id} name="id" />
        <Button
          disabled={form.formState.isSubmitting}
          className=" mt-0 mr-4"
          variant={"destructive"}
          type="submit"
        >
          {form.formState.isSubmitting && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          CONFIRMAR E APAGAR!
        </Button>
        <Button className=" mt-0 " variant="outline" type="button">
          <Link href="/feriados">CANCELAR</Link>
        </Button>
      </form>
    </Form>
  )
}
