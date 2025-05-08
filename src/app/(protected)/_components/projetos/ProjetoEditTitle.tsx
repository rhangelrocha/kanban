"use client"

import * as React from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formSchema } from "@/schemas/projetoTituloEditarFormSchema";
import { projetoTituloPut } from "@/actions/projeto-title-put";
import { projetoGet }from '@/actions/projeto-get'; 
import { Project } from "@/models";

export function ProjetoEditTitle({ 
    idProjeto,
    nameProjeto 
} : { 
    idProjeto: string,
    nameProjeto: string 
}) {
    const [tituloProjeto, setTituloProjeto] = React.useState<string>(nameProjeto);
    const [loadingTitle, setLoadingTitle] = React.useState<boolean>(false);
    const [activeEditTitle, setActiveEditTitle] = React.useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        mode: "onBlur",
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: idProjeto,
            name: nameProjeto,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // setActiveEditTitle(false);
        setLoadingTitle(true);
        setTituloProjeto(values.name);
        console.log('Iniciando atualização do titulo do projeto...');
        console.log(values);
        console.log('Atualizando projeto:', tituloProjeto);
        
        await projetoTituloPut(values)
        .then((data : any) => {
            console.log('Título do projeto alterado.');
            setActiveEditTitle(false);
            setLoadingTitle(false);
        });
    };

    // React.useEffect(() => {
    //     async function fetchProjeto() {
    //         console.log('Obtendo projeto...');
    //         setLoadingTitle(true);
    //         const projeto = await projetoGet(idProjeto) as Project;
    //         console.log('Projeto obtido:', projeto);
    //         setLoadingTitle(false);
    //         setTituloProjeto(projeto?.name);
    //         form.setValue('name', projeto?.name);
    //     }
    //     fetchProjeto();
    // }, [idProjeto]);

    return (
        <div className={'mt-0 flex items-center justify-between'}>
            {
                loadingTitle  ? (
                    <Skeleton className="w-[300px] h-[36px] rounded-s" />
                ) : (
                    !activeEditTitle ? (
                        <h2 
                            onClick={() => setActiveEditTitle(true)}
                            className="text-2xl font-bold cursor-pointer py-[2px]">{tituloProjeto}</h2>
                    ) : (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid gap-2">
                                    <div className="hidden">
                                        <FormField
                                            control={form.control}
                                            name="id"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-1">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            autoFocus
                                                            placeholder={tituloProjeto}
                                                            autoCapitalize="none"
                                                            autoCorrect="off"
                                                            className={cn('text-2xl font-bold outline-none focus-visible:ring-0')}
                                                            onBlur={() => {
                                                                if (field.value.trim() === '') {
                                                                    form.setValue('name', tituloProjeto);
                                                                    setActiveEditTitle(false);
                                                                } else if(field.value !== tituloProjeto) {
                                                                    form.handleSubmit(onSubmit)();
                                                                } else {
                                                                    setActiveEditTitle(false);
                                                                }
                                                                // setActiveEditTitle(false);
                                                            }}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    if (field.value.trim() === '') {
                                                                        form.setValue('name', tituloProjeto);
                                                                        setActiveEditTitle(false);
                                                                    } else if(field.value !== tituloProjeto) {
                                                                        form.handleSubmit(onSubmit)();
                                                                    } else {
                                                                        setActiveEditTitle(false);
                                                                    }
                                                                    // setActiveEditTitle(false);
                                                                }
                                                            }}
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            ref={field.ref} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </form>
                        </Form>
                    )
                )
            }         
        </div>
    )
}