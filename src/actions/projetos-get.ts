import { auth, signOut } from '../../auth';
import { Project, ProjectList } from "@/models"
import { PROJETOS_GET } from "@/functions/api/api"

export const projetosGet = async () => {
    const session = await auth();
    // console.log(session?.user);
    const { url } = PROJETOS_GET()
    let error = false

    // console.log(url)
    let projectList: ProjectList
    let arrayProjectList: Project[] = []

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
            // console.log('Callback getProjects: ', {url, session, response});
            return [];
        } else if (!response.ok || response.status == 401) {
            await signOut();
        }
        projectList = await response.json()
        // console.log(projectList)

        projectList.projects.map((project : any) => {
            // Atividade
            let totalHours = 0;
            let totalMinutes = 0;
            let totalSeconds = 0;
            project.activity.forEach((item : any) => {
                totalHours += item.hours;
                totalMinutes += item.minutes;
                totalSeconds += item.seconds;
            });
            totalMinutes += Math.floor(totalSeconds / 60);
            totalSeconds %= 60;
            totalHours += Math.floor(totalMinutes / 60);
            totalMinutes %= 60;
            // FIM - Atividade

            arrayProjectList.push({
                id: project.id,
                name: project.name,
                nome: project.name,
                atividade: totalHours ? `${totalHours}h${totalMinutes}` : '00h00',
                aberto: { id: project.id, value: project.active },
                cliente: project.client,
                grupo: project.projectGroup,
                data_criacao: project.creationDate,
                data_entrega_desejada: project.desiredDate,
                etapa: project.projectStep,
                horas_investidas: project.timeWorked,
                atribuidas_fila: project.taskInProgress,
                atribuidas_desenvolvimento: project.taskInDevelopment,
                entregues: project.taskDelivered,
                total: project.tasks,
            });
        });

        return arrayProjectList;
        // console.log(arrayProjectList)
    } catch (error: unknown) {
        // throw new Error("Erro na requisição.")
        return arrayProjectList;
    }
};