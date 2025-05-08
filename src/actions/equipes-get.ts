'use server'

import { EQUIPES_GET, EQUIPE_GET } from '@/functions/api/api'
import { useCurrentTokenUser } from '@/hooks/use-current-user-token'
import { Team, TeamList } from '@/models'
import { auth } from '../../auth';



export default async function equipesGet() {
  const session = await auth();


  const { url } = EQUIPES_GET()

  let error = false

  let teamList: TeamList

  let arrayTeamList: Team[] = []

   // eslint-disable-next-line react-hooks/rules-of-hooks
  try {
  
    const response = await fetch(url, {
      headers: {
      Authorization: 'Bearer ' + session?.accessToken,
      },
      next: {
      revalidate: 5,
      },
    })
    console.log(response)
    if (!response.ok) throw new Error("Erro na requisição.")
    teamList = await response.json()
    teamList.teams.map((team) => {
      arrayTeamList.push({
        id: team.id,
        name: team.name,
        active: team.active,
        creationDate: team.creationDate,
        leaders: team.leaders,
        members: team.members,
        taskQueue: team.taskQueue,
        taskOpen: team.taskOpen,
        taskFollowed: team.taskFollowed,
        taskFinished: team.taskFinished,
      })
    })

    console.log(arrayTeamList)

    return arrayTeamList

  } catch (error: unknown) {
    error = true
  }

  return []
}
