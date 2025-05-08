'use client'

import { NewTaskModal, NewTaskModalOnFinishType } from "@/app/(protected)/dashboard/components/NewTaskModal/NewTaskModal";
import { Task } from "@/types/kanban";
import React, { createContext, useState, ReactNode } from "react";
import { TaskProvider } from "./TaskContext";


interface KanbanContextType {
    createNewTask: (initialData: Task, onFinish: NewTaskModalOnFinishType) => void;
}

interface KanbanProviderType {
    children: ReactNode;
}

export const KanbanContext = createContext<KanbanContextType | undefined | null>(undefined);

export const KanbanProvider: React.FC<KanbanProviderType> = ({ children }) => {

    // Estado para controlar se o modal de criação de tarefa está aberto
    const [createTaskOpen, setCreateTaskOpen] = useState(false);

    // Estado para armazenar os dados iniciais da tarefa a ser criada
    const [createTaskInitialData, setCreateTaskInitialData] = useState<Task | null>(null);
    const [onNewTaskFinish, setOnNewTaskFinish] = useState<NewTaskModalOnFinishType | null>(null);
    // Função para fechar o modal de criação de tarefa
    const onCreateTaskClose = () => {
        setCreateTaskOpen(false);
    };

    // Função para abrir o modal de criação de tarefa com os dados iniciais
    const createNewTask = (initialData: Task, onFinish: NewTaskModalOnFinishType) => {
        setCreateTaskOpen(true);
        setCreateTaskInitialData(initialData);
        setOnNewTaskFinish(onFinish);
    };

    const value = {
        createNewTask,
    };

    return (
        <TaskProvider>
            <KanbanContext.Provider value={value}>
                <NewTaskModal
                    open={createTaskOpen}
                    initialData={createTaskInitialData} // Passando os dados iniciais para o modal
                    onClose={onCreateTaskClose}
                    onFinish={onNewTaskFinish} // Você pode passar a função onFinish que desejar aqui
                />
                {children}
            </KanbanContext.Provider>
        </TaskProvider>
    );
};
