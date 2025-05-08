import feriadoGet from "@/actions/feriado-get"
import { FeriadoDeleteForm } from "@/app/(protected)/_components/feriados/FeriadoDeleteForm"

import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"
import { Suspense } from "react"

type PageParams = {
  params: Promise<{ id: string }>
}

export default async function PreDeletePage(props: PageParams) {
  const params = await props.params;
  const feriado = await feriadoGet(params.id)

  if (!feriado) return notFound()

  // console.log(equipe)
  return (
    <>
      <div className="pt-5 px-2 lg:px-8">
        <div className={`mb-4 flex items-center justify-between`}>
          <div className="container_title">
            <h2 className="text-2xl font-bold">Antes de apagar o feriado:</h2>
          </div>
        </div>
        <Separator />

        <Suspense fallback={<div>Carregando...</div>}>
          <div className="max-w-full mx-auto mt-20 border  rounded-2xl p-10">
            <div className="flex flex-col gap-4 mb-10">
              {/* <h3 className="text-red-600 text-xl ">
                0 tarefas atribuídas aos usuários desta equipe ficarão &quot;sem
                Equipe&quot;. Isso pode impactar nas informações coletadas nos
                relatórios!
              </h3>
              <h3 className="text-red-600 text-xl ">
                0 tarefas atribuídas aos usuários desta equipe e que foram
                entregues ficarão &quot;sem Equipe&quot;. Isso pode impactar nas
                informações coletadas nos relatórios!
              </h3>
              <h3 className="text-red-600 text-xl">
                0 tarefas modelo atribuídas aos usuários desta equipe ficarão
                &quot;sem Equipe&quot;. Isso pode impactar nas informações
                coletadas nos relatórios!
              </h3> */}
            </div>
            <FeriadoDeleteForm id={feriado.id} />
          </div>
        </Suspense>
        {/* <div className="text-center">
          <pre className="text-left w-max m-auto">
            {JSON.stringify(equipe, null, 100)}
          </pre>
        </div> */}
      </div>
    </>
  )
}
