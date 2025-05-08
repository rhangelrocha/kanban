// import projetoGet from '@/actions/projeto-get';
import { ProjetoDeleteForm } from "@/app/(protected)/_components/projetos/ProjetoDeleteForm"

import { Separator } from "@/components/ui/separator"
import { notFound } from "next/navigation"
import { Suspense } from "react"

type PageParams = {
  params: { id: string }
}

export default function PreDeletePage() {
  // const projeto = await projetoGet(params.id)

  // if (!projeto) return notFound()

  // console.log(projeto)
  return (
    <>
      <div className="pt-5 px-2 lg:px-8">
        <div className={`mb-4 flex items-center justify-between`}>
          <div className="container_title">
            <h2 className="text-2xl font-bold">Antes de apagar a projeto:</h2>
          </div>
        </div>
        <Separator />

        <Suspense fallback={<div>Carregando...</div>}>
          <div className="max-w-full mx-auto mt-5 border rounded-2xl p-10">
            <div className="flex flex-col gap-4 mb-10">
              <h3 className="text-red-600 text-md mb-3 pb-5 border-b border-gray-200">
                0 tarefas atribuídas aos usuários desta projeto ficarão
                &quot;sem Projeto&quot;. Isso pode impactar nas informações
                coletadas nos relatórios!
              </h3>
              <h3 className="text-red-600 text-md mb-3 pb-5 border-b border-gray-200">
                0 tarefas atribuídas aos usuários desta projeto e que foram
                entregues ficarão &quot;sem Projeto&quot;. Isso pode impactar
                nas informações coletadas nos relatórios!
              </h3>
              <h3 className="text-red-600 text-md">
                0 tarefas modelo atribuídas aos usuários desta projeto ficarão
                &quot;sem Projeto&quot;. Isso pode impactar nas informações
                coletadas nos relatórios!
              </h3>
            </div>
            {/* <ProjetoDeleteForm id={projeto.id} /> */}
          </div>
        </Suspense>
        {/* <div className="text-center">
          <pre className="text-left w-max m-auto">
            {JSON.stringify(projeto, null, 100)}
          </pre>
        </div> */}
      </div>
    </>
  )
}
