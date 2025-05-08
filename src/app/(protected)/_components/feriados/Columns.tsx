"use client"

import * as React from "react"
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
import Link from "next/link"
import { Holiday } from "@/models"

const CustomDropdownMenuItem: React.FC<
  React.ComponentProps<typeof DropdownMenuItem>
> = ({ children, ...props }) => {
  return (
    <DropdownMenuItem className="cursor-pointer text-red-500" {...props}>
      {children}
    </DropdownMenuItem>
  )
}

export type ColumnDefWithTraducao<T> = ColumnDef<T> & {
  traducao?: string
}

export const columns: ColumnDef<Holiday>[] = [
  {
    accessorKey: "diaCompleto",

    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dia
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("diaCompleto")}</div>,
  },

  {
    accessorKey: "description",

    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="font-bold text-primary">
        {row.getValue("description")}
      </div>
    ),
  },

  {
    accessorKey: "active",

    header: ({ column }) => {
      return <div className="font-bold pl-3">Situação</div>
    },
    cell: ({ row }) => <div>{row.getValue("active")}</div>,
  },

  {
    id: "actions",
    header: ({ column }) => {
      return <div className="font-bold pl-3">Ações</div>
    },
    enableHiding: false,
    cell: ({ row }) => {
      const feriado = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0 bg-action-200-228 text-[#007dbb] transition-all duration-300 hover:bg-[#bde5f9]  dark:bg-action-700-723 font-bold dark:text-[#fff]">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">
              <Link
                className="w-full h-full"
                href={`/feriados/editar/${feriado.id}`}
              >
                Editar
              </Link>
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              // onClick={(e) => handleApagarEquipe(e, equipe.id)}
              className="cursor-pointer text-red-500 focus:text-red-600"
            >
              <Link
                className="w-full h-full"
                href={`/feriados/pre_delete/${feriado.id}`}
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
