"use client"
import React, { useState, useEffect, useRef, useContext, createContext, ReactComponentElement } from "react";

import { cn } from "@/lib/utils";
import { type Task } from "@/types/kanban";
import { useTheme } from "next-themes";
import { BackpackIcon, BoxIcon, CalendarIcon, CheckIcon, ClockIcon, Cross2Icon, DotsHorizontalIcon, DoubleArrowRightIcon, LayoutIcon, Share2Icon, SymbolIcon, WidthIcon, FaceIcon } from "@radix-ui/react-icons";
import { ImperativePanelHandle } from "react-resizable-panels";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { HoverCardSimple } from "@/components/ui/hover-card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import 'react-quill-new/dist/quill.snow.css';
import '@/assets/css/text-editor.css';
import TextEditor from "./TextEditor.jsx";
import ChatBox from "./ChatBox";
import TaskAttachments from "./TaskAttachments";
import TaskSubtasks from "./TaskSubtasks";
import { BoardSelector, ColumnSelector, ProjectSelector, TagSelector, TimeCounter, DateSelector, TypeSelector, ClientSelector } from "@/components/CustomImput";
import { useTask } from "@/contexts/TaskContext";
import Loader from "@/components/ui/loader"
import { debounce } from "lodash";

interface TaskModalProps extends React.HTMLAttributes<HTMLElement> {
	onClose?: boolean | (() => void);
	item?: Task
}

const tabs = [
	{
		title: 'Descrição',
		slug: 'descricao',
		content: <TextEditor />

	},
	{
		title: 'Comentários',
		slug: 'comentarios',
		content: <ChatBox />
	},
	{
		title: 'Anexos',
		slug: 'anexos',
		content: <>
			<TaskAttachments />
		</>
	},
	{
		title: 'Subtarefas',
		slug: 'subtarefas',
		content: <>
			<TaskSubtasks />
		</>
	}
]


const share = async () => {
	const shareData = {
		title: document.title,
		text: "AE DIGITAL | Backend Kanban",
		url: window.location.href,
	};
	try {
		await navigator.share(shareData);
		console.log('Compartilhado');
	} catch (err) {
		console.log(`Error: ${err}`);
	}
}

