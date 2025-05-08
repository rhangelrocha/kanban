'use server'

import {  PROJETO_GET } from '@/functions/api/api'
import apiError from '@/functions/api-error';
import { Project } from '@/models'
import { auth } from '../../auth';

export async function projetoGet(id: string) {
    const session = await auth();
    const { url } = PROJETO_GET(id);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: 'Bearer ' + session?.accessToken,
            },
            cache: 'no-store'
        })
        // console.log(response)
        const projeto = await response.json();
        // console.log('Callback Projeto obtido:', projeto); 
        if (projeto.error) throw new Error(projeto.error);
        return projeto as Project;
    } catch (error: unknown) {
        // console.log(error)
        return apiError(error);
    }
}