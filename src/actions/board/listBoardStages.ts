"use server";

import { Board, BoardList, BoardStages, BoardStagesList } from "@/models";
import apiFetch, { BOARD_STAGE_LIST, TASK_LIST } from "@/functions/api/api";

export const listBoardStages = async (boardId: string | undefined): Promise<BoardStages[]> => {

    const { url, method } = BOARD_STAGE_LIST();

    try {
        const BoardStagesList: BoardStagesList = await apiFetch<BoardStagesList>(url, { method });

        if(boardId) {
            return BoardStagesList.boardStages.filter((boardStage) => boardStage.boardId === boardId);
        }
        return BoardStagesList.boardStages;
    } catch (error) {
        console.error(error);
        throw new Error("Erro na requisição.");
    }
};
