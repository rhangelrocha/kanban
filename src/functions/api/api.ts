
import { boolean } from 'zod';
import { auth, signOut } from '../../../auth';

export const API_URL = process.env.API_URL

class APIError extends Error {
  status: number;
  data: any;

  constructor(status: number, data: any) {
    super(`Erro na requisição: ${status}`);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

export default async function apiFetch<T>(url: string, options: RequestInit = {}, r: boolean = false): Promise<T> {
  let headers: HeadersInit = options.headers || {};

  try {
    const session = await auth();

    headers = {
      Authorization: `Bearer ${session?.accessToken}`,
      ...headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
      next: { revalidate: 0 }, // Isso não deveria estar nos headers, veja observação abaixo
    });
    if (r) {
      return response as unknown as T;
    }

    if (response.status === 500) {
      throw new Error("Erro interno do servidor (500)");
    }

    if (response.status === 401) {
      await signOut();
      throw new Error("Não autorizado (401) - Usuário desconectado");
    }

    const data = await response.json();
    return data as T;
  } catch (err: any) {
    if (r) {
      return err.response as unknown as T;
    }
    return Promise.reject(err);
  }
}


export function EQUIPE_POST() {
  return {
    url: API_URL + '/team/',
  };
}
export function EQUIPE_PUT(id: string) {
  return {
    url: `${API_URL}/team/${id}`,
  };
}

export function EQUIPES_GET() {
  return {
    url: `${API_URL}/team/`,
  };
}

export function EQUIPE_GET(id: string) {
  return {
    url: `${API_URL}/team/${id}`,
  };
}

export function EQUIPE_DELETE(id: string) {
  return {
    url: `${API_URL}/team/${id}`,
  };
}


/**
  * USER : GET | POST
  * @type {string[]}
  */
export function USER_GET() {
  return {
    url: `${API_URL}/user/`,
  };
}
export function USER_RESET_GET(email: string) {
  return {
    url: `${API_URL}/recovery/user/?email=${email}`,
  };
}
export function USER_RESET_POST() {
  return {
    url: `${API_URL}/recovery/user`,
  };
}
export function USER_VERIFY_RESET_TOKEN_GET() {
  return {
    url: `${API_URL}/recoveryCheckToken/user`,
  };
}

/**
  * PROJETOS : GET | POST
  * @type {string[]}
  */
export function PROJETO_POST() {
  return {
    url: API_URL + '/project/',
  };
}
export function PROJETO_PUT(id: string) {
  return {
    url: `${API_URL}/project/${id}`,
  };
}

export function PROJETOS_GET() {
  return {
    url: `${API_URL}/project/`,
  };
}

export function PROJETO_GET(id: string) {
  return {
    url: `${API_URL}/project/${id}`,
  };
}

export function PROJETO_DELETE(id: string) {
  return {
    url: `${API_URL}/project/${id}`,
  };
}

/**
  * CLIENTES : GET | POST
  * @type {string[]}
  */
export function CLIENTE_POST() {
  return {
    url: API_URL + '/client/',
  };
}
export function CLIENTE_PUT(id: string) {
  return {
    url: `${API_URL}/client/${id}`,
  };
}

export function CLIENTES_GET() {
  return {
    url: `${API_URL}/client/`,
  };
}

export function CLIENTE_GET(id: string) {
  return {
    url: `${API_URL}/client/${id}`,
  };
}

export function CLIENTE_DELETE(id: string) {
  return {
    url: `${API_URL}/client/${id}`,
  };
}

/**
  * GRUPOS : GET | POST
  * @type {string[]}
  */
export function GRUPO_POST() {
  return {
    url: API_URL + '/client/',
  };
}
export function GRUPO_PUT(id: string) {
  return {
    url: `${API_URL}/client/${id}`,
  };
}

export function GRUPOS_GET(cliente?: string | undefined) {
  return {
    url: `${API_URL}/projectGroup/${cliente}`,
    method: 'GET',
  };
}

export function GRUPO_GET(id: string) {
  return {
    url: `${API_URL}/client/${id}`,
  };
}

export function GRUPO_DELETE(id: string) {
  return {
    url: `${API_URL}/client/${id}`,
  };
}


/**
  * TOKEN : GET | POST
  * @type {string[]}
  */
export function TOKEN_REFRESH() {
  return {
    url: API_URL + '/auth/refresh_token',
  };
}


export function FERIADOS_GET() {
  return {
    url: `${API_URL}/holiday/`,
  };
}

export function FERIADO_GET(id: string) {
  return {
    url: `${API_URL}/holiday/${id}`,
  };
}

export function FERIADO_DELETE(id: string) {
  return {
    url: `${API_URL}/holiday/${id}`,
  };
}

export function FERIADO_POST() {
  return {
    url: API_URL + '/holiday/',
  };
}

export function FERIADO_PUT(id: string) {
  return {
    url: `${API_URL}/holiday/${id}`,
  };
}

export function PERFIL_GET() {
  return {
    url: `${API_URL}/myprofile`,
  };
}

export function PERFIL_POST() {
  return {
    url: `${API_URL}/myprofile`,
  };
}




/**
  * TASK : GET | POST | DELELTE | PUT
  * @type {string[]}
  */

export function TASK_LIST() {
  return {
    url: `${API_URL}/task`,
    method: 'GET',
  };
}

export function TASK_CREATE() {
  return {
    url: `${API_URL}/task`,
    method: 'POST',
  };
}

export function TASK_PLAY(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/play`,
    method: 'POST',
  };
}

export function TASK_PAUSE(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/pause`,
    method: 'POST',
  };
}

