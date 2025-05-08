'use server';

import {  FERIADO_POST } from '@/functions/api/api';

import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '../../auth';
import { feriadoCriarFormType } from '@/schemas/feriadoCriarFormSchema';


export default async function feriadoCriar(data: feriadoCriarFormType) {

  const session = await auth();

  let id_feriado = null;
  
  const [year, month, day] = (data.date ?? '').split('-');

  const dayMonth = `${day}/${month}`;
  const dataToSend = {
    date: data.date,
    description: data.name,
    dayMonth,
    year,
  };

  let error = false;

  // console.log(dataToSend)
  // if(!id) throw new Error('ID não encontrado');
 
  try {

    const { url } = FERIADO_POST();
    console.log(url)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session?.accessToken,
      },
      body: JSON.stringify(dataToSend),
     
    });

    console.log(response)
    
    if (!response.ok) throw new Error('Erro ao criar feriado.');
    const feriado = await response.json();

    console.log(feriado)

    id_feriado = feriado.id;
    console.log(feriado.id)
  } catch (error: unknown) {
    error = true;
    return { error: true, message: 'Erro ao criar feriado.' };
  }
 
  revalidatePath('/feriados');
  redirect('/feriados');
  
}
