"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { any, z } from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons"

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog } from "@/components/Dialog"

import {
  LoginSchema,
  ResetRequestSchema,
  ResetSchema,
} from "@/schemas/loginSchemas"
import { reset, requestReset } from "@/actions/reset"

interface UserResetFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserResetForm({ className, ...props }: UserResetFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
    ? searchParams.get("callbackUrl")
    : "/dashboard"
  const token = searchParams.get("token")

  const [error, setError] = React.useState<string | undefined>("")
  const [success, setSuccess] = React.useState<string | undefined>("")
  const [isPending, startTransition] = React.useTransition()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const [openAlert, setOpenAlert] = React.useState<boolean>(false)
  const [dialogData, setDialogData] = React.useState<any>({})
  const { toast } = useToast()

  const [showPassword, setShowPassword] = React.useState(false)

  const onError = (errors: any) => {
    Object.values(errors).forEach((error: any) => {
      toast({
        duration: 5000,
        variant: "destructive",
        title: error?.message,
        // action: <ToastAction altText="Ok">Ok</ToastAction>,
      })
    })
  }

  const closeAlertDialog = () => setOpenDialog(false)
  const closeAlert = () => setOpenAlert(false)

  const form = useForm<
    z.infer<typeof ResetSchema> | z.infer<typeof ResetRequestSchema>
  >({
    mode: "onBlur",
    resolver: zodResolver(token ? ResetSchema : ResetRequestSchema),
    defaultValues: {
      token: searchParams.get("token"),
      password: "",
      confirmPassword: "",
    },
  })
  const handleSubmit = async (values: any) => {
    setIsLoading(true)
    startTransition(() => {
      if (token) {
        reset(values, callbackUrl)
          .then((data) => {
            console.log(data)
            if (data?.error) {
              // form.reset();
              setIsLoading(false)
              toast({
                duration: 5000,
                variant: "destructive",
                title: "Falha ao resetar sua senha!",
                description: data.error,
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              })
            } else {
              // revalidatePath('/auth/login');
              router.push("/auth/login?action=reset")
            }
          })
          .catch(() => {
            setIsLoading(false)
            toast({
              duration: 3000,
              variant: "destructive",
              title: "Falha ao resetar sua senha!",
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            })
          })
      } else {
        requestReset(values, callbackUrl)
          .then((data) => {
            console.log(data)
            if (data?.error) {
              // form.reset();
              // setError(data.error);
              setIsLoading(false)
              if (data.error == "404") {
                form.setError("email", {
                  type: "manual",
                  message: "Falha ao resetar sua senha!",
                })
                toast({
                  duration: 3000,
                  variant: "destructive",
                  title: "Não foi possível redefinir sua senha!",
                  description: "Seu e-mail não está cadastrado.",
                  action: <ToastAction altText="Ok">Ok</ToastAction>,
                })
              } else {
                toast({
                  duration: 5000,
                  variant: "destructive",
                  title: "Falha ao resetar senha!",
                  action: <ToastAction altText="Ok">Ok</ToastAction>,
                })
              }
            } else {
              form.reset()
              toast({
                title: "Redefinição de senha solicitada!",
                description: "Verifique a caixa de entrada do seu e-mail.",
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              })
              setIsLoading(false)
            }
          })
          .catch(() => {
            setIsLoading(false)
            toast({
              duration: 3000,
              variant: "destructive",
              title: "Falha ao resetar senha!",
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            })
          })
      }
    })
  }

  React.useEffect(() => {
    if (searchParams.get("action") == "token_invalid") {
      toast({
        variant: "destructive",
        duration: 388000,
        title: "Token expirado!",
        description: "Preencha seu e-mail e solicite novamente.",
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      })
    }
  }, [])

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, onError)}>
          <div className="grid gap-2">
            {searchParams.get("token") ? (
              <>
                <div className="grid gap-1 relative">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Senha"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            className={cn(
                              "outline-none focus-visible:ring-0",
                              "password" in form.formState.errors
                                ? "border-red-500"
                                : ""
                            )}
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {!showPassword ? (
                    <>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-2 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={isLoading}
                      >
                        <EyeOpenIcon className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-2 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={isLoading}
                      >
                        <EyeNoneIcon className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
                <div className="grid gap-1 relative">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirmar senha"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            className={cn(
                              "outline-none focus-visible:ring-0",
                              "confirmPassword" in form.formState.errors
                                ? "border-red-500"
                                : ""
                            )}
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {!showPassword ? (
                    <>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-2 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={isLoading}
                      >
                        <EyeOpenIcon className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-2 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                        disabled={isLoading}
                      >
                        <EyeNoneIcon className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="hidden"
                            placeholder="Senha"
                            autoCapitalize="none"
                            autoComplete="token"
                            autoCorrect="off"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-1 relative">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            autoFocus
                            placeholder="E-mail"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            className={cn(
                              "outline-none focus-visible:ring-0",
                              (form.formState.errors as any).email
                                ? "border-red-500"
                                : ""
                            )}
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Enviar
            </Button>
          </div>
        </form>
      </Form>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogTitle>
            {(dialogData && dialogData.title) ?? dialogData.title}
          </AlertDialogTitle>
          {(dialogData && dialogData.Description) ?? (
            <>
              <AlertDialogDescription>
                {dialogData.Description}
              </AlertDialogDescription>
            </>
          )}
          <AlertDialogCancel>
            <button onClick={closeAlertDialog}>Fechar</button>
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