export function TASK_DELIVER(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/deliver`,
    method: 'POST',
  };
}

export function TASK_DELIVER_PART(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/deliverPart`,
    method: 'POST',
  };
}

export function TASK_REOPEN(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/reopen`,
    method: 'POST',
  };
}

export function TASK_MARK_AS_URGENT(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/markAsUrgent`,
    method: 'POST',
  };
}

export function TASK_UNMARK_AS_URGENT(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/unmarkAsUrgent`,
    method: 'POST',
  };
}

export function TASK_ADD_TAG(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/tag`,
    method: 'POST',
  };
}

export function TASK_REMOVE_TAG(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/tag`,
    method: 'DELETE',
  };
}

export function TASK_ADD_FOLLOWER(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/follower`,
    method: 'POST',
  };
}

export function TASK_REMOVE_FOLLOWER(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/follower`,
    method: 'DELETE',
  };
}

export function TASK_ADD_TEAM_ASSIGNMENT(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/teamAssignment`,
    method: 'POST',
  };
}

export function TASK_REMOVE_TEAM_ASSIGNMENT(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/teamAssignment`,
    method: 'DELETE',
  };
}

export function TASK_ADD_USER_ASSIGNMENT(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/userAssignment`,
    method: 'POST',
  };
}

export function TASK_REMOVE_USER_ASSIGNMENT(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/userAssignment`,
    method: 'DELETE',
  };
}

export function TASK_ALTER_DASHBOARD_STAGE(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/alterDashboardStage`,
    method: 'POST',
  };
}

export function TASK_ALTER_DESCRIPTION(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}/alterDescription`,
    method: 'POST',
  };
}

export function TASK_UPDATE(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}`,
    method: 'PUT',
  };
}

export function TASK_SHOW(taskId: string) {
  return {
    url: `${API_URL}/task/${taskId}`,
    method: 'GET',
  };
}




/**
  * BOARDS : GET | POST | PUT
  * @type {string[]}
  */

export function BOARD_LIST() {
  return {
    url: `${API_URL}/board`,
    method: "GET",
  };
}

export function BOARD_TASKS(boardId: string) {
  return {
    url: `${API_URL}/board/${boardId}/tasks`,
    method: "GET",
  };
}

export function BOARD_CREATE() {
  return {
    url: `${API_URL}/board`,
    method: "POST",
  };
}

export function BOARD_UPDATE(boardId: string) {
  return {
    url: `${API_URL}/board/${boardId}`,
    method: "PUT",
  };
}

export function BOARD_SHOW(boardId: string) {
  return {
    url: `${API_URL}/board/${boardId}`,
    method: "GET",
  };
}


/**
  * BOARDS STAGES : GET | POST | PUT
  * @type {string[]}
  */


