"use server";

import { Board, BoardList } from "@/models";
import apiFetch, { BOARD_LIST } from "@/functions/api/api";

export const listBoards = async (): Promise<Board[]> => {

    const { url, method } = BOARD_LIST();

    try {
        const boardList: BoardList = await apiFetch<BoardList>(url, { method });

        return boardList.boards;
    } catch (error) {
        console.error(error);
        throw new Error("Erro na requisição.");
    }
};


