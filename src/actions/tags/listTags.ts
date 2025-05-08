"use server";

import { Tag, TagList } from "@/models";
import apiFetch, { TAG_LIST } from "@/functions/api/api";

export const listTags = async (): Promise<Tag[]> => {

    const { url, method } = TAG_LIST();

    try {
        const tagList: TagList = await apiFetch<TagList>(`${url}?pageNumber=${1}&perPage=${99999}`, { method });
        // &searchParam=${searchParam}
        return tagList.tags;
    } catch (error) {
        console.error(error);
        throw new Error("Erro na requisição.");
    }
};


