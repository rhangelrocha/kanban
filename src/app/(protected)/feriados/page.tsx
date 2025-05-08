import { Separator } from "@/components/ui/separator"

import { DataTable } from "@/app/(protected)/_components/feriados/Data-table"
import { columns } from "@/app/(protected)/_components/feriados/Columns"
import { Modal_Novo_Feriado } from "@/app/(protected)/_components/feriados/Modal_novo_feriado"
import { Holiday } from "@/models"

import { Suspense } from "react"

import feriadosGet from "@/actions/feriados-get"

export default async function FeriadosPage() {
  const arrayFeriadoList = (await feriadosGet()) as Holiday[]

  return (
    <>
      <div className="pt-5 px-2 lg:px-8">
        <div className={`mb-4 flex items-center justify-between`}>
          <div className="container_title">
            <h2 className="text-2xl font-bold">Feriados</h2>
          </div>

          <div className="action">
            {/* <Button className="">Nova equipe</Button> */}
            <Modal_Novo_Feriado />
          </div>
        </div>
        <Separator />
        <Suspense fallback={<div>Carregando...</div>}>
          <div className="mx-auto py-6">
            <DataTable columns={columns} data={arrayFeriadoList} />
          </div>
        </Suspense>
      </div>
    </>
  )
}
