'use server'

import {  EQUIPE_GET } from '@/functions/api/api'

import { Team } from '@/models'
import { auth } from '../../auth';



export default async function equipeGet(id: string) {
  const session = await auth();


  const { url } = EQUIPE_GET(id)

  let error = false

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
    // console.log(response)
    if (!response.ok) throw new Error("Erro na requisição.")


    return (await response.json()) as Team


  } catch (error: unknown) {

    // console.log(error)
    error = true

   
  }

  return null;

  
}
