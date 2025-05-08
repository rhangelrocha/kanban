import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Toaster } from "react-hot-toast"

import styles from "./styles.module.css"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { UserResetForm } from "@/components/login/user-reset-form"
import { ModeToggle } from "../../../components/ModeToggle"

import { verifyResetToken } from "@/actions/reset"

export const metadata: Metadata = {
  title: "Entrar",
  description: "",
}

export default async function LoginPage(
  props: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  if (searchParams?.token) {
    if (typeof searchParams?.token === "string") {
      await verifyResetToken(searchParams.token)
    }
  }
  return (
    <>
      <div className="container relative h-[100vh] flex-col items-center justify-center grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute top-8 left-[50%] translate-x-[-50%] z-20 flex lg:hidden items-center justify-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-2 h-6 w-6"
            fill="hsl(var(--primary))"
          >
            <path d="M15.91 13.34l2.636-4.026-.454-.406-3.673 3.099c-.675-.138-1.402.068-1.894.618-.736.823-.665 2.088.159 2.824.824.736 2.088.665 2.824-.159.492-.55.615-1.295.402-1.95zm-3.91-10.646v-2.694h4v2.694c-1.439-.243-2.592-.238-4 0zm8.851 2.064l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.927-1.5-1.328zm-18.851 4.242h8v2h-8v-2zm-2 4h8v2h-8v-2zm3 4h7v2h-7v-2zm21-3c0 5.523-4.477 10-10 10-2.79 0-5.3-1.155-7.111-3h3.28c1.138.631 2.439 1 3.831 1 4.411 0 8-3.589 8-8s-3.589-8-8-8c-1.392 0-2.693.369-3.831 1h-3.28c1.811-1.845 4.321-3 7.111-3 5.523 0 10 4.477 10 10z" />
          </svg>
          Corre Corre
        </div>
        <div
          className={
            "absolute right-4 top-4 md:right-8 md:top-8 flex align-center"
          }
        >
          <Link
            href="/auth/login"
            className={cn(buttonVariants({ variant: "ghost" }), "mr-2")}
          >
            Voltar
          </Link>
          <ModeToggle />
        </div>
        <div
          className={cn(
            "relative h-full flex-col bg-muted p-10 text-white dark:border-r login-left hidden lg:flex xl:flex",
            styles.login_left
          )}
        >
          <div className={cn("absolute inset-0 bg-zinc-900", styles.bg_left)} />
          <div className="relative z-20 flex items-center justify-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mr-2 h-6 w-6"
              fill="#fff"
            >
              <path d="M15.91 13.34l2.636-4.026-.454-.406-3.673 3.099c-.675-.138-1.402.068-1.894.618-.736.823-.665 2.088.159 2.824.824.736 2.088.665 2.824-.159.492-.55.615-1.295.402-1.95zm-3.91-10.646v-2.694h4v2.694c-1.439-.243-2.592-.238-4 0zm8.851 2.064l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.927-1.5-1.328zm-18.851 4.242h8v2h-8v-2zm-2 4h8v2h-8v-2zm3 4h7v2h-7v-2zm21-3c0 5.523-4.477 10-10 10-2.79 0-5.3-1.155-7.111-3h3.28c1.138.631 2.439 1 3.831 1 4.411 0 8-3.589 8-8s-3.589-8-8-8c-1.392 0-2.693.369-3.831 1h-3.28c1.811-1.845 4.321-3 7.111-3 5.523 0 10 4.477 10 10z" />
            </svg>
            Corre Corre
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-[300px] flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Redefinir senha
              </h1>
            </div>
            <UserResetForm />
          </div>
          <Toaster
            position="bottom-right"
            containerClassName=""
            toastOptions={{
              className: "alert_default",
              duration: 5000,
              style: {
                border: "1px solid #e2e8f0",
              },
            }}
          />
        </div>
      </div>
    </>
  )
}
