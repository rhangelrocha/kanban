"use server";

import { Task, TaskList, TaskUpdateParams } from "@/models";
import apiFetch, { TASK_SHOW, TASK_UPDATE } from "@/functions/api/api";

export const updateTask = async (taskId: string, attrs: TaskUpdateParams): Promise<any> => {
  // const {
  //   title,
  //   onGoing,
  //   clientId,
  //   projectId,
  //   dashboardId,
  //   dashboardStageId,
  //   taskTypeId,
  //   desiredStartDate,
  //   desiredDate
  // } = attrs ? attrs : {};
  const { url, method } = TASK_UPDATE(taskId);

  try {
    const taskUpdated: any = await apiFetch<Task>(url, { 
      method, 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(attrs) 
    });
    console.log({ attr: JSON.stringify(attrs) });
    return taskUpdated;
  } catch (error) {
    console.error(error);
    return error;
  }
};