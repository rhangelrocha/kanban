'use server';

import { EQUIPE_DELETE } from '@/functions/api/api';

import { revalidatePath } from 'next/cache';
import { equipeDeleteFormType } from '@/schemas/equipeDeleteFormSchema';
import { redirect } from 'next/navigation';

import { auth } from '../../auth';
export default async function equipeDelete(data: equipeDeleteFormType) {
  const session = await auth();
  // const id = formData.get('id') as string;
  const confirmar_apagar = data.confirmar_apagar;

  // console.log(confirmar_apagar)
  
  // if(!id) throw new Error('ID não encontrado');
  if(confirmar_apagar !== 'APAGAR') throw new Error('Digite a palavra "APAGAR" para confirmar a exclusão');
  try {

    const { url } = EQUIPE_DELETE(data.id);
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + session?.accessToken,
      },
     
    });
    if (!response.ok) throw new Error('Erro ao deletar a equipe.');
  } catch (error: unknown) {
    // return apiError(error);
  }
 
  revalidatePath('/equipes');
  redirect('/equipes');
  
}
