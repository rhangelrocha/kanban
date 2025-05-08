"use client"
import React, { useState, useEffect, useRef, useContext, createContext, useMemo } from "react";
// import { type Task } from "@/types/kanban";
import { usePathname, useSearchParams } from "next/navigation";
import { showTask } from "@/actions/tasks/showTask";
import { TasksProvider } from "./TasksContext";
import { Task, TaskUpdateParams } from "@/models";
import { debounce } from "lodash";
import { updateTask } from "@/actions/tasks/updateTask";


interface TaskContextProps {
    setTaskID: React.Dispatch<React.SetStateAction<string | undefined>>;
    isLoadingTask: boolean;
    task?: Task;
    handleInput: (value: any, input: string) => void
}
interface TaskProviderProps {
    children?: React.ReactNode
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<TaskProviderProps> = ({
    children
}) => {
    const [isLoadingTask, setisLoadingTask] = useState<boolean>(true);
    const [taskID, setTaskID] = useState<string>();
    const [task, setTask] = useState<Task>()


    useEffect(() => {
        setisLoadingTask(true);
        console.log({ taskID })
        setTask(undefined);
        if (taskID) {
            showTask(taskID).then(taskData => {
                console.log({ taskData })
                setTask(taskData);
                setisLoadingTask(false);
            });
        }
    }, [taskID])

    const handleInput = debounce((value: any, input: string) => {

        console.log({ value, input })
        if (input === 'title') {
            setTask(old => old ? {
                ...old,
                title: value,
            } : old)
            if (taskID) {
                updateTask(taskID, { title: value }).then(r => console.log('r', r))
            }
        }
        if (input === 'board') {
            setTask(old => old ? {
                ...old,
                boardId: value.value,
                boardStage: {
                    name: value.label,
                    id: value.value
                }
            } : old)
            if (taskID) {
                console.log('updating')
                updateTask(taskID, { boardId: value.value }).then(r => console.log('r', r))
            }
        }
        if (input === 'boardStage') {
            setTask(old => old ? {
                ...old,
                boardStageId: value.value,
                boardStage: {
                    name: value.label,
                    id: value.value
                }
            } : old)
            if (taskID) {
                console.log('updating')
                updateTask(taskID, { boardStageId: value.value }).then(r => console.log('r', r))
            }
        }
        if (input === 'taskType') {
            setTask(old => old ? {
                ...old,
                boardId: value.value,
                boardStage: {
                    name: value.label,
                    id: value.value
                }
            } : old)
            if (taskID) {
                console.log('updating')
                updateTask(taskID, { boardId: value.value }).then(r => console.log('r', r))
            }
        }
        const validFields = [
            "title",
            "onGoing",
            "clientId",
            "projectId",
            "boardId",
            "boardStage",
            "taskTypeId",
            "desiredStartDate",
            "desiredDate"
        ] as const;
    })

    return (
        <TasksProvider>
            <TaskContext.Provider value={{
                setTaskID,
                isLoadingTask,
                task,
                handleInput
            }}>
                {children}
            </TaskContext.Provider>
        </TasksProvider>
    );
};

export const useTask = (): TaskContextProps => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('ContextProvier não encontrado');
    }
    return context;
};

