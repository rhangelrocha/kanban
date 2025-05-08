"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect, useState, use } from "react";
import KanbanSidebar from "./components/KanbanSidebar/KanbanSidebar";
import KanbanHeader from "./components/KanbanHeader/KanbanHeader";
import KanbanBoard from "./components/NewKanbanBoard/NewKanbanBoard";
import KanbanBoard2 from "./components/KanbanBoard/KanbanBoard2";
import styles from "./styles.module.css"
import { TasksProvider } from "@/contexts/TasksContext";

export default function KanbanPage(props: { params: Promise<[string]> }) {
    const params = use(props.params);
    const router = useRouter();
    const [routeParams, setRouteParams] = useState(params)
    useEffect(() => {
        setRouteParams(params)
        // console.log(params);
    }, [params])

    return (
        <TasksProvider>
            <main className={[styles.main, 'flex overflow-x-auto overflow-y-hidden'].join(' ')} style={{ height: 'calc(100dvh - 53px)' }}>
                <KanbanHeader className={'flex-none'} />
                <div className={'flex w-full h-full grow'}>
                    <KanbanSidebar className={'flex-none z-20'} />
                    <KanbanBoard2 className={'pl-4 grow'} />
                </div>
            </main>
        </TasksProvider>
    )
}