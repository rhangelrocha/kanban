'use server';

import { PERFIL_POST } from '@/functions/api/api';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '../../auth';
import { feriadoEditarFormType } from '@/schemas/feriadoEditarFormSchema';
import { perfilFormType } from '@/schemas/perfilSchema';

export default async function perfilPost(formData: FormData) {

  const session = await auth();

  console.log(formData.get('na_empresa_desde'));

  // const dateParts = values.date.split('-');
  // const dayMonth = `${dateParts[2]}/${dateParts[1]}`;

  // const year = dateParts[0];



  const cleanPhoneNumber = (phone: string | null): string => {
    if (!phone) return '';

    // Remove all non-numeric characters
    const cleaned = phone.replace(/\D/g, '');

    // Ensure the cleaned number has the correct length
    if (cleaned.length !== 11) {
      throw new Error('Invalid phone number length');
    }

    // Format the cleaned number
    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      return `+55 (${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phone;
  };

  const formattedPhone = cleanPhoneNumber(formData.get('telefone') as string);
  formData.set('telefone', formattedPhone);



  const dadosToSend = {
    name: formData.get('name'),
    email: formData.get('email'),
    roleInTheCompany: formData.get('cargo'),
    avatar: formData.get('avatar'),
    phone: formattedPhone,
    atTheCompanySince: formData.get('na_empresa_desde'),
    birthday: formData.get('data_de_nascimento'),

    // avatar: values.avatar,

  }

  console.log(dadosToSend);


  try {
    
    const { url } = PERFIL_POST();
    
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + session?.accessToken,
        
      },
      
      body: JSON.stringify(dadosToSend) ,
    });
    
    console.log(response)
    if (response.ok == false){
      throw new Error('Erro ao editar o perfillll.');

    }       
  } catch (error: unknown) {
    return { error: true, message: 'Não foi possível editar esse perfil' };
  }
  // revalidatePath(`/feriados/editar/${values.id}`);
  revalidatePath(`/perfil`);
  // redirect('/feriados');
}
