import { Separator } from "@/components/ui/separator"

import { Profile, Team } from "@/models"

import { Suspense } from "react"
import equipesGet from "@/actions/equipes-get"
import { PerfilForm } from "../_components/perfil/PerfilForm"
import { auth } from "../../../../auth"
import perfilGet from "@/actions/perfil-get"
import { notFound } from "next/navigation"

export default async function PerfilPage() {
  const [session, perfil] = await Promise.all([auth(), perfilGet()])

  if (!perfil) {
    return notFound()
  }

  // if (!session) return notFound();
  // const session = await auth()

  // if (!session) return notFound()

  // console.log(session)

  // const perfil = (await perfilGet()) as Profile

  // console.log(perfil)

  return (
    <>
      <div className="pt-5 px-2 lg:px-8">
        <div className={`mb-4 flex items-center justify-between`}>
          <div className="container_title">
            <h2 className="text-2xl font-bold">Meu perfil</h2>
          </div>
        </div>
        <Separator />
        <Suspense fallback={<div>Carregando...</div>}>
          <div className="mx-auto py-6">
            <PerfilForm perfil={perfil} />
          </div>
        </Suspense>
      </div>
    </>
  )
}
