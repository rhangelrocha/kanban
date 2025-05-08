"use client"

import * as React from "react"
import { Icons } from "@/components/icons"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons"
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
  RowData,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { EditClientGroup } from "./ClientGroupEditForm"
import projetoPut from "@/actions/projeto-put"
import { Client, Project, Group } from "@/models"
import { error } from "console"

interface TableProjetosProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  clients: Client[]
  groups: Group[]
}

function useSkipper() {
  const shouldSkipRef = React.useRef(true)
  const shouldSkip = shouldSkipRef.current

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  React.useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip] as const
}

export function TableProjetos<TData, TValue>({
  columns,
  data,
  clients,
  groups,
}: TableProjetosProps<TData, TValue>) {
  const [tableData, setTableData] = React.useState(data)
  const refreshData = () => setTableData(tableData)
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

  const [clientEditting, setClientEditting] = React.useState<any>()
  const [clientModal, setClientModal] = React.useState(false)

  const [filterStatus, setFilterStatus] = React.useState<string>("all")
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      id: false,
    })
  const [rowSelection, setRowSelection] = React.useState({})
  const initialState = { id: false }

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,

    // onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      // rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    meta: {
      updateData: async (
        rowIndex: any,
        columnId: any,
        value: any,
        projectId: any
      ) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex()
        try {
          // await projetoPut({
          //     id: projectId,
          //     active: value,
          //     callbackURL: false
          // })
          setTimeout(() => {
            setTableData((old) =>
              old.map((row, index) => {
                if (index === rowIndex) {
                  console.log("Status alterado: ", {
                    columnId,
                    value,
                    projectId,
                  })
                  return {
                    ...old[rowIndex]!,
                    [columnId]: value,
                  }
                }
                return row
              })
            )
          }, 2000)
        } catch (error) {
          console.log(error)
        }
        // return new Promise((resolve, reject) => {});
      },
      updateClientGroup: async (rowIndex: any, columnId: any, value: any) => {
        skipAutoResetPageIndex()
        try {
          setTimeout(() => {
            setTableData((old) =>
              old.map((row, index) => {
                if (index === rowIndex) {
                  // console.log('Cliente alterado: ', {columnId, value, clientId})
                  console.log("Editando Projeto: ", { row })
                  setClientModal(true)
                  //   setClientEditting({
                  //     id: row.id,
                  //     client: row.cliente,
                  //     group: row.grupo,
                  //   })
                  return {
                    ...old[rowIndex]!,
                    [columnId]: value,
                  }
                }
                return row
              })
            )
          }, 50)
        } catch (error) {
          console.log(error)
        }
        // return new Promise((resolve, reject) => {});
      },
    },
    // debugTable: true,
  })

  React.useEffect(() => {
    if (filterStatus == "fechado") {
      table.getColumn("aberto")?.setFilterValue(false)
    } else if (filterStatus == "aberto") {
      table.getColumn("aberto")?.setFilterValue(true)
    } else {
      table.getColumn("aberto")?.setFilterValue("")
    }
  }, [filterStatus])

  return (
    <div className="w-full">
      <Dialog open={clientModal} onOpenChange={setClientModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Editar projeto</DialogTitle>
          </DialogHeader>
          <EditClientGroup
            clients={clients}
            groups={groups}
            setClientModal={setClientModal}
            projectData={clientEditting}
          />
        </DialogContent>
      </Dialog>
      <div className="flex items-center pb-6 border-b mb-3 gap-4">
        <div className="relative max-w-[200px] w-full flex items-center">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Todos os projetos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os projetos</SelectItem>
              <SelectItem value="aberto">Projetos abertos</SelectItem>
              <SelectItem value="fechado">Projetos fechados</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative max-w-96 w-full  flex flex-1 items-center">
          <Input
            placeholder="Buscar"
            value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("nome")?.setFilterValue(event.target.value)
            }
            className="pl-10" // add some padding to the left of the input
          />
          <span className="absolute left-2 top-50% ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-5 w-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {table.getRowCount()}{" "}
          {table.getRowCount() === 1 ? "projeto" : "projetos"}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                // console.log(column)
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize cursor-pointer"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id.replace(/_/g, " ")}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {table.getRowModel().rows?.length ? (
        <>
          <div className={`${table.getRowCount() !== 0 ? "border-b" : ""}`}>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    className="hover:bg-transparent h-14"
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          className={`font-bold p-0 min-w-[${header.getSize()}px]`}
                          key={header.id}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    className="hover:bg-transparent h-14"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="px-4" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {table.getRowCount() !== 0 && (
            <div className="flex items-center justify-center space-x-2 py-4">
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Próximo
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full flex flex-col justify-center items-center min-h-[200px]">
          <Icons.notFound className="h-[150px] w-[200px] fill-[hsl(var(--primary))]" />
          <p className="text-xl">Nenhum resultado para sua busca</p>
        </div>
      )}
    </div>
  )
}
