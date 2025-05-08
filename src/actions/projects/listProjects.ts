"use server";

import { ProjectAPIList } from "@/models";
import apiFetch, { PROJECT_LIST } from "@/functions/api/api";

export const listProjects = async ({
    clientId,
    perPage,
    pageNumber,
    searchParam,
  }: {
    clientId?: string,
    perPage?: number,
    pageNumber?: number,
    searchParam?: string
  } = {}): Promise<ProjectAPIList> => {
    const { url, method } = PROJECT_LIST();
    let endpointUrl = url;
    if (clientId || perPage || pageNumber || searchParam) {
        let params: { [key: string]: any } = {};
        if (clientId) {
            params.clientId = clientId;
        }
        if (perPage) {
            params.perPage = perPage;
        }
        if (pageNumber) {
            params.pageNumber = pageNumber;
        }
        if (searchParam) {
            params.searchParam = searchParam;
        }

        endpointUrl = url + '?' + new URLSearchParams(params).toString()
    }
    try {
        const ProjectAPIList: ProjectAPIList = await apiFetch<ProjectAPIList>(endpointUrl, { method });

        return ProjectAPIList;
    } catch (error) {
        console.error(error);
        throw new Error("Erro na requisição.");
    }
};