export function BOARD_STAGE_LIST() {
  return {
    url: `${API_URL}/boardStage`,
    method: "GET",
  };
}

export function BOARD_STAGE_CREATE() {
  return {
    url: `${API_URL}/boardStage`,
    method: "POST",
  };
}

export function BOARD_STAGE_UPDATE(boardStageId: string) {
  return {
    url: `${API_URL}/boardStage/${boardStageId}`,
    method: "PUT",
  };
}

export function BOARD_STAGE_SHOW(boardStageId: string) {
  return {
    url: `${API_URL}/boardStage/${boardStageId}`,
    method: "GET",
  };
}




/**
  * BOARDS STAGES : GET | POST | PUT
  * @type {string[]}
  */


export function PROJECT_GROUP_LIST() {

  return {
    url: `${API_URL}/projectGroup`,
    method: "GET",
  };
}
export function PROJECT_GROUP_CREATE() {
  return {
    url: `${API_URL}/projectGroup`,
    method: "POST",
  };
}
export function PROJECT_GROUP_UPDATE(projectGroupId: string) {
  return {
    url: `${API_URL}/projectGroup/${projectGroupId}`,
    method: "PUT",
  };
}
export function PROJECT_GROUP_SHOW(projectGroupId: string) {
  return {
    url: `${API_URL}/projectGroup/${projectGroupId}`,
    method: "GET",
  };
}


/**
  * BOARDS STAGES : GET | POST | PUT
  * @type {string[]}
  */


export function PROJECT_LIST() {

  return {
    url: `${API_URL}/project`,
    method: "GET",
  };
}
export function PROJECT_CREATE() {
  return {
    url: `${API_URL}/project`,
    method: "POST",
  };
}
export function PROJECT_UPDATE(projectId: string) {
  return {
    url: `${API_URL}/project/${projectId}`,
    method: "PUT",
  };
}
export function PROJECT_SHOW(projectId: string) {
  return {
    url: `${API_URL}/project/${projectId}`,
    method: "GET",
  };
}


/**
  * BOARDS STAGES : GET | POST | PUT
  * @type {string[]}
  */


export function CLIENTS_LIST() {

  return {
    url: `${API_URL}/client`,
    method: "GET",
  };
}
export function CLIENTS_CREATE() {
  return {
    url: `${API_URL}/client`,
    method: "POST",
  };
}
export function CLIENTS_UPDATE(ClientId: string) {
  return {
    url: `${API_URL}/client/${ClientId}`,
    method: "PUT",
  };
}
export function CLIENTS_SHOW(ClientId: string) {
  return {
    url: `${API_URL}/client/${ClientId}`,
    method: "GET",
  };
}



/**
  * BOARDS STAGES : GET | POST | PUT
  * @type {string[]}
  */


export function TASK_TYPE_LIST() {

  return {
    url: `${API_URL}/taskType`,
    method: "GET",
  };
}
export function TASK_TYPE_CREATE() {
  return {
    url: `${API_URL}/taskType`,
    method: "POST",
  };
}
export function TASK_TYPE_REMOVE(taskTypeId: string) {
  return {
    url: `${API_URL}/taskType/${taskTypeId}`,
    method: "DELETE",
  };
}
export function TASK_TYPE_SHOW(taskTypeId: string) {
  return {
    url: `${API_URL}/taskType/${taskTypeId}`,
    method: "GET",
  };
}

/**
  * USER : GET | POST | PUT
  * @type {string[]}
  */

export function USER_LIST() {
  return {
    url: `${API_URL}/user`,
    method: "GET",
  };
}

export function USER_SHOW(userId: string) {
  return {
    url: `${API_URL}/user/${userId}`,
    method: "GET",
  };
}

/**
  * TEAM : GET | POST | PUT
  * @type {string[]}
  */

export function TEAM_LIST() {
  return {
    url: `${API_URL}/team`,
    method: "GET",
  };
}

export function TEAM_SHOW(teamId: string) {
  return {
    url: `${API_URL}/team/${teamId}`,
    method: "GET",
  };
}



/**
  * TAGS : GET | POST | PUT
  * @type {string[]}
  */

export function TAG_LIST() {
  return {
    url: `${API_URL}/tag`,
    method: "GET",
  };
}