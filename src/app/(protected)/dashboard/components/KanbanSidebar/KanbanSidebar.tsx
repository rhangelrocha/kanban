// "use client"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import styles from "./styles.module.css"

import { Icons } from "@/components/icons";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { CaretSortIcon, InfoCircledIcon, CheckIcon, LayoutIcon, Cross1Icon, Cross2Icon } from "@radix-ui/react-icons"
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible"
import { HoverCard, HoverCardContent, HoverCardSimple, HoverCardTrigger, } from "@/components/ui/hover-card"
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge";
import TagSelect, { TagSelectOptions } from "./TagSelect";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type SidebarType = React.HTMLAttributes<HTMLElement>

const zSelectArray = z.object({
    value: z.string().optional(),
    label: z.union([z.string(), z.unknown()]).optional(),
}).array()

const FormSchema = z.object({
    // email: z.string({
    //     required_error: "Selecione uma opção",
    // }),
    show_subtasks: z.string().optional(),
    saved: z.string().optional(),
    title_check: z.boolean().optional(),
    title: z.string().optional(),
    id_check: z.boolean().optional(),
    id: zSelectArray.optional(),
    clientes_check: z.boolean().optional(),
    clientes: zSelectArray.optional(),
    grupos_check: z.boolean().optional(),
    grupos: zSelectArray.optional(),
    projetos_check: z.boolean().optional(),
    projetos: zSelectArray.optional(),
    equipes_check: z.boolean().optional(),
    equipes: zSelectArray.optional(),
    tipo_check: z.boolean().optional(),
    tipo: zSelectArray.optional(),
    tags_check: z.boolean().optional(),
    tags: zSelectArray.optional(),
    alocados_check: z.boolean().optional(),
    alocados: zSelectArray.optional(),
    criado_por_check: z.boolean().optional(),
    criado_por: zSelectArray.optional(),
    seguidores_check: z.boolean().optional(),
    seguidores: zSelectArray.optional(),
    minhas_partes_abertas: z.boolean().optional(),
    tarefas_atrasadas: z.boolean().optional(),
    tarefas_urgentes: z.boolean().optional(),
    tarefas_execucao: z.boolean().optional(),
    tarefas_reabertas: z.boolean().optional(),
    tarefas_repeticao: z.boolean().optional(),
    compartilhadas: z.boolean().optional(),
    esforco_ultrapassado: z.boolean().optional(),
    entregue: z.boolean().optional(),
    aprovacao: z.boolean().optional()
})


const statuses: TagSelectOptions[] = [
    {
        value: "Operação",
        label: "Operação",
    },
    {
        value: "Quadro 1",
        label: "Quadro 1",
    },
    {
        value: "Quadro 2",
        label: "Quadro 2",
    },
    {
        value: "Quadro 3",
        label: "Quadro 3",
    },
    {
        value: "Quadro 4",
        label: "Quadro 4",
    },
]
const fakeIds: TagSelectOptions[] = [
    {
        value: "29007",
        label: "29007 - PIRA | APP REPORTEI",
    },
    {
        value: "29008",
        label: "29008 - COMPAGNO | Kanban",
    },
    {
        value: "29009",
        label: "29009 - Compagno | Seguro Imobiliário Bradesco",
    }
]
const fakeClients: TagSelectOptions[] = [
    {
        value: "compagno",
        label: "CMPG | Compagno",
    },
    {
        value: "boulevard",
        label: "BLVD | Shopping Boulevard",
    },
    {
        value: "deezer",
        label: "DZZR | Deezer",
    }
]
const fakeUsers: TagSelectOptions[] = [
    {
        value: "Rhangel Rocha",
        label: <span className="flex gap-2 items-center">

            <Avatar className={cn("h-7 w-7", styles.avatar)}>
                <AvatarImage
                    src="https://d22iebrrkdwkpr.cloudfront.net/avatars/aedigital/rhangel-rocha/b6881e140971ff4ad556a4a64c414ae9mini.jpeg"
                    alt="rhangel"
                />
                <AvatarFallback className="text-[10px]">RR</AvatarFallback>
            </Avatar>
            Rhangel Rocha
        </span>,
    },
    {
        value: "Danillo Muniz",
        label: <span className="flex gap-2 items-center">
            <Avatar className={cn("h-7 w-7", styles.avatar)}>
                <AvatarImage
                    src="https://d22iebrrkdwkpr.cloudfront.net/avatars/aedigital/danillo-muniz/c4f1c9b5549ef22a963b0265831d05camini.jpeg"
                />
                <AvatarFallback className="text-sm">
                    RR
                </AvatarFallback>
            </Avatar>
            Danillo Muniz
        </span>,
    }
]

