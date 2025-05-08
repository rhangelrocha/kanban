"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Client, Group as GroupType, GroupList } from "@/models"
import { gruposGet } from '@/actions/grupos-get'; 

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
import {
    Command,
    CommandEmpty,
    CommandList,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { ClientGroupSchema } from "@/schemas/clientGroupSchemas";
import projetoPut from "@/actions/projeto-put";
import { Group } from "@radix-ui/react-dropdown-menu"

interface EditClientGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    projectData: {
        id: string;
        client: {
            id: string;
            name: string;
        };
        group: {
            id: string;
            name: string;
        };
    };
    clients : Client[];
    groups : GroupType[];
    setClientModal : any;
}

export function EditClientGroup({ className, projectData, clients, groups, setClientModal, ...props }: EditClientGroupProps) {
    const [error, setError] = React.useState<string | undefined>("");
    const [success, setSuccess] = React.useState<string | undefined>("");
    const [isPending, startTransition] = React.useTransition();

    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [openDialog, setOpenDialog] = React.useState<boolean>(false)
    const [openAlert, setOpenAlert] = React.useState<boolean>(false)
    const [dialogData, setDialogData] = React.useState<any>({})
    const { toast } = useToast()

    const closeAlertDialog = () => setOpenDialog(false);
    const closeAlert = () => setOpenAlert(false);

    const [idProject, setIdProject] = React.useState(projectData?.id);
    const [idClient, setIdClient] = React.useState(projectData?.client?.id);
    const [idGroup, setIdGroup] = React.useState(projectData?.group?.id);
    
    const [clientList, setClientList] = React.useState(clients);
    const [groupList, setGroupList] = React.useState(groups);

    const [isClientPopoverOpen, setClientPopoverOpen] = React.useState(false);
    const [isGroupPopoverOpen, setGroupPopoverOpen] = React.useState(false);

    const handleChangeClient = async (id : string) => {
        startTransition(() => {
          gruposGet(id)
            .then((data) => {
                setGroupList(data);
            })
            .catch(() => 
              {
                // setIsLoading(false);
              }
            );
        });
      };

    const form =  useForm<z.infer<typeof ClientGroupSchema>>({
        mode: "onBlur",
        resolver: zodResolver(ClientGroupSchema),
        defaultValues: {
            id: idProject,
            client: idClient,
            project_group: idGroup,
            callbackURL: false,
        },
    });

    const handleSubmit = async (values: z.infer<typeof ClientGroupSchema>) => {
        setError("");
        setSuccess("");
        setIsLoading(true);

        startTransition(() => {
            console.log(values);
            projetoPut(values)
            .then((data : any) => {
                if (data?.error) {
                    // form.reset();
                    // setError(data.error);
                    setIsLoading(false);
                    console.log(data.error);
                    toast({
                        duration: 3000,
                        variant: "destructive",
                        title: "Falha ao atualizar projeto!",
                        description: "Tente novamente.",
                        action: <ToastAction altText="Ok">Ok</ToastAction>,
                    });
                } else {
                    setIsLoading(false);
                    toast({
                        duration: 3000,
                        title: "Projeto atualizado!",
                        action: <ToastAction altText="Ok">Ok</ToastAction>,
                    })
                    setClientModal(false);
                }
            })
            .catch(() => 
            {
                setIsLoading(false);
                    toast({
                    duration: 3000,
                    variant: "destructive",
                    title: "Falha ao atualizar projeto",
                    action: <ToastAction altText="Ok">Ok</ToastAction>,
                })
            }
            );
        });
    };

    const clientes = clients;
    
    const projetos = [
        { label: "HEYBOT | DEV", value: "38b88bb4-a034-474f-9255-5f607bedd19e" },
    ] as const

    return (
        <div className={cn("grid gap-6", className)} {...props}>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid gap-2">
                <div className="hidden">
                    <FormField
                        control={form.control}
                        name="id"
                        render={({ field }) => (
                        <FormItem>
                            <FormControl>
                            <Input
                                placeholder="ID do projeto"
                                autoCapitalize="none"
                                autoCorrect="off"
                                {...field} />
                            </FormControl>
                        </FormItem>
                        )}
                />
                </div>
                <div className="grid gap-1 mb-3">
                    <FormField
                        control={form.control}
                        name="client"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Cliente</FormLabel>
                                <Popover open={isClientPopoverOpen} onOpenChange={setClientPopoverOpen} modal={true}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-[100%] justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                >
                                                {field.value
                                                    ? clientes.find(
                                                        (cliente) => cliente.id === field.value
                                                    )?.name
                                                    : "Selecione o cliente"}
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[460px] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Buscar clientes..."
                                                className="h-9"
                                                />
                                            <CommandList>
                                                <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
                                                <CommandGroup>
                                                    {clientList.map((cliente) => (
                                                        <CommandItem
                                                            value={cliente.name}
                                                            key={cliente.id}
                                                            onSelect={() => {
                                                                form.setValue("client", cliente.id);
                                                                console.log('Cliente selecionado:', {cliente});
                                                                handleChangeClient(cliente.id);
                                                            }}
                                                            >
                                                                {cliente.name}
                                                                <CheckIcon
                                                                    className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    cliente.id === field.value
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                    )}
                                                                />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid gap-1 mb-3">
                    <FormField
                        control={form.control}
                        name="project_group"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Grupo do projeto</FormLabel>
                                <Popover open={isGroupPopoverOpen} onOpenChange={setGroupPopoverOpen} modal={true}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "w-[100%] justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                                {field.value
                                                    ? projetos.find(
                                                        (projeto) => projeto.value === field.value
                                                    )?.label
                                                    : "Selecione o projeto"}
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[460px] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="Buscar grupos..."
                                                className="h-9"
                                                />
                                            <CommandList>
                                                <CommandEmpty>Nenhum grupo encontrado.</CommandEmpty>
                                                <CommandGroup>
                                                    {groupList.map((grupo) => (
                                                        <CommandItem
                                                        value={grupo.name}
                                                        key={grupo.id}
                                                        onSelect={() => {
                                                            form.setValue("project_group", grupo.id)
                                                        }}
                                                        >
                                                        {grupo.name}
                                                        <CheckIcon
                                                            className={cn(
                                                            "ml-auto h-4 w-4",
                                                            grupo.id === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                            )}
                                                        />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </FormItem>
                        )}
                    />
                </div>
                <Button disabled={isLoading}>
                {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Confirmar
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