export default function TaskContent({ item, onClose, ...props }: TaskModalProps) {
	const { className } = props;
	const { resolvedTheme } = useTheme()
	const { task, isLoadingTask, setTaskID, handleInput } = useTask();

	const getInitialTab = () => ((typeof window !== 'undefined' && decodeURIComponent(window.location.hash.replace('#', ''))) || tabs[0].slug);
	const [activeTab, setActiveTab] = useState<string | null>(getInitialTab());
	useEffect(() => {
		setActiveTab(getInitialTab());
	}, []);

	const sidebarInputs = [
		{
			icon: <LayoutIcon />,
			label: 'Quadro',
			description: 'Descrição do campo',
			component: <BoardSelector handleChange={handleInput} name={'board'} value={task?.board} isLoadingTask={isLoadingTask} />
		},
		{
			icon: <WidthIcon />,
			label: 'Etapa',
			component: <>
				<ColumnSelector showNextStepButton boardId={task?.boardId} handleChange={handleInput} name={'boardStage'} value={task?.boardStage} isLoadingTask={isLoadingTask} />
			</>
		},
		{
			icon: <Icons.tags />,
			label: 'Tag',
			description: 'Você pode criar novas tags para ajudar a categorizar suas tarefas.',
			component: <>
				<TagSelector handleChange={handleInput} task={task} isLoadingTask={isLoadingTask} />
			</>
		},
		{
			icon: <FaceIcon />,
			label: 'Cliente',
			description: 'A tarefa precisa de um cliente.',
			component: <>
				<ClientSelector handleChange={handleInput} task={task} isLoadingTask={isLoadingTask} />
			</>
		},
		{
			icon: <BackpackIcon />,
			label: 'Projeto',
			description: 'Você pode escolher um projeto dentro de um cliente.',
			component: <>
				<ProjectSelector handleChange={handleInput} task={task} isLoadingTask={isLoadingTask} />
			</>
		},
		{
			icon: <BoxIcon />,
			label: 'Tipo',
			description: 'É uma forma de categorizar as tarefas da sua empresa. Auxilia nos relatórios. Cada tipo, possui um esforço inicial estimado em horas úteis, que pode ser editado depois.',
			component: <>
				<TypeSelector handleChange={handleInput} task={task} isLoadingTask={isLoadingTask} />
			</>
		},
		{
			divider: true,
		},
		{
			icon: <CalendarIcon />,
			label: 'Início desejado',
			description: 'Informa ao responsável se a tarefa tem uma data para ser iniciada.',
			component: <>
				<DateSelector input={'desiredStartDate'} handleChange={handleInput} task={task} isLoadingTask={isLoadingTask} />
			</>
		},
		{
			icon: <CalendarIcon />,
			label: 'Entrega desejada',
			description: 'Informa ao responsável se a tarefa tem uma data final de entrega desejada. Influencia no atraso da tarefa.',
			component: <>
				<DateSelector input={'desiredDate'} handleChange={handleInput} task={task} isLoadingTask={isLoadingTask} />
			</>
		},
		{
			icon: <SymbolIcon />,
			label: 'Repetição',
			description: 'Adicione as pessoas que precisam acompanhar o andamento desta tarefa',
			component: <>
				<Button variant="ghost" className="w-full font-bold flex gap-2 justify-between items-center">Adicionar</Button>
			</>
		},
		{
			icon: <CalendarIcon />,
			label: 'Data de início',
			description: 'Data de início da tarefa.',
			component: <>
				<DateSelector input={'desiredDate'} handleChange={handleInput} task={task} isLoadingTask={isLoadingTask} />
			</>
		},
		{
			divider: true,
		},
		{
			icon: <ClockIcon />,
			label: 'Tempo nesta tarefa',
			description: 'Horas trabalhadas e esforço estimado para esta tarefa',
			component: <>
				<TimeCounter handleChange={handleInput} task={task} isLoadingTask={isLoadingTask} />
			</>
		},
		{
			divider: true,
		},
		{
			icon: <Icons.users />,
			label: 'Seguidores',
			description: 'Adicione as pessoas que precisam acompanhar o andamento desta tarefa',
			component: <>
				<Button size={'icon'} variant="secondary" ><Icons.userPlus /></Button>
			</>
		},
	]


	return (
		<div className="flex flex-col h-full">
			<header className="flex flex-none items-center justify-between py-2 px-8 h-15 border border-t-0 border-l-0 border-r-0 border-b bg-background">

				<div className="flex items-center gap-2">
					<Button size={'icon'} variant={'default'}>
						<Icons.play className="h-4 w-4" />
						<span className="sr-only">Play</span>
					</Button>
					<Button size={'icon'} variant={'secondary'}>
						<CheckIcon className="h-6 w-6" />
						<span className="sr-only">Entregar Tarefa</span>
					</Button>
					<p className="font-bold">
						00:00<span className="text-sm">00</span>
					</p>
					<div className="pl-4 flex flex-none items-center justify-between gap-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<HoverCardSimple text="Rhangel Rocha">
									<Avatar className="h-7 w-7" onClick={console.log}>
										<AvatarImage
											src="https://d22iebrrkdwkpr.cloudfront.net/avatars/aedigital/rhangel-rocha/b6881e140971ff4ad556a4a64c414ae9mini.jpeg"
											alt="rhangel"
										/>
										<AvatarFallback className="text-[10px]">RR</AvatarFallback>
									</Avatar>
								</HoverCardSimple>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56">
								<DropdownMenuItem>Entregar sua parte</DropdownMenuItem>
								<DropdownMenuItem disabled>Transferir para outro usuário</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem>Ajustar horas registradas</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem className="text-red-500">Remover alocação</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<Separator orientation="vertical" className="h-4 mx-2" />
					<div className="flex flex-none items-center justify-between gap-2">
						<HoverCardSimple text="Rhangel Rocha">
							<Avatar className="h-7 w-7">
								<AvatarImage
									src="https://d22iebrrkdwkpr.cloudfront.net/avatars/aedigital/rhangel-rocha/b6881e140971ff4ad556a4a64c414ae9mini.jpeg"
									alt="rhangel"
								/>
								<AvatarFallback className="text-[10px]">RR</AvatarFallback>
							</Avatar>
						</HoverCardSimple>
						<HoverCardSimple text="Rhangel Rocha">
							<Avatar className="h-7 w-7">
								<AvatarImage
									src="https://d22iebrrkdwkpr.cloudfront.net/avatars/aedigital/rhangel-rocha/b6881e140971ff4ad556a4a64c414ae9mini.jpeg"
									alt="rhangel"
								/>
								<AvatarFallback className="text-[10px]">RR</AvatarFallback>
							</Avatar>
						</HoverCardSimple>
						<Button size={'icon'} variant={'ghost'}><Icons.userPlus /></Button>
					</div>
				</div>
				<div className="flex items-center gap-3">

					<Button variant={'secondary'} className="gap-2" onClick={share}>
						<Share2Icon />
						Compartilhar
					</Button>
					<HoverCardSimple text={'Adicionar/remover urgência'}>
						<Button size={'icon'} variant={'ghost'} className={task?.asUrgent && "text-red-500"}>
							<Icons.flagFilled />
						</Button>
					</HoverCardSimple>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div>
								<HoverCardSimple text="Mais ações">
									<Button size={'icon'} variant={'ghost'}>
										<DotsHorizontalIcon />
									</Button>
								</HoverCardSimple>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56">
							<DropdownMenuItem>Entregar sua parte</DropdownMenuItem>
							<DropdownMenuItem disabled>Transferir para outro usuário</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Ajustar horas registradas</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-red-500">Remover alocação</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					{typeof onClose === 'function' &&
						<Button onClick={() => {
							onClose()
							setTimeout(() => setTaskID(undefined), 500)
						}} size={'icon'} variant={'ghost'}>
							<Cross2Icon className="h-4 w-4" />
							<span className="sr-only">Close</span>
						</Button>
					}
				</div>
			</header >
			<div className="h-full flex" style={{ maxHeight: 'calc(100% - 53px)' }}>
				<div className="w-full border border-t-0 border-l-0 border-r border-b-0">
					<div className="flex flex-col h-full">
						<div className="flex flex-col">
							<header className="px-8 pt-4 pb-2">
								<Loader loading={isLoadingTask} inline className="h-[20px] my-[8px] w-[400px]">
									{task?.title && <input defaultValue={task.title} onChange={(v) => handleInput(v.target.value, 'title')} className="border-none outline-none text-lg w-full rounded-md px-2 py-1 font-bold -mx-2 bg-transparent focus:bg-secondary hover:bg-secondary" />}
								</Loader>
								<p className="text-sm text-muted-foreground">
									<Loader loading={isLoadingTask} inline>
										{task?.id}
									</Loader> Criada por: <Loader loading={isLoadingTask} inline>
										{task?.owner?.name}
									</Loader> em <Loader loading={isLoadingTask} inline>
										{task?.creationDate ? new Date(task.creationDate).toLocaleTimeString() : null}
									</Loader>
								</p>
							</header>
							<ul className="flex flex-none items-center justify-start px-5 h-15 border border-t-0 border-l-0 border-r-0 border-b gap-4 font-bold text-sm text-muted-foreground">
								{tabs.map((tab, key) => <li key={key}>
									<a

										href={`#${tab.slug}`}
										onClick={(e) => { e.preventDefault(); setActiveTab(tab.slug) }}
										className={cn(
											' border border-t-0 border-l-0 border-r-0 border-b border-transparent inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8  px-3 text-sm',
											activeTab === tab.slug && 'bg-accent  text-primary border-primary'
											//	 buttonVariants({ size: 'sm', variant: 'ghost' }),


										)}
									>{tab.title}</a>
								</li>)}
							</ul>
						</div>
						<div className="h-full relative overflow-hidden" >
							{tabs.find((tab) => tab.slug === activeTab)?.content}
						</div>
					</div>
				</div>
				<div className="w-[780px]">
					<div className="p-4 space-y-2">
						{sidebarInputs.map((item, key) => <React.Fragment key={key}>
							{item.divider ? <Separator /> : <>
								<div className="flex text-sm items-center justify-between gap-2">
									<HoverCardSimple text={item.description ? item.description : item.label}>
										<div className="w-40 flex gap-3 items-center justify-start flex-none">{item?.icon}{item?.label}</div>
									</HoverCardSimple>
									<div className="w-full">{item?.component}</div>
								</div>
							</>}
						</React.Fragment>)}

					</div>
				</div>
			</div>
		</div>
	)
}
