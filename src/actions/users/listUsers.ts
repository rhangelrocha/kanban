"use server";

import { UserType, UserList } from "@/models";
import apiFetch, { USER_LIST } from "@/functions/api/api";

export const listUsers = async ({
    role = 'todos',
    status = 'todos',
    perPage = 999
}: {
    role?: string
    status?: string,
    perPage?: number
} = {}): Promise<UserType[]> => {



    const { url, method } = USER_LIST();

    try {
        const userList: UserList = await apiFetch<UserList>(`${url}?role=${role}&status=${status}&perPage=${perPage}`, { method });
        console.log({ userList })
        return userList.users;
    } catch (error) {
        console.error(error);
        throw new Error("Erro na requisição.");
    }
};


