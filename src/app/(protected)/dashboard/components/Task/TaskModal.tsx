"use client"
import React, { useState, useEffect } from "react";

import styles from './styles.module.css'
import { cn } from "@/lib/utils";
import { type Task } from "@/types/kanban";
import { useTheme } from "next-themes";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialogTask"
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import TaskContent from "./TasksContent";
import { DialogOverlay } from "@radix-ui/react-dialog";

interface TaskModalProps extends React.HTMLAttributes<HTMLElement> {
    item?: Task
}

export default function TaskModal({ item, ...props }: TaskModalProps) {
    const { className } = props;
    const { resolvedTheme } = useTheme()
    const [open, setOpen] = useState(true)
    const router = useRouter();
    const onClose = () => {
        setOpen(false);
        router.back();
    }
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogOverlay>
                <DialogContent className={styles.taskModal} showClose={false} id="task-modal">
                    <TaskContent onClose={onClose} />
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}