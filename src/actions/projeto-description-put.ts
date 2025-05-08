'use server';

// import { PHOTO_POST } from '@/functions/api';
import apiError from '@/functions/api-error';
import { PROJETO_PUT } from '@/functions/api/api';
import { projetoDescricaoEditarSchema } from "@/schemas/projetoDescricaoEditarFormSchema";
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '../../auth';

export async function projetoDescricaoPut(values: projetoDescricaoEditarSchema) {

    const session = await auth();

    try {
        if (!values.id)
        throw new Error('Projeto inválido');
        if (!values.description)
        throw new Error('Descrição do projeto inválida');
        const { url } = PROJETO_PUT(values.id);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + session?.accessToken,            
            },        
            body: JSON.stringify(values),
            next: {
                revalidate: 0,
            },
        });
        const projeto = await response.json();
        console.log('Callback Editar Descricao Projeto:', projeto);        
        if (projeto.error) throw new Error(projeto.error);
        return projeto;
    } catch (error: unknown) {
        return apiError(error);
    }
}
