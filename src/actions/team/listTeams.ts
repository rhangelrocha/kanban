"use server";

import { Team as TeamType, TeamList } from "@/models";
import apiFetch, { TEAM_LIST } from "@/functions/api/api";

export const listTeams = async ({
    pageNumber = 1,
    searchParam,
    perPage = 999
}: {
    pageNumber?: number
    searchParam?: string,
    perPage?: number
} = {}): Promise<TeamType[]> => {

    const { url, method } = TEAM_LIST();

    try {
        const teamList: TeamList = await apiFetch<TeamList>(`${url}`, { method });
        console.log({ teamList })
        return teamList.teams;
    } catch (error) {
        console.error(error);
        throw new Error("Erro na requisição.");
    }
};


