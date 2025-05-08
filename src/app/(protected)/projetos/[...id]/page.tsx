import { cn } from "@/lib/utils"
import { notFound } from "next/navigation"
import { ProjetoEditTitle } from "../../_components/projetos/ProjetoEditTitle";
import { projetoGet }from '@/actions/projeto-get'; 
import { Project } from "@/models"
import { ProjetoContent } from "../../_components/projetos/ProjetoContent";
import { Skeleton } from "@/components/ui/skeleton";

type PageParams = {
    params: Promise<{ id: string }>
}

export default async function projetoPage(props: PageParams) {
    const params = await props.params;
    const projeto = await projetoGet(params.id) as Project;
    return (
        <div className="pt-5 px-2 lg:px-8">
            <div className={cn('mb-4 flex items-center justify-between')}>
                <div className="container_title">
                    <ProjetoEditTitle idProjeto={projeto.id} nameProjeto={projeto.name} />
                </div>
                <div className="action">
                </div>
            </div>
            <div className="mx-auto">
                <ProjetoContent id={projeto.id} descriptionProjeto={projeto.id} />
            </div>
        </div>
    );
}