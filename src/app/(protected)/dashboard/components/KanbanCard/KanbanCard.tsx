"use client"
import React, { useState, useEffect, use, Suspense } from "react";

import styles from './styles.module.css'
import { cn } from "@/lib/utils";
import { type Task } from "@/types/kanban";
import { useTheme } from "next-themes";
import { HoverCard, HoverCardContent, HoverCardSimple, HoverCardTrigger, } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { ArrowBottomRightIcon, CalendarIcon, ClockIcon, DotsHorizontalIcon, DotsVerticalIcon, InfoCircledIcon, LayersIcon, PlayIcon } from "@radix-ui/react-icons"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons";
import { Progress } from "@/components/ui/Progress";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { showTask } from "@/actions/tasks/showTask";
import getInitials from "@/lib/getInitials";


interface CardProps extends React.HTMLAttributes<HTMLElement> {
    item?: Task
}



export default function KanbanCard({ item, ...props }: CardProps) {
    const { className } = props;
    const { resolvedTheme } = useTheme()
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    useEffect(() => {
        console.log(item);
        return
        setLoading(true);
        setData({});
        if (item?.id) {
            showTask(item.id as string).then(taskData => {
                setData(taskData);
                setLoading(false);
                console.log({ taskData })
            });
        }
    }, [])

    return (
        <div className={cn(className, styles.card, resolvedTheme)}>
            <>
                <header className="px-2">
                    <div className="flex items-center justify-between">
                        <div className="font-bold">
                            <HoverCardSimple text={
                                <div className="font-normal text-xs space-y-2 pointer-events-none">
                                    <p className="flex justify-between gap-2"><span className="font-bold">Cliente</span> {item?.client.name}</p>
                                    <Separator />
                                    <p className="flex justify-between gap-2"><span className="font-bold">Projeto</span> {item?.project.name}</p>
                                    <Separator />
                                    <p className="flex justify-between gap-2"><span className="font-bold">Tipo de tarefa</span> {item?.taskType.title}</p>
                                    {item?.tags && item?.tags.length > 0 && <>
                                        <Separator />
                                        <p className="flex justify-between gap-2"><span className="font-bold">Tags</span> {item.tags[0]}</p>
                                    </>}
                                </div>
                            }>
                                <ul className="flex gap-1">
                                    <li className="w-5 h-[0.30rem] rounded-xl bg-primary"><span className="invisible">{item?.client.name}</span></li>
                                    <li className="w-5 h-[0.30rem] rounded-xl bg-primary"><span className="invisible">{item?.project.name}</span></li>
                                    <li className="w-5 h-[0.30rem] rounded-xl bg-primary"><span className="invisible">{item?.taskType.title}</span></li>
                                    {item?.tags && item?.tags.length > 0 && <>
                                        <li className="w-5 h-[0.30rem] rounded-xl bg-primary"><span className="invisible">Site [DEV]</span></li>
                                    </>}
                                </ul>
                            </HoverCardSimple>
                        </div>
                        <div className="flex-none flex gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size={'icon'} className="h-5 w-5"><DotsHorizontalIcon /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    {/* <DropdownMenuLabel>Opções da etapa "{column.title}"</DropdownMenuLabel>
                                                <DropdownMenuSeparator /> */}
                                    <DropdownMenuItem>Enviar para o topo</DropdownMenuItem>
                                    <DropdownMenuItem>Mover de quadro</DropdownMenuItem>
                                    <DropdownMenuItem>Clonar</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Abrir comentários</DropdownMenuItem>
                                    <DropdownMenuItem>Compartilhar</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Converter em subtarefa</DropdownMenuItem>
                                    <DropdownMenuItem disabled>Converter em tarefa</DropdownMenuItem>
                                    <DropdownMenuItem disabled>Mover para outra tarefa</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Entregar tarefa</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-500">Apagar</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>
                <section className="px-2">
                    <Link href={`/task/${item?.id}`} scroll={false}>
                        <p className="text-sm font-bold leading-5 hover:text-primary-500 break-words">{item?.title}</p>
                    </Link>
                </section>
                <footer className="text-sm mt-2">
                    <div className="flex justify-between items-center px-2">
                        {item?.owner.name && <div className="flex gap-1 items-center">
                            <HoverCardSimple text={item?.owner.name}>
                                <Avatar className="h-7 w-7">
                                    <AvatarImage
                                        src={item?.owner.avatar}
                                        alt={item?.owner.name}
                                    />
                                    <AvatarFallback className="text-[10px] bg-red-500">{getInitials(item?.owner.name)}</AvatarFallback>
                                </Avatar>
                            </HoverCardSimple>
                        </div>}
                        <div className="flex gap-1">

                            <HoverCardSimple text={item?.desiredDate ? <span className="capitalize">{new Date(item.desiredDate).toLocaleDateString('pt-BR', {
                                weekday: "long",
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                            })}</span> : 'Definir data de entrega desejada para os alocados na tarefa. Isto influencia no atraso da tarefa'}>
                                <Button size={item?.desiredDate ? 'sm' : 'icon'} variant={'ghost'} className={`h-5 text text-gray-400 ${item?.desiredDate ? 'px-2 font-bold' : 'w-5'}`} onClick={(e) => router.push(`/task/${item?.id}#entrega`)}>
                                    {item?.desiredDate ? <span>
                                        {new Date(item.desiredDate).toLocaleDateString('pt-BR', {
                                            month: "numeric",
                                            day: "numeric",
                                        })}
                                    </span> : <Icons.calendar />}
                                </Button>
                            </HoverCardSimple>

                            <HoverCardSimple text={item?.hasNewComment ? 'Há novos comentários' : 'Visualizar comentários'}>
                                <Button size={'icon'} variant={'ghost'} className="h-5 w-5 text text-gray-400 relative" onClick={(e) => router.push(`/task/${item?.id}#comentarios`)}>
                                    {item?.hasNewComment && <span className="absolute background-red-500 w-2 h-2 z-1 left-0 top-0 rounded-full bg-red-500 border-2 border-solid" style={{ borderColor: 'var(--cardbg)', }}></span>}
                                    <Icons.comments />
                                </Button>
                            </HoverCardSimple>

                            <HoverCardSimple text={'Marcar/desmarcar como urgente'}>
                                <Button size={'icon'} variant={'ghost'} className={`h-5 w-5 text ${item?.asImportant ? 'text-red-500' : ''}`}>
                                    <Icons.flagFilled />
                                </Button>
                            </HoverCardSimple>
                        </div>
                    </div>
                    <div className="flex justify-between content-center items-center">
                        <div className="flex items-center">
                            <HoverCardSimple text={item?.isGoing ? `Basta apertar o ${<Icons.play />} para o tempo ser contado.` : 'Contando o tempo'}>
                                <Button size={'icon'} variant={'ghost'} className="h-7 w-7 text-xs">
                                    <Icons.pause />
                                </Button>
                            </HoverCardSimple>

                            <HoverCardSimple text={'Horas nessa tarefa: 1:00:00'}>
                                <span>1:00:00</span>
                            </HoverCardSimple>
                        </div>
                        {item?.isSubTask && <div className="flex gap-2 items-center">
                            <HoverCardSimple text={'Tarefa sem subtarefas / 3 subtarefas criadas e 3 já foram entregues'}>
                                <Button size={'sm'} variant={'ghost'} >
                                    <ArrowBottomRightIcon className="mr-1" /> 0/0
                                </Button>
                            </HoverCardSimple>
                        </div>}
                    </div>
                    <div className="-mx-1 -mb-1">
                        <HoverCardSimple text={'33% do horário estimado consumido'}>
                            <Progress value={33} className="h-1" />
                        </HoverCardSimple>
                    </div>
                </footer>
            </>
        </div>
    )
}

// const CardData = ({ item, dataPromisse }: CardProps & { dataPromisse: any }) => {
//     const data = use(dataPromisse);
//     console.log({ data });
//     const router = useRouter();
//     return (
//     )
// }