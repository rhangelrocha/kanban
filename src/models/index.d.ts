export type EquipeType = {
  id: string
  nome: string
  lider: { value: string, label: string }
  centro_de_custo: string
  membros: { value: string, label: string }[]
  error?: string
  tarefas_na_fila: number,
  tarefas_abertas: number,
  tarefas_acompanhadas: number,
  tarefas_finalizadas: number,
}


export type Team = {
  id: string;
  name: string;
  active: boolean;
  creationDate: string;
  leaders: { userId: string; user: { id: string; name: string; avatarId: string; avatarUrl: string } }[];
  members: number;
  users?: { userId: string; user: { id: string; name: string; shortName: string; } }[]
  taskQueue: number;
  taskOpen: number;
  taskFollowed: number;
  taskFinished: number;
  error?: string;
  costCenter?: string;
};

export type TeamList = {
  teams: Team[];
  count: number;
  hasMore: boolean;
}


export type LeaderType = {
  userId: string;
  user: {
    id: string;
    name: string;
  };
};


export type UserList = {
  users: UserType[];
  count: number;
  hasMore: boolean;
};

export type UserType = {
  id: string;
  name: string;
  shortName: string;
  email: string;
  phone: string;
  avatarId: string;
  firstAccess: boolean;
  birthday: string;
  theme: string;
  active: boolean;
  creationDate: string;
};

export type Project = {
  id: string
  name: string
  nome: string
  atividade: string
  aberto: any
  cliente: any
  grupo: any
  data_criacao: string
  data_entrega_desejada: string
  etapa: any
  horas_investidas: string
  atribuidas_fila: string
  atribuidas_desenvolvimento: string
  entregues: string
  total: string
};

export type ProjectList = {
  projects: Project[];
  count: number;
  hasMore: boolean;
}

export type Client = {
  id: string;
  name: string;
  codeName: string;
  categoryId: string;
  customCategory?: string;
  avatarId?: string;
  active: boolean;
  creationDate: string;
};

export type ClientList = {
  clients: Client[];
  count: number;
  hasMore: boolean;
}

export type Group = {
  id: string;
  name: string;
};

export type GroupList = {
  groups: Group[];
  count: number;
  hasMore: boolean;
}

export type Step = {
  id: string;
  name: string;
};

export type HolidayList = {
  holidays: Holiday[];
  count: number;
  hasMore: boolean;
}

export type Holiday = {
  id: string;
  description: string;
  dayMonth: string;
  year: string;
  active: boolean;
  creationDate: string;
  diaCompleto: string;
  situacao?: string;

};

export type Profile = {
  id: string;
  name: string;
  shortName: string;
  email: string;
  birthday: string;
  theme: string;
  phone: string;
  avatarId: string;
  firstAccess: boolean;
  creationDate: string;
  avatar: {
    id: string;
    url: string;
    name: string;
    creationDate: string;
  };
  roleInTheCompany: string;
  atTheCompanySince: string;
};



type List<K extends string, T> = {
  count: number;
  pageNumber: number;
  hasMore: boolean;
  total: number;
} & Record<K, T[]>;


export type Task = {
  id: string;
  boardId: string;
  board: {
    id: string;
    name: string;
  };
  boardStageId: string;
  boardStage: {
    id: string;
    name: string;
  };
  clientId: string;
  client: {
    id: string;
    name: string;
  };
  ownerId: string;
  owner: {
    id: string;
    name: string;
  };
  title: string;
  onGoing: string;
  taskTypeId: string;
  taskType: {
    id: string;
    title: string;
  };
  projectId: string;
  project: {
    id: string;
    name: string;
  };
  desiredStartDate: string;
  desiredDate: string;
  prerequisites: Object;
  closed: string;
  asUrgent: string;
  creationDate: string;
};


export type TaskList = {
  tasks: Task[];
  count: number;
  hasMore: boolean;
}

export type TaskUpdateParams = {
	title?: string;
	onGoing?: boolean;
	clientId?: string;
	projectId?: string;
	boardId?: string;
	boardStageId?: string;
	taskTypeId?: string;
	desiredStartDate?: string;
	desiredDate?: string;
}


export type Board = {
  id: string;
  name: string;
  description: string;
  active: string;
  creationDate: string;
};


export type BoardList = {
  boards: Board[];
  count: number;
  hasMore: boolean;
  total: number;
}


export type BoardStages = {

  id: string;
  name: string;
  type: string;
  boardId: string;
  active: string;
  creationDate: string

};


export type BoardStagesList = {
  boardStages: BoardStages[];
  count: number;
  hasMore: boolean;
}


export type ProjectGroup = {

  id: string;
  name: string;
  clientId: string;
  active: boolean;
  creationDate: string;
  client: {
    id: string;
    name: string;
  }

};


export type ProjectGroupList = {
  projectGroups: ProjectGroup[];
  count: number;
  hasMore: boolean;
  pageNumber: number;
  total: number;
}



export type ProjectAPI = {

  id: string;
  name: string;
  clientId: string;
  projectGroupId: string;
  active: boolean;
  creationDate: string;
  // creationDate: string;
  client: {
    id: string;
    name: string;
  }
  projectGroup: {
    id: string;
    name: string;
  }
  activity: any[];
  desiredDate: string;
  taskInProgress: number;
  taskClosed: number;
  taskInDevelopment: number;
  tasks: number;
  timeWorked: number;
};

export type ProjectAPIList = List<"projects", ProjectAPI>;

export type ClientAPI = {
  id: string;
  name: string;
  codeName: string;
  avatarId: any;
  active: boolean;
  creationDate: string;
  avatar: any;
}

export type ClientsAPIList = List<"clients", ClientsAPIList>;

export type TaskType = {
  id: string;
  title: string;
  color: string;
  creationDate?: string;
  standardEffortTime?: number;
  standardEffort?: string;  
}

export type TaskTypeList = List<"taskType", TaskType>;




export type Tag = {
  id: string;
  title: string;
  color: string;
  creationDate: string;
};


export type TagList = {
  tags: Tag[];
  count: number;
  hasMore: boolean;
  total: number;
  pageNumber: number;
}