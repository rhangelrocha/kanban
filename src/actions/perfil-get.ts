'use server'

import { PERFIL_GET } from '@/functions/api/api'

import {  Profile } from '@/models'
import { auth } from '../../auth';



export default async function perfilGet() {
  const session = await auth();

  console.log(session);


  const { url } = PERFIL_GET()


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


    return (await response.json()) as Profile


  } catch (error: unknown) {

    // console.log(error)
    error = true

   
  }

  return null;

  
}
