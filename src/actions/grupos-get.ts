"use server";

import { auth, signOut } from '../../auth';
import { Group, GroupList } from "@/models"
import { GRUPOS_GET } from "@/functions/api/api"

export const gruposGet = async (id : string) => {
    const session = await auth();
    // console.log(session?.user);
    const { url } = GRUPOS_GET(id);
    let error = false;

    // console.log(url)
    let groupList: GroupList
    let arrayGroupList: Group[] = []

    try {
        arrayGroupList.push({
            id: '38b88bb4-a034-474f-9255-5f607bedd19e',
            name: 'HEYBOT | DEV',
        });
    
        return arrayGroupList;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            },
            next: {
                revalidate: 0,
            },
        })

        if (!response.ok || response.status == 500) {
            return [];
        } else if (!response.ok || response.status == 401) {
            await signOut();
        }
        groupList = await response.json()
        // console.log(groupList)

        groupList.groups.map((group : any) => {
            arrayGroupList.push({
                id: group.id,
                name: group.name,
            });
        });

        // console.log(arrayGroupList);
        return arrayGroupList;
    } catch (error: unknown) {
        // throw new Error("Erro na requisição.")
        return arrayGroupList;
    }
};