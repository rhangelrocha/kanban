"use server";

import { ClientsAPIList } from "@/models";
import apiFetch, { CLIENTS_LIST } from "@/functions/api/api";

export const listClients = async ({
    clientId,
    perPage,
    pageNumber,
    searchParam,
  }: {
    clientId?: string,
    perPage?: number,
    pageNumber?: number,
    searchParam?: string
  } = {}): Promise<ClientsAPIList> => {
    const { url, method } = CLIENTS_LIST();
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
        const ClientsAPIList: ClientsAPIList = await apiFetch<ClientsAPIList>(endpointUrl, { method });

        return ClientsAPIList;
    } catch (error) {
        console.error(error);
        throw new Error("Erro na requisição.");
    }
};
