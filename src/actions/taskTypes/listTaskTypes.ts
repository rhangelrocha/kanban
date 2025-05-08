"use server";

import { TaskTypeList } from "@/models";
import apiFetch, { TASK_TYPE_LIST } from "@/functions/api/api";

export const listTaskTypes = async ({
    perPage,
    pageNumber,
    searchParam,
}: {
    perPage?: number,
    pageNumber?: number,
    searchParam?: string
}): Promise<TaskTypeList> => {
    const { url, method } = TASK_TYPE_LIST();
    let endpointUrl = url;
    if (perPage || pageNumber || searchParam) {
        let params: { [key: string]: any } = {};
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
        const TaskTypeList: TaskTypeList = await apiFetch<TaskTypeList>(endpointUrl, { method });

        return TaskTypeList;
    } catch (error) {
        console.error(error);
        throw new Error("Erro na requisição.");
    }
};
