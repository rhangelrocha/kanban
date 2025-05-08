import React, { createContext, SetStateAction, useContext, useEffect, useState } from 'react';
import { listBoards } from '@/actions/board/listBoards';
import { Board, BoardStages, Task } from '@/models';
import { listTasks } from '@/actions/tasks/listTasks';
import { listBoardStages } from '@/actions/board/listBoardStages';

interface TasksContextProps {
    board: Board | undefined;
    boards: Board[] | [] | undefined;
    tasks: Task[] | [] | undefined;
    boardStages: BoardStages[] | [] | undefined;
    setCurrentBoardId: (newBoardID: string | undefined) => void;
}
interface TasksProviderProps {
    initialBoardId?: string;
    children?: React.ReactNode
}

const TasksContext = createContext<TasksContextProps | undefined>(undefined);

export const TasksProvider: React.FC<TasksProviderProps> = ({
    initialBoardId,
    children
}) => {

    /* Boards */
    const [boards, setBoards] = useState<Board[] | []>();
    const [currentBoardId, setCurrentBoardId] = useState<string | undefined>(initialBoardId);
    const board: Board | undefined = boards?.find((board) => board.id === currentBoardId);
    const updateBoardList = async () => {
        const newBoards = await listBoards();
        // console.log({ newBoards });
        setBoards(newBoards);
        updateTasksList(currentBoardId ? currentBoardId : newBoards[0].id);
        updateBoardStage(currentBoardId ? currentBoardId : newBoards[0].id);
    };

    /* Board Stages */
    const [boardStages, setBoardStages] = useState<BoardStages[] | []>();

    const updateBoardStage = async (boardId: string) => {
        const newBoardStages = await listBoardStages(boardId);
        // console.log({ newBoardStages });
        setBoardStages(newBoardStages);
    };

    /* Board Tasks */
    const [tasks, setTasks] = useState<Task[] | []>();

    const updateTasksList = async (boardID: string | undefined) => {
        const newTasks = await listTasks(boardID);
        // console.log({ newTasks });
        setTasks(newTasks);
    };

    useEffect(() => {
        updateBoardList();
    }, []);

    useEffect(() => {
        console.log('tasks updated', tasks)
    }, [tasks]);

    useEffect(() => {
        console.log('boardStages updated', boardStages)
    }, [boardStages]);

    useEffect(() => {
        console.log('boards updated', boards)
    }, [boards]);

    useEffect(() => {
        console.log('currentBoardId updated', currentBoardId)
    }, [currentBoardId]);

    return (
        <TasksContext.Provider value={{
            boards,
            setCurrentBoardId,
            board,
            boardStages,
            tasks
        }}>
            {children}
        </TasksContext.Provider>
    );
};

export const useTasks = (): TasksContextProps => {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error('useTasks must be used within a BoardProvider');
    }
    return context;
};