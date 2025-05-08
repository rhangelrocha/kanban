'use server';

import {  EQUIPE_POST } from '@/functions/api/api';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { equipeCriarFormType } from '@/schemas/equipeCriarFormSchema';

import { auth } from '../../auth';


export default async function equipeCriar(data: equipeCriarFormType) {

  const session = await auth();

  let id_equipe = null;
  
  const dataToSend = {
    name: data.name,
  

  }
  // if(!id) throw new Error('ID não encontrado');
 
  try {

    const { url } = EQUIPE_POST();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session?.accessToken,
      },
      body: JSON.stringify(dataToSend),
     
    });
    if (!response.ok) throw new Error('Erro ao criar a equipe.');
    const equipe = await response.json();

    id_equipe = equipe.id;
    console.log(equipe.id)
  } catch (error: unknown) {
    // return apiError(error);
  }
 
  revalidatePath('/equipes');
  redirect('/equipes/editar/'+id_equipe);
  
}
