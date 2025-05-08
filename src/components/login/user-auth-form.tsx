"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthError } from "next-auth";
import { signIn } from "../../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";
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

import { LoginSchema } from "@/schemas/loginSchemas";
import { login } from "@/actions/login";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className,  ...props }: UserAuthFormProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ? searchParams.get("callbackUrl") : '/dashboard';

  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();
  const [showPassword, setShowPassword] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const [openAlert, setOpenAlert] = React.useState<boolean>(false)
  const [dialogData, setDialogData] = React.useState<any>({})
  const { toast } = useToast()

  const closeAlertDialog = () => setOpenDialog(false);
  const closeAlert = () => setOpenAlert(false);

  const form =  useForm<z.infer<typeof LoginSchema>>({
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            // form.reset();
            // setError(data.error);
            setIsLoading(false);
            if (data.error == 'credenciais') {
              toast({
                duration: 3000,
                variant: "destructive",
                title: "Falha ao realizar o login!",
                description: "Verifique seu e-mail e senha.",
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              })
            } else {
              form.reset();
              toast({
                duration: 5000,
                variant: "destructive",
                title: "Falha ao realizar o login!",
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
            }
          }
        })
        .catch(() => 
          {
            setIsLoading(false);
            toast({
              duration: 3000,
              variant: "destructive",
              title: "Falha ao realizar o login!",
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            })
          }
        );
    });
  };

  React.useEffect(() => {
    if (searchParams.get("action") == 'reset') {
      toast({
        variant: 'success',
        duration: 388000,
        title: "Senha redefinida!",
        description: "Realize o login com usa nova senha.",
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      })       
    }
  }, []);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>E-mail</FormLabel> */}
                    <FormControl>
                      <Input
                        autoFocus
                        placeholder="E-mail"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        className={cn('outline-none focus-visible:ring-0', form.formState.errors.email ? 'border-red-500' : '')}
                        disabled={isLoading}
                        {...field} />
                    </FormControl>
                    {/* <ErrorSpace error={form.formState.errors.email} />
                    <FormMessage /> */}
                  </FormItem>
                )}
              />
              {/* <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="E-mail"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              /> */}
            </div>
            <div className="grid gap-1 relative">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>E-mail</FormLabel> */}
                    <FormControl>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                        autoCapitalize="none"
                        autoComplete="password"
                        autoCorrect="off"
                        className={cn('outline-none focus-visible:ring-0', form.formState.errors.password ? 'border-red-500' : '')}
                        disabled={isLoading}
                        {...field} />
                    </FormControl>
                    {/* <ErrorSpace error={form.formState.errors.email} />
                    <FormMessage /> */}
                  </FormItem>
                )}
              />
              { !showPassword ? 
              <>
                <Button 
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-2 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isLoading}>
                  <EyeOpenIcon className="h-4 w-4" />
                </Button>
              </> : 
              <>
                <Button 
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-2 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isLoading}>
                  <EyeNoneIcon className="h-4 w-4" />
                </Button>
              </> }
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Entrar
            </Button>
          </div>
        </form>
      </Form>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogTitle>{(dialogData && dialogData.title) ?? dialogData.title}</AlertDialogTitle>
          {(dialogData && dialogData.Description) ??
            <>
            <AlertDialogDescription>
              {dialogData.Description}
            </AlertDialogDescription>
          </>}
          <AlertDialogCancel>
            <button onClick={closeAlertDialog}>Fechar</button>
          </AlertDialogCancel>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}