export default function KanbanSidebar(props: SidebarType) {

    const { className } = props;
    const [open, setOpen] = useState(true)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }
    const [isOpen, setIsOpen] = useState(false)

    const [boardsOpen, setBoardsOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<TagSelectOptions | null>({
        value: "Operação",
        label: "Operação",
    })

    const formValue = form.watch();
    const activeFilters = {
        title: !!formValue.title_check && !!formValue.title ? formValue.title : false,
        id: !!formValue.id_check && !!formValue.id?.length ? formValue.id : false,
        clientes: !!formValue.clientes_check && !!formValue.clientes?.length ? formValue.clientes : false,
        grupos: !!formValue.grupos_check && !!formValue.grupos?.length ? formValue.grupos : false,
        projetos: !!formValue.projetos_check && !!formValue.projetos?.length ? formValue.projetos : false,
        equipes: !!formValue.equipes_check && !!formValue.equipes?.length ? formValue.equipes : false,
        tipo: !!formValue.tipo_check && !!formValue.tipo?.length ? formValue.tipo : false,
        tags: !!formValue.tags_check && !!formValue.tags?.length ? formValue.tags : false,
        alocados: !!formValue.alocados_check && !!formValue.alocados?.length ? formValue.alocados : false,
        criado_por: !!formValue.criado_por_check && !!formValue.criado_por?.length ? formValue.criado_por : false,
        seguidores: !!formValue.seguidores_check && !!formValue.seguidores?.length ? formValue.seguidores : false,

        minhas_partes_abertas: !!formValue.minhas_partes_abertas,
        tarefas_atrasadas: !!formValue.tarefas_atrasadas,
        tarefas_urgentes: !!formValue.tarefas_urgentes,
        tarefas_execucao: !!formValue.tarefas_execucao,
        tarefas_reabertas: !!formValue.tarefas_reabertas,
        tarefas_repeticao: !!formValue.tarefas_repeticao,
        compartilhadas: !!formValue.compartilhadas,
        esforco_ultrapassado: !!formValue.esforco_ultrapassado,
        entregue: !!formValue.entregue,
        aprovacao: !!formValue.aprovacao,
    }
    const filtersNames = {
        title: 'Título',
        id: 'ID da tarefa',
        clientes: 'Clientes',
        grupos: 'Grupos',
        projetos: 'Projetos',
        equipes: 'Equipes',
        tipo: 'Tipo de tarefa',
        tags: 'Tags',
        alocados: 'Alocados',
        criado_por: 'Criado por',
        seguidores: 'Seguidores',
        minhas_partes_abertas: 'Minhas partes abertas',
        tarefas_atrasadas: 'Tarefas atrasadas',
        tarefas_urgentes: 'Tarefas urgentes',
        tarefas_execucao: 'Tarefas em execução',
        tarefas_reabertas: 'Tarefas reabertas',
        tarefas_repeticao: 'Tarefas com repetição',
        compartilhadas: 'Compartilhadas',
        esforco_ultrapassado: 'Esforço ultrapassado',
        entregue: 'Todas as partes entregues',
        aprovacao: 'Aguardando aprovação'
    }
    return (
        <>
            <aside
                {...props}
                className={[
                    className,
                    styles.Sidebar,
                    (open ? 'open' : 'closed')
                ].join(' ')}
            >

                <Button size={'icon'} variant={'secondary'} className=" w-8 h-8 flex-none hover:bg-primary absolute right-2 top-2.5 z-[99999]" onClick={() => setOpen(!open)}>
                    <Icons.chevronLeft className={cn("transition-all duration-500", open ? '' : 'rotate-180')} />
                </Button>
                {open ? <div className={cn(styles.openContent, 'flex flex-col w-full h-full grow')}>
                    <header className="px-2 pr-12 py-2 sticky top-0 left-0 flex-none flex items-center gap-2">
                        <Popover open={boardsOpen} onOpenChange={setBoardsOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="secondary" className="w-full justify-start font-bold flex gap-2">
                                    <LayoutIcon />{selectedStatus ? <>{selectedStatus.label}</> : <>Selecionar quadro</>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0" side="right" align="start">
                                <Command>
                                    <CommandInput placeholder="Pesquise" />
                                    <CommandList>
                                        <CommandEmpty>Nenhum quadro encontrado.</CommandEmpty>
                                        <CommandGroup>
                                            {statuses.map((status) => (
                                                <CommandItem
                                                    key={status.value}
                                                    value={status.value}
                                                    onSelect={(value) => {
                                                        setSelectedStatus(
                                                            statuses.find((priority) => priority.value === value) ||
                                                            null
                                                        )
                                                        setBoardsOpen(false)
                                                    }}
                                                >
                                                    {status.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </header>
                    <div className="flex flex-col gap-4 p-4 overflow-auto grow">

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
                                <FormField
                                    control={form.control}
                                    name="show_subtasks"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="cursor-pointer">Subtarefas</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Subtarefas" defaultValue={'hide'} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="hide">Ocultar todas</SelectItem>
                                                    <SelectItem value="show">Mostrar todas</SelectItem>
                                                    <SelectItem value="only">Exibir apenas subtarefas</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="saved"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="cursor-pointer">Filtos Salvos</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Nenhum filtro salvo" defaultValue={'hide'} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {/* <SelectItem value="hide">Ocultar todas</SelectItem>
                                                <SelectItem value="show">Mostrar todas</SelectItem>
                                                <SelectItem value="only">Exibir apenas subtarefas</SelectItem> */}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <hr style={{ margin: '1rem 0' }} />
                                <Collapsible className="w-full space-y-2" >
                                    <CollapsibleTrigger className="w-full flex items-center justify-between space-x-4">
                                        <h4 className="text-sm font-semibold flex items-center gap-2">
                                            <Badge className="px-1.5 pointer-events-none rounded-xl">{Object.values(activeFilters).filter(activeFilter => !!activeFilter).length}</Badge>
                                            Filtros ativos
                                            <HoverCardSimple text={'Quando os filtros estão selecionados eles são exibidos aqui'} contentProps={{ side: 'right', className: "pointer-events-none" }}>
                                                <InfoCircledIcon />
                                            </HoverCardSimple>
                                        </h4>
                                        <Button variant="ghost" size="sm" type="button" asChild>
                                            <a>
                                                <CaretSortIcon className="h-4 w-4" />
                                                <span className="sr-only">Alternar</span>
                                            </a>
                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="space-y-4">
                                        {Object.values(activeFilters).filter(activeFilter => !!activeFilter).length === 0 ? <>
                                            <div className="rounded-md border px-4 py-2 text-sm shadow-sm">
                                                Nenhum filtro ativo
                                            </div>
                                        </> : <>
                                            {Object.entries(activeFilters).filter(([field, value]) => !!value).map(([field, value], key) => {

                                                // @ts-ignore: Não encontrei solução
                                                const name = filtersNames[field]

                                                let values: string | React.ReactNode = '';
                                                if (typeof value === 'string' || typeof value === 'number') {
                                                    values = <div className="rounded-md px-2 py-1 text-xs bg-secondary w-full">{value}</div>;
                                                } else if (typeof value === 'object') {
                                                    values = value.map(({ value, label }: any) => {
                                                        if (field === 'id') {
                                                            return <div className="rounded-md px-2 py-1 text-xs bg-secondary" key={value}>{value}</div>;
                                                            // } else if (['alocados', 'criado_por', 'seguidores'].includes(field)) {
                                                            //     return <p className=''>{v.label}</p>
                                                        } else {
                                                            return <div className="rounded-md px-2 py-1 text-xs bg-secondary" key={value}>{label}</div>;
                                                        }
                                                    });
                                                } else if (typeof value === 'boolean') {
                                                    return <div key={key}>
                                                        <div className=" -mt-2">
                                                            <Badge className="rounded-md px-2 py-1 text-xs">{name}</Badge>
                                                        </div>
                                                    </div>
                                                }


                                                return (
                                                    <div className="rounded-md border p-2 pt-4 mt-2 text-sm shadow-sm relative" key={key}>
                                                        <Badge className="px-1 py-0 pointer-events-none absolute left-2 -top-2">{name}</Badge>
                                                        <div className={cn("flex gap-2 flex-wrap", styles.activeFiltersBadge)}>
                                                            <>
                                                                {values}
                                                            </>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </>}
                                    </CollapsibleContent>
                                </Collapsible>
                                <Collapsible className="w-full space-y-2" >
                                    <CollapsibleTrigger className="w-full flex items-center justify-between space-x-4">
                                        <h4 className="text-sm font-semibold flex items-center gap-2">
                                            Filtros avançados
                                            <HoverCard openDelay={0} closeDelay={0}>
                                                <HoverCardTrigger><InfoCircledIcon /></HoverCardTrigger>
                                                <HoverCardContent side="right" className="pointer-events-none">Expanda para visualizar mais opções de filtros</HoverCardContent>
                                            </HoverCard>
                                        </h4>
                                        <Button variant="ghost" size="sm" type="button" asChild>
                                            <a>
                                                <CaretSortIcon className="h-4 w-4" />
                                                <span className="sr-only">Alternar</span>
                                            </a>
                                        </Button>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="space-y-1">
                                        <div className={`rounded-md ${!!form.watch('title_check') && 'border shadow-sm'} p-2 text-sm space-y-2`}>

                                            <FormField
                                                control={form.control}
                                                name="title_check"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Título
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                            {!!form.watch('title_check') &&
                                                <FormField
                                                    control={form.control}
                                                    name="title"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <Input placeholder="Digite o título..." {...field} />
                                                                </FormControl>
                                                            </FormItem>
                                                        </FormItem>
                                                    )}
                                                />
                                            }
                                        </div>
                                        <div className={`rounded-md ${!!form.watch('id_check') && 'border shadow-sm'} p-2 text-sm space-y-2`}>

                                            <FormField
                                                control={form.control}
                                                name="id_check"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    ID da tarefa
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                            {form.watch('id_check') &&
                                                <FormField
                                                    control={form.control}
                                                    name="id"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormItem>
                                                                <FormControl>
                                                                    <TagSelect field={field} options={fakeIds} onChange={(v) => form.setValue(field.name, v)} onSearch={console.log} display="value" />
                                                                </FormControl>
                                                            </FormItem>
                                                        </FormItem>
                                                    )}
                                                />
                                            }
                                        </div>
                                        <div className={`rounded-md ${!!form.watch('clientes_check') && 'border shadow-sm'} p-2 text-sm space-y-2`}>

                                            <FormField
                                                control={form.control}
                                                name="clientes_check"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Clientes
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                            {form.watch('clientes_check') &&
                                                <FormField
                                                    control={form.control}
                                                    name="clientes"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormItem>
                                                                <FormControl>
                                                                    <TagSelect field={field} options={fakeClients} onChange={(v) => form.setValue(field.name, v)} onSearch={console.log} />
                                                                </FormControl>
                                                            </FormItem>
                                                        </FormItem>
                                                    )}
                                                />
                                            }
                                        </div>
                                        <div className={`rounded-md ${!!form.watch('grupos_check') && 'border shadow-sm'} p-2 text-sm space-y-2`}>

                                            <FormField
                                                control={form.control}
                                                name="grupos_check"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Grupos
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                            {form.watch('grupos_check') &&
                                                <FormField
                                                    control={form.control}
                                                    name="grupos"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <TagSelect field={field} options={fakeClients} onChange={(v) => form.setValue(field.name, v)} onSearch={console.log} />
                                                                </FormControl>
                                                            </FormItem>
                                                        </FormItem>
                                                    )}
                                                />
                                            }
                                        </div>
                                        <div className={`rounded-md ${!!form.watch('projetos_check') && 'border shadow-sm'} p-2 text-sm space-y-2`}>

                                            <FormField
                                                control={form.control}
                                                name="projetos_check"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Projetos
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                            {form.watch('projetos_check') &&
                                                <FormField
                                                    control={form.control}
                                                    name="projetos"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <TagSelect field={field} options={fakeClients} onChange={(v) => form.setValue(field.name, v)} onSearch={console.log} />
                                                                </FormControl>
                                                            </FormItem>
                                                        </FormItem>
                                                    )}
                                                />
                                            }
                                        </div>
                                        <div className={`rounded-md ${!!form.watch('equipes_check') && 'border shadow-sm'} p-2 text-sm space-y-2`}>

                                            <FormField
                                                control={form.control}
                                                name="equipes_check"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Equipes
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                            {form.watch('equipes_check') &&
                                                <FormField
                                                    control={form.control}
                                                    name="equipes"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <TagSelect field={field} options={fakeClients} onChange={(v) => form.setValue(field.name, v)} onSearch={console.log} />
                                                                </FormControl>
                                                            </FormItem>
                                                        </FormItem>
                                                    )}
                                                />
                                            }
                                        </div>
                                        <div className={`rounded-md ${!!form.watch('tipo_check') && 'border shadow-sm'} p-2 text-sm space-y-2`}>

                                            <FormField
                                                control={form.control}
                                                name="tipo_check"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Tipo de tarefa
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                            {form.watch('tipo_check') &&
                                                <FormField
                                                    control={form.control}
                                                    name="tipo"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <TagSelect field={field} options={fakeClients} onChange={(v) => form.setValue(field.name, v)} onSearch={console.log} />
                                                                </FormControl>
                                                            </FormItem>
                                                        </FormItem>
                                                    )}
                                                />
                                            }
                                        </div>
                                        <div className={`rounded-md ${!!form.watch('tags_check') && 'border shadow-sm'} p-2 text-sm space-y-2`}>

                                            <FormField
                                                control={form.control}
                                                name="tags_check"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Tags
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                            {form.watch('tags_check') &&
                                                <FormField
                                                    control={form.control}
                                                    name="tags"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <TagSelect field={field} options={fakeClients} onChange={(v) => form.setValue(field.name, v)} onSearch={console.log} />
                                                                </FormControl>
                                                            </FormItem>
                                                        </FormItem>
                                                    )}
                                                />
                                            }
                                        </div>
                                        <hr style={{ margin: '1rem 0' }} />
                                        <div className={`rounded-md ${!!form.watch('alocados_check') && 'border shadow-sm'} p-2 text-sm space-y-2`}>

                                            <FormField
                                                control={form.control}
                                                name="alocados_check"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Alocados
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                            {form.watch('alocados_check') &&
                                                <FormField
                                                    control={form.control}
                                                    name="alocados"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <TagSelect field={field} options={fakeUsers} onChange={(v) => form.setValue(field.name, v)} onSearch={console.log} display="avatar" />
                                                                </FormControl>
                                                            </FormItem>
                                                        </FormItem>
                                                    )}
                                                />
                                            }
                                        </div>
                                        <div className={`rounded-md ${!!form.watch('criado_por_check') && 'border shadow-sm'} p-2 text-sm space-y-2`}>

                                            <FormField
                                                control={form.control}
                                                name="criado_por_check"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Criado por
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                            {form.watch('criado_por_check') &&
                                                <FormField
                                                    control={form.control}
                                                    name="criado_por"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <TagSelect field={field} options={fakeUsers} onChange={(v) => form.setValue(field.name, v)} onSearch={console.log} display="avatar" />
                                                                </FormControl>
                                                            </FormItem>
                                                        </FormItem>
                                                    )}
                                                />
                                            }
                                        </div>
                                        <div className={`rounded-md ${!!form.watch('seguidores_check') && 'border shadow-sm'} p-2 text-sm space-y-2`}>

                                            <FormField
                                                control={form.control}
                                                name="seguidores_check"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Seguidores
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                            {form.watch('seguidores_check') &&
                                                <FormField
                                                    control={form.control}
                                                    name="seguidores"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                <FormControl>
                                                                    <TagSelect field={field} options={fakeUsers} onChange={(v) => form.setValue(field.name, v)} onSearch={console.log} display="avatar" />
                                                                </FormControl>
                                                            </FormItem>
                                                        </FormItem>
                                                    )}
                                                />
                                            }
                                        </div>
                                        <hr style={{ margin: '1rem 0' }} />
                                        <div className="rounded-md p-2 text-sm ">

                                            <FormField
                                                control={form.control}
                                                name="minhas_partes_abertas"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Minhas partes abertas
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="rounded-md p-2 text-sm ">

                                            <FormField
                                                control={form.control}
                                                name="tarefas_atrasadas"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Tarefas atrasadas
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="rounded-md p-2 text-sm">

                                            <FormField
                                                control={form.control}
                                                name="tarefas_urgentes"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Tarefas urgentes
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="rounded-md p-2 text-sm">

                                            <FormField
                                                control={form.control}
                                                name="tarefas_execucao"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Tarefas em execução
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="rounded-md p-2 text-sm">

                                            <FormField
                                                control={form.control}
                                                name="tarefas_reabertas"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Tarefas reabertas
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="rounded-md p-2 text-sm">

                                            <FormField
                                                control={form.control}
                                                name="tarefas_repeticao"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Tarefas com repetição
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="rounded-md p-2 text-sm">

                                            <FormField
                                                control={form.control}
                                                name="compartilhadas"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Compartilhadas
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="rounded-md p-2 text-sm">

                                            <FormField
                                                control={form.control}
                                                name="esforco_ultrapassado"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Esforço ultrapassado
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="rounded-md p-2 text-sm">

                                            <FormField
                                                control={form.control}
                                                name="entregue"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Todas as partes entregues
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <div className="rounded-md p-2 text-sm">

                                            <FormField
                                                control={form.control}
                                                name="aprovacao"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                            <div className="space-y-1 leading-none">
                                                                <FormLabel className="cursor-pointer">
                                                                    Aguardando aprovação
                                                                </FormLabel>
                                                            </div>
                                                        </FormItem>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>

                            </form>
                        </Form>
                    </div>
                    <footer className="px-2 py-2  bottom-0 left-0 w-full flex-none flex flex-row gap-2">

                        <Button onClick={form.handleSubmit(onSubmit)} className="basis-1/3" type="submit" variant={'secondary'}>Mover</Button>
                        <Button onClick={form.handleSubmit(onSubmit)} className="basis-1/3" type="submit">Salvar</Button>
                        <Button onClick={form.handleSubmit(onSubmit)} className="basis-1/3" type="submit" variant={'destructive'}>Limpar</Button>
                    </footer>
                </div> :
                    <div className={cn(styles.closedContent, 'py-2 pt-[3.125em] gap-3')}>

                        <HoverCardSimple text={<>
                            Atualmente existem {Object.values(activeFilters).filter(activeFilter => !!activeFilter).length} filtro(s) ativo(s)
                        </>} contentProps={{ side: 'right' }}>
                            <div className="flex flex-col items-center gap-2">
                                <Button size={'icon'} variant={'secondary'} className=" w-8 h-8 hover:bg-primary" onClick={() => setOpen(!open)}>
                                    <Icons.filters />
                                </Button>
                                {Object.values(activeFilters).filter(activeFilter => !!activeFilter).length > 0 &&
                                    <Badge className="px-1.5 pointer-events-none min-w-5 text-center rounded-xl">{Object.values(activeFilters).filter(activeFilter => !!activeFilter).length}</Badge>
                                }
                            </div>
                        </HoverCardSimple>
                    </div>
                }
            </aside>
        </>
    )
}