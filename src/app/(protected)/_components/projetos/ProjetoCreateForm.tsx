"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Client, Group as GroupType } from "@/models"
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import { projetoCreateFormType } from "@/schemas/projetoCreateFormSchema";
import projetoCreate from "@/actions/projeto-create";
import { gruposGet } from '@/actions/grupos-get'; 

interface CreateProjetoProps extends React.HTMLAttributes<HTMLDivElement> {
    clients : Client[];
}

export function CreateProjeto({ className, clients, ...props }: CreateProjetoProps) {
    const [ createModal, setCreateModal ] = React.useState(false);
    const [isPending, startTransition] = React.useTransition();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { toast } = useToast();

    const [clientList, setClientList] = React.useState(clients);
    const [groupList, setGroupList] = React.useState<GroupType[]>([]);

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

    const form =  useForm<z.infer<typeof projetoCreateFormType>>({
        mode: "onBlur",
        resolver: zodResolver(projetoCreateFormType),
        defaultValues: {
            name: '',
            clientId: '',
            groupId: '',
            callbackURL: true,
        },
    });
    const clientValue = form.watch("clientId")

    const handleSubmit = async (values: z.infer<typeof projetoCreateFormType>) => {
        setIsLoading(true);

        startTransition(() => {
            // console.log(values);
            projetoCreate(values)
                .then((data : any) => {
                    if (data?.error) {
                        // form.reset();
                        // setError(data.error);
                        setIsLoading(false);
                        // console.log(data);
                        toast({
                            duration: 7000,
                            variant: "destructive",
                            title: data.error,
                            action: <ToastAction altText="Ok">Ok</ToastAction>,
                        });
                    } else {
                        setIsLoading(false);
                        toast({
                            duration: 10000,
                            title: "Projeto criado!",
                            action: <ToastAction altText="Ok">Ok</ToastAction>,
                        })
                        setCreateModal(false);
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

    React.useEffect(() => {
        if (!createModal) {
            form.reset();
        }
    }, [createModal, form]);

    return (
    <>
        <Button 
            onClick={() => setCreateModal(true)}
            className="">
                Novo projeto
        </Button>
        <Dialog open={createModal} onOpenChange={setCreateModal}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle className="text-center">Novo projeto</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1 mb-3">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-color-white">Projeto</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nome do projeto"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            className={cn('outline-none focus-visible:ring-0', form.formState.errors.name ? 'border-red-500' : '')}
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                                )}
                        />
                        </div>
                        <div className="grid gap-1 mb-3">
                            <FormField
                                control={form.control}
                                name="clientId"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-color-white">Cliente</FormLabel>
                                        <Popover open={isClientPopoverOpen} onOpenChange={setClientPopoverOpen} modal={true}>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-[100%] justify-between",
                                                            !field.value && "text-muted-foreground",
                                                            form.formState.errors.clientId ? 'border-red-500' : ''
                                                        )}
                                                        >
                                                        {field.value
                                                            ? clientList.find(
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
                                                                        form.setValue("clientId", cliente.id);
                                                                        console.log('Cliente selecionado:', {cliente});
                                                                        handleChangeClient(cliente.id);
                                                                        setClientPopoverOpen(false);
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
                        {clientValue && (
                            <div className="grid gap-1 mb-3">
                                <FormField
                                    control={form.control}
                                    name="groupId"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel className="text-color-white">Grupo</FormLabel>
                                            <Popover open={isGroupPopoverOpen} onOpenChange={setGroupPopoverOpen} modal={true}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-[100%] justify-between",
                                                            !field.value && "text-muted-foreground",
                                                            form.formState.errors.groupId ? 'border-red-500' : ''
                                                        )}
                                                        >
                                                            {field.value
                                                                ? groupList.find(
                                                                    (projeto) => projeto.id === field.value
                                                                )?.name
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
                                                                        form.setValue("groupId", grupo.id)
                                                                        setGroupPopoverOpen(false);
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
                        )}
                        <div className="flex flex-wrap justify-end gap-5">
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant={'secondary'}
                                    disabled={isLoading}>
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button 
                                className="px-10"
                                disabled={isLoading}>
                                {isLoading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Criar
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
          </DialogContent>
      </Dialog>
    </>
    );
};