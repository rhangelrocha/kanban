"use client"
import React, { useEffect, useState, use } from "react";
// import TaskModal from "../dashboard/components/Task/TaskModal"
import dynamic from 'next/dynamic';
// import TaskModal from "../dashboard/components/Task/TaskModal";
import { useTask } from "@/contexts/TaskContext";

export default function KanbanPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const TaskModal = dynamic(() => import('../dashboard/components/Task/TaskModal'), {
        ssr: false,
    });
    const { setTaskID } = useTask();
    useEffect(() => {
        setTaskID(params.id);
    }, [params.id, setTaskID]);
    return (
        <main className="flex overflow-x-auto overflow-y-hidden">
            <TaskModal />
        </main>
    )
}