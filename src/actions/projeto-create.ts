'use server';

// import { PHOTO_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { PROJETO_POST } from '@/functions/api/api';
import { projetoSchema } from '@/schemas/projetoSchema';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '../../auth';

export default async function projetoCreate(values: projetoSchema) {

    const session = await auth();

    let projetoId = null;

    const dadosToSend = {
        name: values.name,
        clientId: values.clientId,
        groupId: values.groupId,
        callbackURL: values.callbackURL
    }

    try {
        if (!values.clientId)
        throw new Error('Preencha os dados.');
        const { url } = PROJETO_POST();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + session?.accessToken,            
            },        
            body: JSON.stringify(dadosToSend),
        });

        const projeto = await response.json();
        // console.log('Callback PUT Projetos:', response.json());
        if (projeto.error) throw new Error(projeto.error);        
        // if (!response.ok) throw new Error('Erro ao criar projeto.');
        projetoId = projeto.id;
        // console.log(projetoId);
    } catch (error: unknown) {
        return apiError(error);
    }

    if (dadosToSend.callbackURL != false) {
        revalidatePath(`/projetos/`);
        redirect(`/projetos/${projetoId}`);
    } else {
        return true;
    }
}
