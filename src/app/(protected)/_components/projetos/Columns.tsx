"use client"

import React, { useState as UseState, useEffect as UseEffect } from "react"
import { Client, Group, Step } from "@/models"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { any } from "zod"
import { Icons } from "@/components/icons"

const CustomDropdownMenuItem: React.FC<
  React.ComponentProps<typeof DropdownMenuItem>
> = ({ children, ...props }) => {
  return (
    <DropdownMenuItem className="cursor-pointer text-red-500" {...props}>
      {children}
    </DropdownMenuItem>
  )
}

export type Projeto = {
  id: string
  nome: string
  visibilidade?: string
  atividade: string
  aberto?: any
  cliente?: any
  grupo?: any
  data_criacao?: string
  data_entrega_desejada?: string
  etapa?: any
  horas_investidas?: string
  atribuidas_fila?: string
  atribuidas_desenvolvimento?: string
  entregues?: string
  total?: string
}

export const columns: ColumnDef<Projeto>[] = [
  {
    accessorKey: "id",
    size: 130,
    minSize: 130,
    header: ({ column }) => {
      return (
        <Button
          className="font-bold justify-start min-w-[130px]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "nome",
    size: 350,
    minSize: 350,
    header: ({ column }) => {
      return (
        <Button
          className="font-bold justify-start min-w-[350px]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Link
        className="font-bold text-primary cursor-pointer hover:underline"
        href={`/projetos/${row.getValue("id")}`}
      >
        {row.getValue("nome")}
      </Link>
    ),
  },
  {
    accessorKey: "visibilidade",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold justify-start min-w-[160px]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Visibilidade
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>{row.getValue("visibilidade") ?? "Visível para todos"}</div>
    ),
  },
  {
    accessorKey: "atividade",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Atividade
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => row.getValue("atividade"),
  },
  {
    accessorKey: "aberto",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold justify-start w-[100px]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Aberto
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const status: any = getValue()
      const initialValue =
        typeof status?.value == "boolean" ? status.value : false
      const [value, setValue] = UseState<boolean>(initialValue)
      const [loadingCheck, setloadingCheck] = UseState(false)
      const checkChange = async (value: boolean) => {
        setloadingCheck(true)
        setValue(value)
        try {
          // @ts-ignore
          await table.options.meta?.updateData(index, id, value, status?.id)
          setTimeout(() => {
            setloadingCheck(false)
          }, 500);
        } catch (error) {
          console.error(error)
          setTimeout(() => {
            setloadingCheck(false)
          }, 500);
        }
      }

      // UseEffect(() => {
      //     console.log(value)
      // }, [setValue])

      return (
        <div>
          {!loadingCheck ? (
            <>
              <Switch
                checked={value ?? false}
                onCheckedChange={(value) => checkChange(value)}
              />
            </>
          ) : (
            <Icons.spinner className="h-7 w-7 animate-spin stroke-neutral-400" />
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "cliente",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold justify-start w-[200px]"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const cliente: any = getValue()
      const [value, setValue] = UseState<any>(cliente)
      const [loadingClient, setloadingClient] = UseState(false)
      const clientChange = async (value: any) => {
        setloadingClient(true);
        setValue(value)
        try {
          // @ts-ignore
          await table.options.meta?.updateClientGroup(index, id, value)
          setloadingClient(false)
        } catch (error) {
          console.error(error)
          setloadingClient(false);
        }
      }
      return (
        <>
          {!loadingClient ? (
            <>
              <Button
                variant="link"
                className="flex items-center justify-start gap-2 font-bold text-primary cursor-pointer hover:opacity-75 !no-underline p-0"
                onClick={() => clientChange(value)}
              >
                <Avatar className="h-7 w-7 flex align-center">
                  <AvatarImage src={cliente.image} alt={cliente.name} />
                  <AvatarFallback>
                    {cliente.name.split(" ")[0].charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {cliente.name}
              </Button>
            </>
          ) : (
            <Icons.spinner className="h-7 w-7 animate-spin stroke-neutral-400" />
          )}
        </>
      )
    },
  },
  {
    accessorKey: "grupo",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Grupo de projeto
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      const grupo: any = getValue()
      const [value, setValue] = UseState<any>(grupo)
      const [loadingGroup, setloadingGroup] = UseState(false)
      const groupChange = async (value: any) => {
        setloadingGroup(true);
        setValue(value)
        try {
          // @ts-ignore
          await table.options.meta?.updateClientGroup(index, id, value)
          setloadingGroup(false)
        } catch (error) {
          console.error(error)
          setloadingGroup(false);
        }
      }
      return (
        <>
          {!loadingGroup ? (
            <>
              <Button
                variant="link"
                className="flex items-center gap-2 font-bold text-primary cursor-pointer hover:opacity-75 !no-underline"
                onClick={() => groupChange(value)}
              >
                {grupo ? grupo.nome : "Sem grupo"}
              </Button>
            </>
          ) : (
            <Icons.spinner className="h-7 w-7 animate-spin stroke-neutral-400" />
          )}
        </>
      )
    },
  },
  {
    accessorKey: "data_criacao",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dara de criacao
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const data = new Date(row.getValue("data_criacao"))
      const dia = data.getDate()
      const mes = data.getMonth() + 1
      const ano = data.getFullYear()
      const dataFormatada = `${dia}/${mes}/${ano}`
      return dataFormatada
    },
  },
  {
    accessorKey: "data_entrega_desejada",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de entrega
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      if (row.getValue("data_entrega_desejada")) {
        const data = new Date(row.getValue("data_entrega_desejada"))
        const dia = data.getDate()
        const mes = data.getMonth() + 1
        const ano = data.getFullYear()
        const dataFormatada = `${dia}/${mes}/${ano}`
        return dataFormatada
      } else {
        return ""
      }
    },
  },
  {
    accessorKey: "etapa",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Etapa
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      if (!row.getValue("etapa")) return ""
      const etapa: Step = row.getValue("etapa")
      return (
        <Button
          variant="link"
          className="flex items-center gap-2 font-bold text-primary cursor-pointer hover:opacity-75 !no-underline"
          onClick={() => console.log(etapa)}
        >
          {/* {etapa.nome} */}
        </Button>
      )
    },
  },
  {
    accessorKey: "horas_investidas",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Horas investidas
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("horas_investidas")}</div>,
  },
  {
    accessorKey: "atribuidas_fila",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Atribuídas (Na fila)
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("atribuidas_fila")}</div>,
  },
  {
    accessorKey: "atribuidas_desenvolvimento",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Atribuídas (Em desenvolvimento)
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("atribuidas_desenvolvimento")}</div>,
  },
  {
    accessorKey: "entregues",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Entregues
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("entregues")}</div>,
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("total")}</div>,
  },
  {
    id: "actions",
    header: ({ column }) => {
      return <div className="font-bold pl-3">Ações</div>
    },
    enableHiding: false,
    cell: ({ row }) => {
      const projeto = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0 bg-[#ebf8ff] text-[#007dbb] transition-all duration-300 hover:bg-[#bde5f9] font-bold">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <Link className="w-full h-full" href={`/projetos/${projeto.id}`}>
                Visibilidade
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Link className="w-full h-full" href={`/projetos/${projeto.id}`}>
                Editar
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-600">
              <Link
                className="w-full h-full"
                href={`/projetos/pre_delete/${projeto.id}`}
              >
                Apagar
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
