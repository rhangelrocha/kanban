'use server';

// import { PHOTO_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { PROJETO_PUT } from '@/functions/api/api';
import { projetoTituloEditarSchema } from "@/schemas/projetoTituloEditarFormSchema";
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '../../auth';

export async function projetoTituloPut(values: projetoTituloEditarSchema) {

    const session = await auth();

    const dadosToSend = {
        id: values.id,
        name: values.name
    }

    try {
        if (!values.id)
        throw new Error('Título do projeto é obrigatório');
        const { url } = PROJETO_PUT(values.id);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + session?.accessToken,            
            },        
            body: JSON.stringify(dadosToSend),
            next: {
                revalidate: 0,
            },
        });
        const projeto = await response.json();
        console.log('Callback Editar Titulo Projeto:', projeto);        
        if (projeto.error) throw new Error(projeto.error);
        return projeto;
    } catch (error: unknown) {
        return apiError(error);
    }
}
