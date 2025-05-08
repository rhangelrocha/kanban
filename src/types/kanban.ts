
export interface Task {
    id?: string | number;
    title?: string;
    column?: string | number;
    [key: string]: any;
    // Outras propriedades da tarefa, se houver
}

export interface Column {
    id: string;
    items: Task[];
    title: string;
    // Outras propriedades da coluna, se houver
}

export type Columns = {
    [key: string]: Column;
}