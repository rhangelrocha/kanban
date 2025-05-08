import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { HoverCardSimple, } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input";
import { Task } from "@/types/kanban";
import TextEditor from '../Task/TextEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { BoardSelector, ColumnSelector, ProjectSelector, TagSelector, TimeCounter, DateSelector, TypeSelector, DragDropUpload, ClientSelector, UserSelector, TodoRepeater } from "@/components/CustomImput";
import TaskSubtasks from '../Task/TaskSubtasks';
import { HiMiniUser, HiUserGroup } from "react-icons/hi2"
import { TASK_CREATE } from '@/functions/api/api';
import { createTask } from '@/actions/tasks/createTask';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export type NewTaskModalOnFinishType = (task: Task | null) => void;

export interface NewTaskModalType {
    initialData: Task | null | undefined;
    open: boolean;
    onClose: () => void;
    onFinish: NewTaskModalOnFinishType | null | undefined;
}
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const NewTaskModal: React.FC<NewTaskModalType> = ({ open = false, initialData = {}, onClose = () => { }, onFinish = () => { }, ...props }) => {

    const zSelectOption = (extraFields: Record<string, z.ZodTypeAny> = {}) =>
        z.object({
            value: z.string(),
            label: z.string(),
            ...extraFields,
        }, {
            required_error: "Selecione uma opção",
            invalid_type_error: "Seleção inválida",
        });

    const FormSchema = z.object({
        title: z.string({
            required_error: "Digite um título",
        }).min(1, "Digite um título"),
        client: zSelectOption(),
        project: zSelectOption(),
        user: z.array(zSelectOption({ group: z.string().optional() })).min(1, "Selecione pelo uma opção"),
        board: zSelectOption(),
        type: zSelectOption(),
        desiredStartDate: z.date().optional(),
        desiredDate: z.date().optional(),
        checklist: z.array(z.any()).optional(),
        tags: z.array(z.any()).optional(),
        description: z.string().optional(),
    })
    type FormValues = z.infer<typeof FormSchema>;

    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
    })

    const formValues = useWatch({ control: form.control });
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     const subscription = form.watch((values) => {
    //         setFormValues(values);
    //         console.log(values);
    //     });

    //     return () => subscription.unsubscribe(); // limpa o observer
    // }, [form]);
    const router = useRouter();
    const handleSubmit = form.handleSubmit(async (data) => {
        setIsLoading(true);
        const { url, method } = TASK_CREATE();
        let serverData: {
            boardId: string;
            boardStageId?: string;
            clientId: string;
            title: string;
            onGoing: boolean;
            taskTypeId: string;
            projectId: string;
            desiredStartDate?: Date;
            desiredDate?: Date;
            prerequisites?: any[];
            tagIds?: any[];
            followerIds?: any[];
            description?: string;
            userAssignmentIds?: string[];
            teamAssignmentIds?: string;
        } = {
            boardId: data.board.value,
            // "boardStageId": "f3e7137e-5316-4f63-8619-5c91e1ef2c37",
            clientId: data.client.value,
            title: data.title,
            onGoing: true,
            taskTypeId: data.type.value,
            projectId: data.project.value,
            desiredStartDate: data.desiredStartDate ? data.desiredStartDate : undefined,
            desiredDate: data.desiredDate ? data.desiredDate : undefined,
            // prerequisites: [],
            tagIds: data.tags && data.tags.length > 0 ? data.tags.map((tag) => tag.value) : undefined,
            // followerIds: [],
            description: data.description ? data.description : undefined,
            // "checklist": data.checklist && data.checklist.length > 0 ? data.checklist : undefined,
        }
        if (userType === 'user') {
            serverData.userAssignmentIds = data.user.map((user) => user.value)
        } else if (userType === 'team') {
            serverData.teamAssignmentIds = data.user[0].value
        }
        console.log({ serverData });
        createTask(serverData).then((res) => {
            console.log(res);
            if(res.error){
                toast({
                    title: 'Não foi possível criar a tarefa',
                    description: res.error,
                    variant: 'destructive',
                });
            } else {
                toast({
                    title: 'Tarefa criada com sucesso!',
                    description: 'A tarefa foi criada com sucesso.',
                    variant: 'success',
                    action: <Button variant={'default'} className="font-bold" onClick={(e) => router.push(`/task/${res?.id}`)}>Ver tarefa</Button>,
                })
            }
        }).catch((err) => {
            console.error(err);
            toast({
                title: 'Não foi possível criar a tarefa',
                description: err.message,
                variant: 'destructive',
                // action: <Button variant="link" className="font-bold" onClick={() => {
                    
                // }}>Ver tarefa</Button>,
            })
        }).finally(() => {
            setIsLoading(false);
        });

    }, (errors) => {
        console.log(formValues)
        console.log('❌ Erros no formulário:', errors);
    })

    const handleChange = (value: any, name: string) => {
        // console.log(value, name)
        setTimeout(() => {
            form.setValue(name as keyof FormValues, value);
            form.trigger(name as keyof FormValues);
        }, 500);
    };
    const configInputs = [
        {
            name: 'title',
            label: 'Título da tarefa',
            type: 'text',
            placeholder: 'Digite o título da tarefa...',
        },
        {
            name: 'user',
            label: 'Alocados',
            type: 'user',
            placeholder: 'Quem trabalhará na tarefa?',
        },
        {
            name: 'board',
            label: 'Quadro',
            type: 'board',
            placeholder: 'Selecione o quadro',
        },
        {
            name: 'type',
            label: 'Tipo',
            type: 'type',
            placeholder: 'O que essa pessoa vai fazer?',
        },
        {
            name: 'client',
            label: 'Cliente',
            type: 'client',
            placeholder: 'Qual o cliente?',
        },
        {
            name: 'project',
            label: 'Projeto',
            type: 'project',
            placeholder: 'Em qual projeto?',
        },
    ]

    useEffect(() => {
        if (!open) {
            setTimeout(form.reset, 500);
        }
    }, [open])


    const [userType, setUserType] = useState<'user' | 'team'>('user')

    return (<>
        <Dialog open={open} onOpenChange={() => { onClose(); onFinish && onFinish(initialData) }} >
            <DialogContent className={'w-[90%] max-h-full'} style={{ maxWidth: 800 }}>
                <DialogHeader className="border-b pb-4 sticky top-0 left-0 flex-none flex items-center gap-1">
                    <DialogTitle>Criar nova tarefa</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={handleSubmit} className="w-full space-y-3">
                        {configInputs.map(({ name, label, type, placeholder }, key) =>
                            <FormField
                                key={key}
                                control={form.control}
                                name={name as keyof FormValues}
                                render={({ field }) => (
                                    <FormItem className='relative'>
                                        <div className="flex flex-row items-center space-x-3 space-y-0">
                                            <FormLabel className='w-28'>{label}</FormLabel>
                                            <FormControl>
                                                {(() => {
                                                    switch (type) {
                                                        case 'client':
                                                            return <ClientSelector name={name} value={formValues?.client} handleChange={handleChange} />
                                                        case 'project': 1
                                                            return <ProjectSelector clientId={formValues?.client?.value} name={name} value={formValues?.project} handleChange={handleChange} />
                                                        case 'type':
                                                            return <TypeSelector name={name} value={formValues?.type} handleChange={handleChange} />
                                                        case 'board':
                                                            return <BoardSelector name={name} value={formValues?.board} handleChange={handleChange} />
                                                        case 'user':
                                                            return (
                                                                <div className="w-full flex gap-4">
                                                                    <div className="flex gap-2">
                                                                        <Button size={'icon'} variant={userType !== 'user' ? 'outline' : 'default'} onClick={(e) => { e.preventDefault(); setUserType('user'); }}><HiMiniUser /></Button>
                                                                        <Button size={'icon'} variant={userType !== 'team' ? 'outline' : 'default'} onClick={(e) => { e.preventDefault(); setUserType('team'); }}><HiUserGroup /></Button>
                                                                    </div>
                                                                    <div className="w-full">
                                                                        <UserSelector name={name} value={formValues?.user} handleChange={handleChange} userType={userType} multiple={userType === 'user'} />
                                                                    </div>
                                                                </div>
                                                            )
                                                        case 'text':
                                                        default:
                                                            return <Input placeholder={placeholder} {...field} value={typeof field.value === 'string' ? field.value : ''} />
                                                    }
                                                })()}
                                            </FormControl>
                                        </div>
                                        {form.formState.errors[field.name]?.message && <div className={'text-[0.8rem] -mb-1 font-medium bg-destructive text-destructive-foreground absolute px-2 rounded-sm right-0 z-10'}>
                                            <span className="absolute -top-1 right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-destructive" />
                                            <FormMessage className='text-destructive-foreground' />
                                        </div>}
                                    </FormItem>
                                )}
                            />
                        )}
                        <Tabs defaultValue="description" >
                            <TabsList className="inline-flex w-auto ">
                                <TabsTrigger value="description">Descrição</TabsTrigger>
                                <TabsTrigger value="attachments">Anexos</TabsTrigger>
                                <TabsTrigger value="date">Data</TabsTrigger>
                                <TabsTrigger value="checklist">Checklist</TabsTrigger>
                                <TabsTrigger value="tags">Tags</TabsTrigger>
                                <TabsTrigger value="subtasks">Subtarefas</TabsTrigger>
                            </TabsList>
                            <div className='border rounded-md overflow-auto min-h-[200px] max-h-[400px] mt-3 relative z-2'>
                                <TabsContent value="description" className='mt-0'>
                                    <TextEditor showUpdated={false} onChange={(value: any) => handleChange(value, 'description')} />
                                </TabsContent>
                                <TabsContent value="attachments" className='mt-0'>
                                    <div className='p-4 space-y-4'>
                                        <DragDropUpload />
                                    </div>
                                </TabsContent>
                                <TabsContent value="date" className='mt-0'>
                                    <div className='p-4 space-y-2'>
                                        <div className="flex text-sm items-center justify-between gap-2">
                                            <HoverCardSimple text={'Informa ao responsável se a tarefa tem uma data para ser iniciada'}>
                                                <div className="w-40 flex gap-3 items-center justify-start flex-none"><CalendarIcon />Início desejado</div>
                                            </HoverCardSimple>
                                            <div className="w-full"><DateSelector value={formValues?.desiredStartDate} name='desiredStartDate' handleChange={handleChange} /></div>
                                        </div>
                                        <div className="flex text-sm items-center justify-between gap-2">
                                            <HoverCardSimple text={'Informa ao responsável se a tarefa tem uma data final de entrega desejada. Influencia no atraso da tarefa.'}>
                                                <div className="w-40 flex gap-3 items-center justify-start flex-none"><CalendarIcon />Entrega desejada</div>
                                            </HoverCardSimple>
                                            <div className="w-full"><DateSelector value={formValues?.desiredDate} name='desiredDate' handleChange={handleChange} /></div>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="checklist" className='mt-0'>
                                    <div className='p-4'>
                                        <TodoRepeater value={formValues?.checklist} name={'checklist'} handleChange={handleChange} />
                                    </div>
                                </TabsContent>
                                <TabsContent value="tags" className='mt-0'>
                                    <TagSelector value={formValues?.tags} name={'tags'} handleChange={handleChange} />
                                </TabsContent>
                                <TabsContent value="subtasks" className='mt-0'>
                                    <TaskSubtasks />
                                </TabsContent>
                            </div>
                        </Tabs>
                        <Button type='submit'>Criar</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >

    </>)
}