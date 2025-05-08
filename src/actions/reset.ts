"use server";

import * as z from "zod";
import { redirect } from 'next/navigation'
import { AuthError } from "next-auth";

import { signIn } from "../../auth";
import { ResetSchema, ResetRequestSchema } from "@/schemas/loginSchemas";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { USER_RESET_GET, USER_RESET_POST, USER_VERIFY_RESET_TOKEN_GET } from '@/functions/api/api';

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export const reset = async (
    values: z.infer<typeof ResetSchema>,
    callbackUrl?: string | null,
) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Campos inválidos!" };
    }  

    const { token, password, confirmPassword } = validatedFields.data;
    const { url } = USER_RESET_POST();

    try {
        // console.log(validatedFields.data);
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: token,
                newPassword: password,
                newPasswordRepeat: confirmPassword
            }),
        });
        if (!response.ok) throw Error("Erro na requisição de nova senha.");
        return (await response.json());
    } catch (error) {  
        // throw error;
        throw Error('Erro ao solicitar nova senha.');
    }
};

export const requestReset = async (
    values: z.infer<typeof ResetRequestSchema>,
    callbackUrl?: string | null,
  ) => {
    const validatedFields = ResetRequestSchema.safeParse(values);
  
    if (!validatedFields.success) {
      return { error: "Campos inválidos!" };
    }  
  
    const { email } = validatedFields.data;
    const { url } = USER_RESET_GET(email);
  
    try {
        const response = await fetch(url, {
            method: 'GET',
        });
        if (!response.ok) throw new Error("Erro na requisição de nova senha.")
        return (await response.json());
    } catch (error) {  
    //   throw error;
      throw new Error('Erro ao solicitar nova senha.');
    }
};

export const verifyResetToken = async (
    token: string
) => {
    if (!token) {
        return { error: "Token vazio" };
    }  
    const { url } = USER_VERIFY_RESET_TOKEN_GET();
    
    try {
        // console.log(token);
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: token
            }),
        });
        if (!response.ok) throw Error("Erro na requisição de nova senha.");
        const returnVerify = await response.json();
        if (returnVerify && !returnVerify.valid) {
            redirect('/auth/redefinir-senha?action=token_invalid')
        }
    } catch (error) {  
        throw error;
    }
};
