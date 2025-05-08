import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import React, { useEffect, useState, useRef } from "react"
import Moment from 'react-moment';
import 'moment/locale/pt-br';
import { RiEdit2Fill, RiRobot2Fill } from "react-icons/ri";
import { HiMiniTrash } from "react-icons/hi2";
import { SlOptionsVertical } from "react-icons/sl";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { HoverCardSimple } from "@/components/ui/hover-card"
import { IoCheckmarkSharp } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"
import QuillEditor from "./QuillEditor.jsx";
import { Icons } from "@/components/icons";


export default function ChatBox() {

    const adjustHeight = (element: HTMLTextAreaElement) => {
        element.style.height = 'auto'; // Resetar a altura
        let newHeight = element.scrollHeight - 8;
        if (newHeight > 100) newHeight = 100;
        element.style.height = `${newHeight}px`; // Definir nova altura baseada no scrollHeight
    };

    // Manipulador de evento que ajusta a altura e chama o onChange original, se fornecido
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        adjustHeight(event.target);
    };
    const [showSystemMessages, setShowSystemMessages] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);

    const [newMessage, setNewMessage] = useState('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p><p>Nulla eget quam sed sapien placerat venenatis vel non lorem. </p><p>Vivamus nec enim nec neque vestibulum venenatis.</p><p>Etiam porta sem malesuada magna mollis euismod. </p><p>Cras mattis consectetur purus sit amet fermentum. </p><p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p><p>Donec ullamcorper nulla non metus auctor fringilla. </p><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p><p>Nulla eget quam sed sapien placerat venenatis vel non lorem. </p><p>Vivamus nec enim nec neque vestibulum venenatis.</p><p>Etiam porta sem malesuada magna mollis euismod. </p><p>Cras mattis consectetur purus sit amet fermentum. </p><p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p><p>Donec ullamcorper nulla non metus auctor fringilla. </p><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p><p>Nulla eget quam sed sapien placerat venenatis vel non lorem. </p><p>Vivamus nec enim nec neque vestibulum venenatis.</p><p>Etiam porta sem malesuada magna mollis euismod. </p><p>Cras mattis consectetur purus sit amet fermentum. </p><p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p><p>Donec ullamcorper nulla non metus auctor fringilla. </p><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p><p>Nulla eget quam sed sapien placerat venenatis vel non lorem. </p><p>Vivamus nec enim nec neque vestibulum venenatis.</p><p>Etiam porta sem malesuada magna mollis euismod. </p><p>Cras mattis consectetur purus sit amet fermentum. </p><p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p><p>Donec ullamcorper nulla non metus auctor fringilla. </p><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p><p>Nulla eget quam sed sapien placerat venenatis vel non lorem. </p><p>Vivamus nec enim nec neque vestibulum venenatis.</p><p>Etiam porta sem malesuada magna mollis euismod. </p><p>Cras mattis consectetur purus sit amet fermentum. </p><p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.</p><p>Donec ullamcorper nulla non metus auctor fringilla. </p><p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>');
    const [newMessageMax, setNewMessageMax] = useState('');
    useEffect(() => {
        // console.log(fullScreen, newMessage, newMessageMax)
        if (fullScreen) {
            setNewMessage(newMessageMax);
        } else {
            setNewMessageMax(newMessage);
        }
    }, [newMessage, newMessageMax])
    const switchFullScreen = () => {
        setFullScreen(!fullScreen);
    }
    const scrollRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if(scrollRef && scrollRef.current){
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [scrollRef])
    return (
        // flex h-full w-full flex-col
        <div className=" relative h-full flex flex-col">
            <Button
                onClick={() => { setShowSystemMessages(!showSystemMessages) }}
                className="absolute top-2 -right-14 hover:right-2 z-10 transition-all px-0 py-0 ">
                <HoverCardSimple text={<>Exibir ou esconder <br />mensagens do sistema</>}>
                    <div className="inline-flex items-center justify-center whitespace-nowrap px-4 py-2 space-x-5">
                        <RiRobot2Fill style={{ width: '1.2em', height: '1.2em' }} />
                        <Switch checked={showSystemMessages} className="data-[state=checked]:bg-zinc-500 dark:data-[state=checked]:bg-white" />
                    </div>
                </HoverCardSimple>
            </Button>
            <div className="h-full p-4 overflow-auto" ref={scrollRef}>
                <div className="space-y-4">
                    <Message.me />
                    <Message.me />
                    {showSystemMessages && <Message.system />}
                    <Message.other />
                    <Message.me />
                    <Message.other />
                    <Message.me />
                    {showSystemMessages && <Message.system />}
                    <Message.other />
                </div>
            </div>
            <div className=" w-full flex items-center gap-2 border-t bg-gray-100/40 px-4 py-3 dark:bg-gray-800/40 ">
                <div

                    className={"flex w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 relative"}>
                    <Button
                        className="absolute right-[4px] top-[4px] z-10"
                        onClick={switchFullScreen}
                        size={'icon'}
                        variant={'ghost'}>
                        {fullScreen ? <Icons.shrink /> : <Icons.expand />}
                    </Button>

                    <QuillEditor
                        onChange={setNewMessage}
                        value={newMessage}
                        placeholder='digite sua mensagem...'
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        theme={'bubble'}
                    />
                </div>

                <Button>
                    <SendIcon className="h-5 w-5" />
                    <span className="sr-only">Send</span>
                </Button>
            </div>
            {fullScreen &&
                <div
                    className="maximized"
                    style={fullScreen ? {
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        background: 'hsl(var(--background))',
                        zIndex: 10,
                    } : {
                        display: 'none'
                    }}>
                    <Button
                        className="absolute right-[5px] top-[5px] z-10"
                        onClick={switchFullScreen}
                        size={'icon'}
                        variant={'ghost'}>
                        {fullScreen ? <Icons.shrink /> : <Icons.expand />}
                    </Button>
                    <QuillEditor
                        onChange={setNewMessageMax}
                        value={newMessageMax}
                        placeholder='digite sua mensagem...'
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        theme={'snow'}
                    />
                </div>
            }
        </div>
    )
}
const Message = {
    me: () => {
        return (
            <div className="flex justify-end items-start gap-3">
                <div className="max-w-[75%] rounded-lg bg-primary p-4 text-sm text-white space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="uppercase space-x-2  ext-xs flex items-center">
                            <strong>Rhangel Rocha</strong>
                            <Moment
                                className="opacity-90"
                                fromNow
                                locale="pt-br"
                                date={'1976-04-19T12:59-0500'}
                            />
                            {/* <IoCheckmarkSharp /> */}
                            <HoverCardSimple text={<><p className="capitalize">Visualizado por todos</p></>}>
                                <IoCheckmarkDoneSharp />
                            </HoverCardSimple>
                        </p>
                        <div className="space-x-1">

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div>
                                        <HoverCardSimple text="Ações do comentário">
                                            <Button size={'icon'} className="w-6 h-6" variant={'ghost'}><SlOptionsVertical /></Button>
                                        </HoverCardSimple>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuItem>Responder comentário</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Editar Comentário</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-500">Apagar comentário</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla suscipit ultrices. Integer consectetur urna sollicitudin feugiat lobortis. Proin tempus tellus velit, faucibus pellentesque lacus lobortis ac. Proin lorem ante, dapibus at eros at, condimentum laoreet lacus.
                    </p>
                </div>
                <HoverCardSimple text="Rhangel Rocha">

                    <Avatar>
                        <AvatarImage
                            src="https://d22iebrrkdwkpr.cloudfront.net/avatars/aedigital/rhangel-rocha/b6881e140971ff4ad556a4a64c414ae9mini.jpeg"
                            alt="rhangel"
                        />
                        <AvatarFallback className="text-[10px]">RR</AvatarFallback>
                    </Avatar>
                </HoverCardSimple>
            </div>
        )
    },
    other: () => {
        return (
            <div className="flex items-start gap-3">
                <HoverCardSimple text="Danillo Muniz">

                    <Avatar>
                        <AvatarImage
                            src="https://d22iebrrkdwkpr.cloudfront.net/avatars/aedigital/danillo-muniz/c4f1c9b5549ef22a963b0265831d05camini.jpeg"
                            alt="rhangel"
                        />
                        <AvatarFallback className="text-[10px]">DM</AvatarFallback>
                    </Avatar>
                </HoverCardSimple>
                <div className="max-w-[75%] rounded-lg bg-gray-100 p-4 text-sm dark:bg-gray-800 space-y-2">
                    <div className="flex justify-between items-center">
                        <p className="uppercase space-x-2  ext-xs flex items-center">
                            <strong>Danillo Muniz</strong>
                            <Moment
                                className="opacity-90"
                                fromNow
                                locale="pt-br"
                                date={'1976-04-19T12:59-0500'}
                            />
                            {/* <IoCheckmarkSharp className="text-primary"/> */}
                            <IoCheckmarkDoneSharp className="text-primary" />
                        </p>
                        <div className="space-x-1">

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div>
                                        <HoverCardSimple text="Ações do comentário">
                                            <Button size={'icon'} className="w-6 h-6" variant={'ghost'}><SlOptionsVertical /></Button>
                                        </HoverCardSimple>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuItem>Responder comentário</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Editar Comentário</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-500">Apagar comentário</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <p>
                        Sed scelerisque lacus eget felis pulvinar convallis. Praesent in gravida urna. Curabitur congue neque massa, non interdum risus vulputate eget. Cras tortor dolor, dictum non eros eu, consectetur interdum odio. Proin enim dui, maximus nec urna vel, sollicitudin rutrum velit. Ut sit amet fermentum mauris.
                    </p>
                </div>
            </div>
        )

    },
    system: () => {
        return (
            <div className="flex items-start gap-3">
                <Avatar>
                    <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
                    <AvatarFallback className="bg-orange-200 dark:bg-[#4c3005]">
                        <RiRobot2Fill style={{ width: '1.2em', height: '1.2em' }} />
                    </AvatarFallback>
                </Avatar>
                <div className="max-w-[75%] rounded-lg bg-orange-200 p-4 text-sm dark:bg-[#4c3005] space-y-1">
                    <div className="flex justify-between items-center">
                        <p className="space-x-2  ext-xs flex items-center">
                            <Moment
                                className="opacity-90"
                                fromNow
                                locale="pt-br"
                                date={'1976-04-19T12:59-0500'}
                            />
                        </p>
                    </div>
                    <p>Parte pausada pelo sistema. Aneke Allen foi trabalhar na tarefa: Unifisa Consórcio - Unifisa Página Parceiro - #30408 - Unifisa | Opção ocultar WhatsApp da página.</p>
                </div>
            </div>
        )

    }

}

function SendIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </svg>
    )
}