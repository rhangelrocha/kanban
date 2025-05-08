import { auth, signOut } from '../../auth';
import { Client, ClientList } from "@/models"
import { CLIENTES_GET } from "@/functions/api/api"

export const clientesGet = async () => {
    const session = await auth();
    // console.log(session?.user);
    const { url } = CLIENTES_GET();
    let error = false;

    // console.log(url)
    let clientList: ClientList
    let arrayClientList: Client[] = []

    try {
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
        clientList = await response.json()
        // console.log(clientList)

        clientList.clients.map((client : any) => {
            arrayClientList.push({
                id: client.id,
                name: client.name,
                codeName: client.codeName,
                categoryId: client.categoryId,
                customCategory: client.customCategory,
                avatarId: client.avatarId,
                active: client.active,
                creationDate: client.creationDate
            });
        });

        // console.log(arrayClientList);
        return arrayClientList;
    } catch (error: unknown) {
        // throw new Error("Erro na requisição.")
        return arrayClientList;
    }
};