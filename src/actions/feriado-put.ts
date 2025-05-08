'use server';

import { FERIADO_PUT } from '@/functions/api/api';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '../../auth';
import { feriadoEditarFormType } from '@/schemas/feriadoEditarFormSchema';

export default async function feriadoPut(values: feriadoEditarFormType) {

  const session = await auth();

  if (!values.date) {
    return;
  }
  const dateParts = values.date.split('-');
  const dayMonth = `${dateParts[2]}/${dateParts[1]}`;

  const year = dateParts[0];

  const dadosToSend = {
    description: values.nome,
    dayMonth: dayMonth,
    year: year,

  }


  try {
    if (!values.id)
      throw new Error('Preencha os dados.');
    const { url } = FERIADO_PUT(values.id);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session?.accessToken,
       
      },
   
      body: JSON.stringify(dadosToSend) ,
    });

    console.log(response)
    if (!response.ok) throw new Error('Erro ao editar a equipe.');
  } catch (error: unknown) {
    return { error: true, message: 'Não foi possível editar esse feriado' };
  }
  revalidatePath(`/feriados/editar/${values.id}`);
  revalidatePath(`/feriados`);
  redirect('/feriados');
}
