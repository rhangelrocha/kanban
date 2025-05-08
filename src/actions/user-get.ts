'use server';

import { USER_GET } from "@/functions/api/api";

import { auth } from '../../auth';


export default async function userGET() {

  const session = await auth();


  try {

    const { url } = USER_GET();
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + session?.accessToken,
      },
      next: {
        revalidate: 5,
      },
     
    });

    // console.log(response)
    if (!response.ok) throw new Error('Erro ao buscar usuários.');
    const data = await response.json();

    // console.log(data)

    return data;
    
  } catch (error: unknown) {
    // return apiError(error);
  }

  return null
 
}
