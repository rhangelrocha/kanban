"use server";
import apiFetch, { TASK_CREATE } from '@/functions/api/api';
import { listBoardStages } from '../board/listBoardStages';
import { th } from 'date-fns/locale';

interface CreateTaskData {
  boardId: string;
  [key: string]: any;
}

interface ApiResponse {
  error?: string;
  status?: any;
}

export async function createTask(data: CreateTaskData): Promise<any> {
  const { url, method } = TASK_CREATE();
  console.log({ data });

  // getFirstBoardStage

  const boardStages = await listBoardStages(data.boardId);
  if (boardStages.length === 0) {
    throw new Error('Não existe nenhuma coluna neste quadro');
  }
  const boardStageId = boardStages[0].id;
  const createData = {
    title: data.title,
    onGoing: data.onGoing,
    clientId: data.clientId,
    projectId: data.projectId,
    boardId: data.boardId,
    taskTypeId: data.taskTypeId,
    description: data.description,
    boardStageId
  };

  try {
    const response = await apiFetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(createData)
    }) as ApiResponse;
    
    if (response.error) {
      throw new Error(response.error);
    }
    return response;

  } catch (error: any) {
    throw error;
  }
}