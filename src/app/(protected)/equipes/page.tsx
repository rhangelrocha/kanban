import { Separator } from "@/components/ui/separator"

import { DataTable } from "@/app/(protected)/_components/equipes/Data-table"
import { columns } from "@/app/(protected)/_components/equipes/Columns"
import { Modal_Nova_Equipe } from "@/app/(protected)/_components/equipes/Modal_nova_equipe"
import { Team } from "@/models"

import { Suspense } from "react"
import equipesGet from "@/actions/equipes-get"

export default async function EquipesPage() {
  const arrayTeamList = (await equipesGet()) as Team[]

  return (
    <>
      <div className="pt-5 px-2 lg:px-8">
        <div className={`mb-4 flex items-center justify-between`}>
          <div className="container_title">
            <h2 className="text-2xl font-bold">Equipes</h2>
          </div>

          <div className="action">
            {/* <Button className="">Nova equipe</Button> */}
            <Modal_Nova_Equipe />
          </div>
        </div>
        <Separator />
        <Suspense fallback={<div>Carregando...</div>}>
          <div className="mx-auto py-6">
            <DataTable columns={columns} data={arrayTeamList} />
          </div>
        </Suspense>
      </div>
    </>
  )
}
