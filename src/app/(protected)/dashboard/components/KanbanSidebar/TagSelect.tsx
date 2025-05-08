// "use client"
import { Button } from "@/components/ui/button"
import React from "react"
import styles from "./styles.module.css"

import { Cross2Icon } from "@radix-ui/react-icons"
import { HoverCardSimple, } from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Badge } from "@/components/ui/badge";
import { FieldValues } from 'react-hook-form'

interface TagSelectType {
    field: FieldValues | { value: any[] | null };
    options: TagSelectOptions[];
    onSearch?: (value: string | number | null) => any;
    onChange: (value: TagSelectOptions[]) => any;
    display?: 'label' | 'value' | 'avatar';
}

export type TagSelectOptions = {
    value?: string
    label?: string | React.ReactNode
}

export default function TagSelect(props: TagSelectType) {
    const {
        field,
        onChange,
        options,
        display,
        onSearch = (v: string) => { }
    } = props;
    const resultKey = display && display !== 'avatar' ? display : 'label';
    return (

        <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
                {(field.value || []).map((result: TagSelectOptions) => (
                    <Badge className={cn("flex gap-1 pl-1 pr-0.5 ", styles.activeFiltersBadge)} key={result.value}>
                        <span className={''}>
                            {result[resultKey]}
                        </span>
                        <Button
                            size={'icon'}
                            variant={'ghost'}
                            className="cursor-pointer w-5 h-5 rounded-full hover:bg-red-500 hover:text-white"
                            onClick={(e) => {
                                e.preventDefault()
                                let newValue = field.value;
                                newValue = newValue ? newValue : [];
                                var index = newValue.indexOf(result);
                                if (index !== -1) {
                                    newValue.splice(index, 1);
                                }
                                onChange(newValue);
                            }}
                        >
                            <Cross2Icon />
                        </Button>
                    </Badge>
                ))}
            </div>
            <Command className="rounded-md border">
                <CommandInput placeholder="Pesquise aqui" onChangeCapture={(e) => onSearch(e.currentTarget.value)} />
                <CommandList>
                    <CommandEmpty>Nenhum cliente encontrada</CommandEmpty>
                    <CommandGroup>
                        {options.map((result) => {
                            const founded = field.value?.some(({ value }: TagSelectOptions) => result.value === value)
                            return (
                                <CommandItem
                                    key={result.value}
                                    value={result.value}
                                    // className="block"
                                    disabled={founded}
                                    onSelect={(value) => {
                                        let newValue = field.value;
                                        newValue = newValue ? newValue : [];

                                        newValue.push(result);
                                        onChange(newValue);
                                    }}
                                    className={cn(
                                        founded ? 'text-gray-500 pointer-events-none' : '',
                                        'block',
                                        'bg-secundary'
                                    )}
                                >
                                    <HoverCardSimple text={result.label} contentProps={{ side: 'right' }}>
                                        <p className="text-ellipsis whitespace-nowrap overflow-hidden w-full">{result.label}</p>
                                    </HoverCardSimple>
                                </CommandItem>
                            )
                        }
                        )}
                    </CommandGroup>
                </CommandList>
            </Command>
        </div>
    )
}