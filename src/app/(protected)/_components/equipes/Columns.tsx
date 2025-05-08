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
import Avatar from "../../../../components/Avatar"
import { LeaderType, Team } from "@/models"

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

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",

    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
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
        href={`/equipes/editar/${row.original.id}`}
      >
        {/* {JSON.stringify(row)} */}
        {row.getValue("name")}
      </Link>
    ),
  },

  {
    accessorKey: "members",

    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Membros
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("members")}</div>
    ),
  },
  {
    accessorKey: "leaders",

    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Líder
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) =>
      row.original.leaders.map((leader) => (
        <Link
          key={leader.user.id}
          className="flex items-center gap-2 font-bold text-primary cursor-pointer hover:underline"
          href={`/equipes/${row.original.id}`}
        >
          {" "}
          <Avatar imageUrl={leader.user.avatarUrl} />
          {leader.user.name}
        </Link>
      )),
  },
  {
    accessorKey: "taskQueue",

    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tarefas na fila
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("taskQueue")}</div>,
  },

  {
    accessorKey: "taskOpen",

    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tarefas abertas
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("taskOpen")}</div>,
  },
  {
    accessorKey: "taskFollowed",

    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tarefas acompanhadas
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("taskFollowed")}</div>,
  },
  {
    accessorKey: "taskFinished",

    header: ({ column }) => {
      return (
        <Button
          className="font-bold"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tarefas finalizadas
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("taskFinished")}</div>,
  },

  {
    id: "actions",
    header: ({ column }) => {
      return <div className="font-bold pl-3">Ações</div>
    },
    enableHiding: false,
    cell: ({ row }) => {
      const equipe = row.original

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
                href={`/equipes/editar/${equipe.id}`}
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
                href={`/equipes/pre_delete/${equipe.id}`}
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
