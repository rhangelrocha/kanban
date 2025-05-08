'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { handleEmailFire } from '@/lib/email-helper';

export async function emailSend(values: any) {

    const emailHtml = values.html;

    const options = {
        to: values.to,
        subject: values.subject,
        html: emailHtml,
    };

    try {
        if (!values.to || !values.subject || !values.html) throw new Error('Preencha todos os dados');
        const response = await handleEmailFire(options);
        if (response) console.log('Callback envio de e-mail:', response);
        if (!response) throw new Error('Erro ao enviar e-mail.');
        return { response: null, ok: true };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { data: null, ok: false, error: error.message };
        }
    }
}