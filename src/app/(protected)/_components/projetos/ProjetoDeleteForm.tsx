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
import Link from "next/link"
import projetoDelete from "@/actions/projeto-delete"
import {
  projetoDeleteFormType,
  formSchema,
} from "@/schemas/projetoDeleteFormSchema"
import { ReloadIcon } from "@radix-ui/react-icons"
import { sleep } from "@/functions/sleep/sleep"

// const formSchema = z.object({
//   confirmar_apagar: z
//     .string()
//     .refine((value) => value === "APAGAR", {
//       message: "Digite a palavra 'APAGAR' para confirmar a exclusão",
//     })
//     .optional()
//     .refine((value) => value === "", {
//       message: "Campo obrigatório",
//     }),
// })

// console.log(formSchema)

function ErrorSpace({ error }: { error: FieldError | undefined | {} }) {
  return <div className={`h-[19px] ${!error ? "block" : "hidden"}`}></div>
}

export function ProjetoDeleteForm({ id }: { id: string }) {
  // console.log(equipe)
  const form = useForm<projetoDeleteFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmar_apagar: "APAGAR",
      id: id,
    },
  })

  async function onSubmit(values: projetoDeleteFormType) {
    // console.log(`${JSON.stringify(values)}`)

    // await sleep(5000)
    await projetoDelete(values)
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
          CONFIRMAR E APAGAR
        </Button>
        <Button className=" mt-0 " variant="outline" type="button">
          <Link href="/projetos">CANCELAR</Link>
        </Button>
      </form>
    </Form>
  )
}
