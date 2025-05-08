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
import React, { useEffect, useState } from "react"
import Select from "react-select"
import Link from "next/link"
import { Profile, Team, UserList } from "@/models"
import equipePut from "@/actions/equipe-put"

import { ReloadIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import { HoverCardSimple } from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { perfilFormType, formSchema } from "@/schemas/perfilSchema"
import { toast } from "@/components/ui/use-toast"
import { MaskTelefone } from "@/masks/masks"
import perfilPost from "@/actions/perfil-post"

function ErrorSpace({ error }: { error: FieldError | undefined | {} }) {
  return <div className={`h-[19px] ${!error ? "block" : "hidden"}`}></div>
}

export function PerfilForm({ perfil }: { perfil: Profile }) {
  console.log(perfil)

  const [selectedImage, setSelectedImage] = useState<string | null>(
    perfil.avatar?.url || null
  )

  const telefoneSemPrefixo = perfil.phone?.replace("+55", "")
  const form = useForm<perfilFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: perfil.name,
      email: perfil.email,
      telefone: telefoneSemPrefixo,
      data_de_nascimento: perfil.birthday,
      cargo: perfil.roleInTheCompany,
      na_empresa_desde: perfil.atTheCompanySince
        ? perfil.atTheCompanySince.split("T")[0]
        : "",
    },
  })

  const telefone = form.watch("telefone")

  useEffect(() => {
    form.setValue("telefone", MaskTelefone(telefone))
  }, [telefone, form])

  // const imageAvatar = form.watch("avatar")

  // console.log(form.getFieldState("avatar"))
  // 2. Define a submit handler.
  async function onSubmit(values: perfilFormType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const formData = new FormData()

    formData.append("name", values.nome)
    formData.append("email", values.email)
    formData.append("telefone", values.telefone)
    formData.append("cargo", values.cargo || "")
    formData.append("na_empresa_desde", values.na_empresa_desde || "")
    formData.append("data_de_nascimento", values.data_de_nascimento || "")

    // Se houver um arquivo de avatar, adiciona ao FormData
    if (values.avatar instanceof File) {
      formData.append("avatar", values.avatar) // Aqui é onde o arquivo é anexado
    }

    // console.log(values)

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[1040px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })

    try {
      // Chama a função de envio (perfilPost) passando o formData
      await perfilPost(formData)

      toast({
        title: "Perfil atualizado com sucesso!",
      })
    } catch (error) {
      console.error("Erro ao enviar o perfil:", error)
      toast({
        title: "Erro ao atualizar perfil",
        description: "Não foi possível atualizar o perfil.",
        variant: "destructive",
      })
    }

    // Check the value of the 'membros' field
  }

  function mudouImagem(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file) // Cria uma URL temporária para exibir a imagem
      setSelectedImage(imageUrl) // Atualiza o estado com a nova imagem
      // form.setValue("avatar", file)
    }
  }

  // console.log(perfil.avatar.url)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={selectedImage || perfil.avatar?.url}
              title={perfil.name}
              alt={perfil.name}
              className="object-cover"
            />
            <AvatarFallback className="text-[10px]">Imagem</AvatarFallback>
          </Avatar>
          <FormField
            control={form.control}
            name="avatar"
            render={({ field: { value, onChange, ...field } }) => (
              <FormItem>
                <FormLabel
                  className="mt-3 block bg-primary max-w-max text-white p-3 rounded-md cursor-pointer hover:bg-primary/90"
                  htmlFor="avatarInput"
                >
                  Escolher Imagem
                </FormLabel>

                <FormControl>
                  {/* <input accept="image/*" type="file" /> */}
                  <Input
                    {...field}
                    id="avatarInput"
                    value={value?.fileName}
                    accept="image/*"
                    className="hidden max-w-max border-red-500 border-0 shadow-none mt-3 "
                    type="file"
                    name="avatar"
                    onChange={(e) => {
                      mudouImagem(e)
                      onChange(e.target.files?.[0])
                    }}
                  />
                </FormControl>
                <ErrorSpace error={form.formState.errors.avatar} />

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <ErrorSpace error={form.formState.errors.email} />

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cargo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>

                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <ErrorSpace error={form.formState.errors.cargo} />

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="na_empresa_desde"
              render={({ field }) => (
                <FormItem className="mt-0">
                  <FormLabel htmlFor="na_empresa_desde">
                    Na empresa desde
                  </FormLabel>

                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>

                  <ErrorSpace error={form.formState.errors.na_empresa_desde} />

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem className="mt-0">
                  <FormLabel>Telefone</FormLabel>

                  <FormControl>
                    <Input maxLength={15} {...field} />
                  </FormControl>

                  <ErrorSpace error={form.formState.errors.telefone} />

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="data_de_nascimento"
              render={({ field }) => (
                <FormItem className="mt-0">
                  <FormLabel htmlFor="data_de_nascimento:">
                    Data de nascimento
                  </FormLabel>

                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>

                  <ErrorSpace
                    error={form.formState.errors.data_de_nascimento}
                  />

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        {/* <Input type="hidden" value={equipe.id} name="id" /> */}
        <Button className="mr-4" variant="outline" type="button">
          <Link href="/">CANCELAR</Link>
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
