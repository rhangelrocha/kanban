import { useEffect, useState } from 'react';
import { DropResult } from "@hello-pangea/dnd";
import { type Task, type Columns } from "@/types/kanban";
import { listBoards } from '@/actions/board/listBoards';
import { Board } from '@/models';
import { useTasks } from '@/contexts/TasksContext';
import { updateTask } from '@/actions/tasks/updateTask';

interface UseKanbanOptions {
    taskStatus: Columns;
    onUpdate?: (columns: Columns) => void;
    onMove?: (data: { changes: Changes; actions: DropResult[] }) => void;
}

interface Changes {
    [key: string]: { id: string | number; pos: number }[];
}

type DragEndCallback = (oldColumns: Columns, newColumns: Columns, result: DropResult) => void;

const onDragEndLegacy = (
    result: DropResult,
    columns: Columns,
    setColumns: React.Dispatch<React.SetStateAction<Columns>>,
    callback: DragEndCallback = () => { }
) => {
    if (!result.destination) return;
    const { source, destination } = result;
    let callback_old: Columns, callback_new: Columns;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns(old => {
            callback_old = old;
            const newCols = {
                ...old,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            };
            callback_new = newCols;
            callback(callback_old, callback_new, result);
            return newCols;
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns(old => {
            callback_old = old;
            const newCols = {
                ...old,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            };
            callback_new = newCols;
            callback(callback_old, callback_new, result);
            return newCols;
        });
    }

};
const useKanban = ({ taskStatus, onUpdate = (columns) => { }, onMove = (data) => { } }: UseKanbanOptions) => {
    const {
        boards,
        setCurrentBoardId,
        board,
        boardStages,
        tasks
    } = useTasks();

    const [columns, setColumns] = useState<Columns>({});
    const updateColumns = () => {
        const columns: Columns = {};
        boardStages?.forEach(stage => {
            columns[stage.id] = {
                id: stage.id,
                title: stage.name,
                items: tasks?.filter(task => task.boardStageId === stage.id) || []
            };
        });
        console.log({ columns })
        setColumns(columns);
    }

    useEffect(updateColumns, [board, boardStages])

    const dragCallback = (old: Columns, updated: Columns, result: DropResult) => {
        const changes: Changes = {};
        Object.keys(updated).forEach(column => {
            const oldColumnItems = old[column].items.map(a => a.id);
            const updatedColumnItems = updated[column].items.map(a => a.id);
            if (old[column] !== updated[column]) {
                let loop = 0;
                let items: { id: string | number, pos: number }[] = [];
                updatedColumnItems.forEach(item => {
                    if (oldColumnItems[loop] !== updatedColumnItems[loop]) {
                        items.push({
                            id: updatedColumnItems[loop] as string,
                            pos: loop
                        });
                    }
                    loop++;
                });
                if (items.length > 0) {
                    changes[column] = items;
                }
            }
        });
        Object.keys(changes).forEach(boardStageId => {
            changes[boardStageId].forEach(item => {
                const taskID = `${item.id}`;
                updateTask(taskID, { boardStageId: boardStageId }).then(r => console.log('r', r))
            });
        });
        console.log({ changes });
        onMove({
            changes: changes,
            actions: [result]
        });
    };

    const onDragEnd = (result: DropResult) => {
        console
        onDragEndLegacy(result, columns, setColumns, dragCallback)
    };

    const addCard = (columnId: string | number | undefined, props: Task, push = false) => {
        if (!columnId) return;
        const newColumn = columns[columnId];
        const newTask = {
            // id: (Math.random() + 1).toString(36).substring(7),
            ...props
        };
        if (push) {
            newColumn.items.push(newTask);
        } else {
            newColumn.items.unshift(newTask);
        }
        setColumns(old => {
            return { ...old, [columnId]: newColumn };
        });
    };

    // useEffect(() => onUpdate(columns), [columns])

    return { addCard, onDragEnd, columns, setColumns };
};

export default useKanban;
