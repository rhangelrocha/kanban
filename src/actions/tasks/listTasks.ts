"use server";

import { Task, TaskList } from "@/models";
import apiFetch, { BOARD_TASKS, TASK_LIST } from "@/functions/api/api";
import { showTask } from "./showTask";

export const listTasks = async (boardId: string | undefined): Promise<Task[]> => {

    const { url, method } = !!boardId ? TASK_LIST() : BOARD_TASKS(boardId as string);

    try {
        const taskList: TaskList = await apiFetch<TaskList>(url, { method });
        return await Promise.all(taskList.tasks.map(async item => {
            try {
                const taskData = await showTask(item.id as string);
                return taskData;
            } catch (error: any) {
                return {
                    ...(item as Task),
                    error: error.message
                } as Task & { error?: string };
            }
        }));
    } catch (error) {
        console.error(error);
        throw new Error("Erro na requisição.");
    }
};
