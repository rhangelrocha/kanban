"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "../../auth";
import { LoginSchema } from "@/schemas/loginSchemas";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos!" };
  }  

  const { email, password, code } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "credenciais" }
        default:
          return { error: "falha" }
      }
    }

    throw error;
  }
};