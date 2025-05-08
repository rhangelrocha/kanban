"use client"

import * as React from "react"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import styles from "./ProjetoContent.module.css"
import ProjetoDescription from "./ProjetoDescription"

export function ProjetoContent( { id, descriptionProjeto } : { id: string, descriptionProjeto: string  } ) {
    const [activeTab, setActiveTab] = React.useState<string | null>('descricao');

    return (
        <div>
            <Tabs defaultValue="descricao" className="w-[100%] h-full" onValueChange={(value) => setActiveTab(value)}>
                <TabsList className="mb-0 rounded-none p-0 h-auto bg-transparent gap-7">
                    <TabsTrigger value="descricao" className="relative p-0 pb-2 data-[state=active]:shadow-none">
                        Descrição
                        {activeTab == 'descricao' && (
                            <motion.div layoutId="indicator" className={styles.tab_indicador} />
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="tasks" className="relative p-0 pb-2 data-[state=active]:shadow-none">
                        Tarefas
                        {activeTab == 'tasks' && (
                            <motion.div layoutId="indicator" className={styles.tab_indicador} />
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="anexos" className="relative p-0 pb-2 data-[state=active]:shadow-none">
                        Anexos
                        {activeTab == 'anexos' && (
                            <motion.div layoutId="indicator" className={styles.tab_indicador} />
                        )}
                    </TabsTrigger>
                </TabsList>
                <Separator className="mb-2" />
                <TabsContent value="descricao">
                    {/* <ProjetoDescription idProjeto={id} descriptionProjeto={descriptionProjeto} /> */}
                </TabsContent>
                <TabsContent value="tasks">Tarefas</TabsContent>
                <TabsContent value="anexos">Anexos</TabsContent>
            </Tabs>
        </div>
    )
}