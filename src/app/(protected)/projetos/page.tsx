import * as React from "react"
import { projetosGet } from "@/actions/projetos-get"
import { clientesGet } from "@/actions/clientes-get"
import { gruposGet } from "@/actions/grupos-get"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { TableProjetos } from "@/app/(protected)/_components/projetos/TableProjetos"
import {
  columns,
  Projeto,
} from "@/app/(protected)/_components/projetos/Columns"
import { ClientList, Project, Client, Group } from "@/models"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreateProjeto } from "../_components/projetos/ProjetoCreateForm"

export default async function ProjetosPage() {
  const arrayProjectList = (await projetosGet()) as Project[]
  const arrayClientList = (await clientesGet()) as Client[]
  // const arrayGroupList = (await gruposGet()) as Group[];

  return (
    <div className="pt-5 px-2 lg:px-8">
      <div className={cn("mb-4 flex items-center justify-between")}>
        <div className="container_title">
          <h2 className="text-2xl font-bold">Todos os projetos</h2>
        </div>
        <div className="action">
          <CreateProjeto clients={arrayClientList} />
        </div>
      </div>
      <Separator />
      <div className="mx-auto py-6">
        <TableProjetos clients={arrayClientList} groups={[]} columns={columns} data={arrayProjectList} />
      </div>
    </div>
  )
}
