"use server";

import { Task, TaskList } from "@/models";
import apiFetch, { TASK_SHOW } from "@/functions/api/api";

export const showTask = async (taskId: string): Promise<Task> => {

    const { url, method } = TASK_SHOW(taskId);

    try {
        const task: Task = await apiFetch<Task>(url, { method });
        return task;
    } catch (error) {
        console.error(error);
        throw new Error("Erro na requisição.");
    }
};