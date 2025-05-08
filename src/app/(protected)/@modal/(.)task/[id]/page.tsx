"use client";
import React, { use, useEffect } from "react";
import KanbanCard from "@/app/(protected)/dashboard/components/KanbanCard/KanbanCard";
import TaskModal from "@/app/(protected)/dashboard/components/Task/TaskModal";
import { useTask } from "@/contexts/TaskContext";

export default function TaskModalPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);

    const { setTaskID } = useTask();
    useEffect(() => {
        if (params.id) setTaskID(params.id);
    }, [params.id])
    return (
        <TaskModal />
    )
}