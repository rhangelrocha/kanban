"use client"
import React, { useState, useEffect, useRef, Dispatch, SetStateAction, useMemo } from "react";


import Link from "next/link";
import { HoverCardSimple } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Moment from "react-moment";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { CalendarIcon, CaretDownIcon, CheckIcon, DotsHorizontalIcon, DotsVerticalIcon, DragHandleDots2Icon, PlusIcon, UploadIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Task as TaskKanban } from "@/types/kanban";
import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import { Icons } from "@/components/icons";
import { Progress } from "@/components/ui/Progress";


const initialTasks: Task[] = Array(2).fill(
    {
        title: 'Task',
        id: 1 as string | number
    }
).map((a, key) => {
    return { ...a, id: key + 1 }
});

interface TaskSubtasksProps extends React.HTMLAttributes<HTMLElement> {
    onClose?: boolean | (() => void);
}

interface Task extends DragItem {
    id: string | number;
}
export default function TaskSubtasks({ ...props }: TaskSubtasksProps) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)
    const handleTasksMove = (updated: Task[]) => {
        console.log(updated);
    }
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    return (

        <div className="overflow-auto flex flex-col h-full">

            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex items-center gap-4 justify-between">
                <div className="flex gap-4">
                    <h3>Subtarefas</h3>
                </div>
                <div className="flex gap-4">
                    <HoverCardSimple text="Enviar arquivos">
                        <Button variant={'secondary'} size={'icon'}><PlusIcon/></Button>
                    </HoverCardSimple>
                </div>
            </div>
            <div className="p-6 overflow-auto">

                <DragableList
                    className=""
                    marginBottom={1}
                    initialItems={tasks}
                    onMove={handleTasksMove}
                    RenderComponent={({ item, isDragging }) => {
                        return (<>
                            <div className=" 
                        rounded-lg relative overflow-hidden flex items-center  justify-between gap-4 p-4 pl-0 cursor-pointer
                        bg-gray-100 hover:bg-primary/30 dark:hover:bg-primary/30 dark:bg-gray-800 
                        "

                            >
                                <div className="flex gap-2 items-center">
                                    <div className="h-full flex items-center p-2">
                                        <DragHandleDots2Icon />
                                    </div>
                                    <div>{item.title}</div>
                                </div>
                                <div className="flex gap-2 items-center">

                                    <div className="flex flex-none items-center justify-between gap-2">
                                        <HoverCardSimple text="Rhangel Rocha">
                                            <Avatar className="h-7 w-7">
                                                <AvatarImage
                                                    src="https://d22iebrrkdwkpr.cloudfront.net/avatars/aedigital/rhangel-rocha/b6881e140971ff4ad556a4a64c414ae9mini.jpeg"
                                                    alt="rhangel"
                                                />
                                                <AvatarFallback className="text-[10px]">RR</AvatarFallback>
                                            </Avatar>
                                        </HoverCardSimple>
                                        <HoverCardSimple text="Rhangel Rocha">
                                            <Avatar className="h-7 w-7">
                                                <AvatarImage
                                                    src="https://d22iebrrkdwkpr.cloudfront.net/avatars/aedigital/rhangel-rocha/b6881e140971ff4ad556a4a64c414ae9mini.jpeg"
                                                    alt="rhangel"
                                                />
                                                <AvatarFallback className="text-[10px]">RR</AvatarFallback>
                                            </Avatar>
                                        </HoverCardSimple>
                                        {/* <Button size={'icon'} variant={'ghost'}><Icons.userPlus /></Button> */}
                                    </div>
                                    <div>
                                        <HoverCardSimple text="Definir início desejado">
                                            <Button size={'icon'} variant={'ghost'}><CalendarIcon className="h-4 w-4" /></Button>
                                        </HoverCardSimple>
                                    </div>
                                    <div>
                                        <HoverCardSimple text="Definir entrega desejada">
                                            <Button size={'icon'} variant={'ghost'}><CalendarIcon className="h-4 w-4" /></Button>
                                        </HoverCardSimple>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Button size={'icon'} variant={'default'}><Icons.play className="h-4 w-4" /></Button>
                                        <p className="font-bold">
                                            00:00<span className="text-sm">00</span>
                                        </p>
                                    </div>
                                    <div>
                                        <HoverCardSimple text="Definir entrega desejada">
                                            <Button size={'icon'} variant={'ghost'} className="hover:bg-green-500 hover:text-white"><CheckIcon className="h-6 w-6" /></Button>
                                        </HoverCardSimple>
                                    </div>
                                    <div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div>
                                                    <HoverCardSimple text="Mais ações">
                                                        <Button size={'icon'} variant={'ghost'}>
                                                            <DotsHorizontalIcon />
                                                        </Button>
                                                    </HoverCardSimple>
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuItem>Copiar Link</DropdownMenuItem>
                                                <DropdownMenuItem>Enviar por e-mail</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>Baixar</DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-500">Apagar</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                <div className="w-full absolute left-0 right-0 bottom-0">
                                    <HoverCardSimple text={'33% do horário estimado consumido'}>
                                        <Progress value={33} className="h-1" />
                                    </HoverCardSimple>
                                </div>
                            </div>
                        </>)
                    }}
                />
            </div>
        </div>
    )
}
interface DragItem {
    id: string | number;
    [key: string]: any;
}

interface DragItemProps {
    item: DragItem;
    isDragging: boolean;
}

interface DragableListProps extends React.HTMLAttributes<HTMLElement> {
    initialItems: DragItem[];
    onMove: boolean | ((updated: DragItem[]) => void);
    RenderComponent: (props: DragItemProps) => React.ReactElement;
    marginBottom?: number | string;
}
const DragableList = ({ initialItems, onMove, RenderComponent, marginBottom = 1, className }: DragableListProps) => {
    const [items, setItems] = useState<DragItem[]>(initialItems)
    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const reorderedItems = Array.from(items);
        const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, reorderedItem);

        setItems(reorderedItems);
    };
    useEffect(() => {
        if (typeof onMove === 'function') onMove(items)
    }, [items]);

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={'className mb-4'}
                    >
                        {items.map((item, index) => (
                            <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            userSelect: 'none',
                                            marginBottom: `${marginBottom}em`,
                                            ...provided.draggableProps.style,
                                        }}
                                    >
                                        <RenderComponent isDragging={snapshot.isDragging} item={item} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}