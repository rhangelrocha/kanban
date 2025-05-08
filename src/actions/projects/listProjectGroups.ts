"use server";

import { ProjectGroup, ProjectGroupList } from "@/models";
import apiFetch, { PROJECT_GROUP_LIST } from "@/functions/api/api";

export const listProjectGroups = async (
    clientId?: string,
    perPage?: number,
    pageNumber?: number,
    searchParam?: string
): Promise<ProjectGroupList> => {

    const { url, method } = PROJECT_GROUP_LIST();
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
    console.log({ url, method, endpointUrl })
    try {
        const projectGroupsList: ProjectGroupList = await apiFetch<ProjectGroupList>(url, { method });

        return projectGroupsList;
    } catch (error) {
        console.error(error);
        throw new Error("Erro na requisição.");
    }
};
