'use server';

// import { PHOTO_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { EQUIPE_PUT } from '@/functions/api/api';
import { equipeEditarFormType } from '@/schemas/equipeEditarFormSchema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '../../auth';

export default async function equipePut(values: equipeEditarFormType) {

  const session = await auth();

  const dadosToSend = {
    name: values.nome,
    costCenter: values.centro_de_custo,
    userIds: values.membros?.map((membro) => membro.value),
    leaderIds: values.lideres?.map((lider) => lider.value) ,
  }


  try {
    if (!values.id)
      throw new Error('Preencha os dados.');
    const { url } = EQUIPE_PUT(values.id);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session?.accessToken,
       
      },
   
      body: JSON.stringify(dadosToSend) ,
    });

    // console.log(response)
    if (!response.ok) throw new Error('Erro ao editar a equipe.');
  } catch (error: unknown) {
    return apiError(error);
  }
  revalidatePath(`/equipes/editar/${values.id}`);
  revalidatePath(`/equipes`);
  // revalidateTag('photos');
  redirect('/equipes');
}
