import equipeGet from "@/actions/equipe-get"
import userGET from "@/actions/user-get"
import { EquipesForm } from "@/app/(protected)/_components/equipes/EquipesForm"
import { Separator } from "@/components/ui/separator"
import { EQUIPE_GET, USER_GET } from "@/functions/api/api"
import { Team, UserList } from "@/models"
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

export default async function EquipesEditarPage(props: PageParams) {
  const params = await props.params;
  const equipe = (await equipeGet(params.id)) as Team

  const users = await userGET()

  if (!equipe || !users) return notFound()

  // console.log(equipe)
  return (
    <>
      <div className="pt-5 px-2 lg:px-8">
        <div className={`mb-4 flex items-center justify-between`}>
          <div className="container_title">
            <h2 className="text-2xl font-bold">Dados da equipe</h2>
          </div>
        </div>
        <Separator />
        <Suspense fallback={<div>Carregando...</div>}>
          <div className="max-w-full mx-auto mt-20 border  rounded-2xl p-10">
            <EquipesForm users={users} equipe={equipe} />
          </div>
        </Suspense>
      </div>
    </>
  )
}
