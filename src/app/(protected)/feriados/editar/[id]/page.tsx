import equipeGet from "@/actions/equipe-get"
import feriadoGet from "@/actions/feriado-get"
import userGET from "@/actions/user-get"
import { EquipesForm } from "@/app/(protected)/_components/equipes/EquipesForm"
import { FeriadosForm } from "@/app/(protected)/_components/feriados/FeriadosForm"
import { Separator } from "@/components/ui/separator"
import { EQUIPE_GET, USER_GET } from "@/functions/api/api"
import { Holiday, Team, UserList } from "@/models"
import { notFound } from "next/navigation"
import { Suspense } from "react"

type PageParams = {
  params: Promise<{ id: string }>
}

// const getEquipe = async (id: string) => {
//   const { url } = EQUIPE_GET(id)
//   const data = await fetch(url, {
//     next: {
//       revalidate: 5,
//     },
//   })
//   return (await data.json()) as Team
// }
const getUsers = async () => {
  const { url } = USER_GET()
  const data = await fetch(url, {
    next: {
      revalidate: 5,
    },
  })

  return (await data.json()) as UserList
}

export default async function FeriadosEditarPage(props: PageParams) {
  const params = await props.params;
  const feriado = (await feriadoGet(params.id)) as Holiday

  console.log(feriado)

  const users = await userGET()

  console.log(users)

  if (!feriado || !users) return notFound()

  // console.log(equipe)
  return (
    <>
      <div className="pt-5 px-2 lg:px-8">
        <div className={`mb-4 flex items-center justify-between`}>
          <div className="container_title">
            <h2 className="text-2xl font-bold">Dados do feriado</h2>
          </div>
        </div>
        <Separator />
        <Suspense fallback={<div>Carregando...</div>}>
          <div className="max-w-full mx-auto mt-20 border  rounded-2xl p-10">
            <FeriadosForm feriado={feriado} />
          </div>
        </Suspense>
      </div>
    </>
  )
}
