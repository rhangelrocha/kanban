"use client"
import React, { useState, useEffect, useContext } from "react";
import styles from './styles.module.css';
import useKanban from "@/app/hooks/useKanban";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ClockIcon, DotsVerticalIcon, InfoCircledIcon, LayersIcon } from "@radix-ui/react-icons";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import KanbanCard from "../KanbanCard/KanbanCard";
import { Task } from "@/types/kanban";
import { KanbanContext } from "@/contexts/KanbanContext";
import { NewTaskModalOnFinishType } from "../NewTaskModal/NewTaskModal";
import { Draggable, Droppable } from "pragmatic-drag-and-drop";

export default function KanbanBoard(props) {
    const { className } = props;
    const { addCard, columns, setColumns } = useKanban({});
    const kanbanContext = useContext(KanbanContext);

    if (!kanbanContext) {
        throw new Error("KanbanContext must be used within a KanbanProvider");
    }

    const { createNewTask } = kanbanContext;

    const addTask = (columnId, task = undefined) => {
        let initialData = { ...task, column: columnId };
        const onFinish = (task) => {
            if (task && columnId) {
                addCard(`${columnId}`, task, false);
            }
        };
        createNewTask(initialData, onFinish);
    };

    const handleDragEnd = (event) => {
        const { source, destination } = event;
        if (!destination) return;

        const sourceColumn = columns[source.droppableId];
        const destinationColumn = columns[destination.droppableId];
        const movedTask = sourceColumn.items[source.index];

        sourceColumn.items.splice(source.index, 1);
        destinationColumn.items.splice(destination.index, 0, movedTask);

        setColumns({ ...columns });
    };

    return (
        <div className={[className, styles.board].join(' ')}>
            <ul className={cn(styles.columns, 'cursor-default')}>
                {Object.keys(columns).map((columnId) => {
                    const column = columns[columnId];
                    return (
                        <li className="flex" key={columnId}>
                            <header className="flex-none py-2 px-4 space-y-0 text-sm">
                                <div className="flex items-center justify-between">
                                    <div className="font-bold">{column.title}</div>
                                    <div className="flex-none">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size={'icon'}><DotsVerticalIcon /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuItem>Adicionar nova tarefa</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </header>
                            <Droppable id={columnId} onDrop={handleDragEnd}>
                                <div className={styles.cards}>
                                    {column.items.map((item, index) => (
                                        <Draggable key={item.id} id={item.id} index={index}>
                                            <KanbanCard task={item} />
                                        </Draggable>
                                    ))}
                                </div>
                            </Droppable>
                            <a className={styles.addCardCol} onClick={() => addTask(columnId)}>+ Adicionar tarefa</a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
