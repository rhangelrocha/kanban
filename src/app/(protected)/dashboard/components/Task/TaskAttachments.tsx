"use client"
import React, { useState, useEffect, useRef } from "react";


interface TaskAttachmentProps extends React.HTMLAttributes<HTMLElement> {
    onClose?: boolean | (() => void);
}
import Link from "next/link";
import { HoverCardSimple } from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Moment from "react-moment";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { CaretDownIcon, DotsHorizontalIcon, DotsVerticalIcon, UploadIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";



const initialFiles = Array(20).fill(
    {
        thumbnail: 'https://fastly.picsum.photos/id/300/80/80.jpg?hmac=psvpmMKEi6UY1TXzqXsMwYT9-IfKuQyKtBxVKodd12c',
        size: '12.3 MB',
        name: 'Document.pdf',
        link: '#',
        date: new Date(),
        author: { id: 1, name: 'Rhangel Rocha', image: 'https://picsum.photos/30' },
        id: 1
    }
);
const useFileFilters = () => {
    const [order, handleOrder] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setSearch(e.target.value);
    }
    const orderValues = [
        {
            label: 'Anexo mais recente',
            value: 'recent'
        },
        {
            label: 'Anexo mais antigo',
            value: 'older'
        },
        {
            label: 'Ordem alfabética (A-Z)',
            value: 'a_z'
        },
        {
            label: 'Ordem alfabética (Z-A)',
            value: 'z_a'
        }
    ]

    return {
        search, order, handleOrder, handleSearch, orderValues,
    }
}
export default function TaskAttachments({ ...props }: TaskAttachmentProps) {
    const [files, setFiles] = useState(initialFiles)
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { search, order, handleOrder, handleSearch, orderValues } = useFileFilters();
    return (

        <div className="overflow-auto flex flex-col h-full">

            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800 flex gap-4 justify-between">
                <div className="flex gap-4">
                    <div className="w-[300px]">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="secondary" className="w-full font-bold flex gap-2 justify-between items-center">
                                    {order ? <span>Ordenar por <span className="lowercase">{orderValues?.find(a => a.value === order)?.label}</span></span> : <>Ordenar por</>}
                                    <CaretDownIcon />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0" side="bottom" align="end">
                                <Command className="w-full">
                                    {/* <CommandInput placeholder="Pesquise" /> */}
                                    <CommandList>
                                        <CommandEmpty>Nenhum quadro encontrado.</CommandEmpty>
                                        <CommandGroup>
                                            {orderValues.map((a) => (
                                                <CommandItem
                                                    key={a.value}
                                                    value={a.value}
                                                    onSelect={(value) => {
                                                        console.log(value);
                                                        handleOrder(value)
                                                    }}
                                                >
                                                    {a.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                        {/* <Separator />
                                <div className="w-full p-2 space-y-2">
                                    <Button className="w-full">Criar novo quadro</Button>
                                    <Button className="w-full" variant={'secondary'} onClick={() => setIsOpen(false)}>Cancelar</Button>
                                </div> */}
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="w-[300px]">
                        <Input value={search} onChange={handleSearch} placeholder="Pesquisar"/>
                    </div>
                </div>
                <div className="flex gap-4">
                    <HoverCardSimple text="Enviar arquivos">
                        <Button variant={'secondary'} size={'icon'}><UploadIcon/></Button>
                    </HoverCardSimple>
                </div>
            </div>
            <div className="space-y-6 p-6 overflow-auto">
                {files.map((file, key) =>
                    <div key={key} className=" 
                        rounded-lg overflow-hidden flex items-center gap-4 pr-4 cursor-pointer
                        bg-gray-100 hover:bg-primary/30 dark:hover:bg-primary/30 dark:bg-gray-800 
                        solid border-2 border-transparent hover:border-solid hover:border-2 hover:border-primary"
                        onClick={() => router.push(file.link)}
                    >
                        <div
                            className="w-20 h-20 bg-center bg-cover"
                            style={{
                                backgroundImage: `url(${file.thumbnail})`
                            }}
                        />
                        <div className="flex-1">
                            <h4 className="text-sm font-medium truncate">{file.name}</h4>
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                <span>{file.size}</span>
                            </div>
                        </div>
                        <div>
                            <Moment
                                className="text-xs text-opacity-90 uppercase"
                                fromNow
                                locale="pt-br"
                                date={file.date}
                            />
                        </div>
                        <div>
                            <HoverCardSimple text={<>Anexo adicionado por {file.author?.name} <br /> <Moment

                                fromNow
                                locale="pt-br"
                                date={file.date}
                            /></>}>
                                <Avatar className="h-7 w-7">
                                    <AvatarImage
                                        src="https://d22iebrrkdwkpr.cloudfront.net/avatars/aedigital/rhangel-rocha/b6881e140971ff4ad556a4a64c414ae9mini.jpeg"
                                        alt="rhangel"
                                    />
                                    <AvatarFallback className="text-[10px]">RR</AvatarFallback>
                                </Avatar>
                            </HoverCardSimple>
                        </div>
                        <div>
                            <div>
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
                                        <DropdownMenuItem>Copiar Link</DropdownMenuItem>
                                        <DropdownMenuItem>Enviar por e-mail</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Baixar</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-500">Apagar</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}