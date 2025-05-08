'use server';

// import { PHOTO_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { PROJETO_PUT } from '@/functions/api/api';
import { projetoEditarFormType } from '@/schemas/projetoEditarFormSchema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '../../auth';

export default async function projetoPut(values: projetoEditarFormType) {

    const session = await auth();

    const dadosToSend = {
        // name: values.nome,
        clientId: values.client,
        projectGroupId: values.project_group,
        // projectStepId: values.client_id,
        active: values.active,
        // client: {...values.client},
        // projectGroup: {...values.project_group}
        callbackURL: values.callbackURL
    }

    try {
        if (!values.id)
        throw new Error('Preencha os dados.');
        const { url } = PROJETO_PUT(values.id);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + session?.accessToken,            
            },        
            body: JSON.stringify(dadosToSend) ,
        });

        // console.log('Callback PUT Projetos:', response.json());
        
        if (!response.ok) throw new Error('Erro ao editar a projeto.');
    } catch (error: unknown) {
        return apiError(error);
    }

    if (dadosToSend.callbackURL != false) {
        revalidatePath(`/projetos/`);
        revalidatePath(`/projetos/editar/${values.id}`);
        // revalidateTag('photos');
        redirect('/projetos');
    } else {
        return true;
    }
}
