"use client"
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
// import QuillEditor from "./QuillEditor";
import dynamic from 'next/dynamic';

const QuillEditor = dynamic(() => import('./QuillEditor'), {
    ssr: false,
});

const TextEditor = ({ showUpdated = true, onChange = (v) => { } }) => {
    useEffect(() => {
        document.querySelectorAll('.ql-picker-label[data-value]').forEach((el) => {
            // @ts-ignore
            el.style['--value'] = el.getAttribute('data-value') || '';
        });
    }, [])


    const [fullScreen, setFullScreen] = useState(false);
    const [value, setValue] = useState('<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>');
    useEffect(() => {
        onChange(value);
    }, [value]);
    return (
        <div id="textEditor" className={cn("h-full flex flex-col", fullScreen ? 'fullScreen' : '')}>
            <Button
                className="expandButton z-10"
                onClick={() => setFullScreen(!fullScreen)}
                size={'icon'}
                variant={'ghost'}>
                {fullScreen ? <Icons.shrink /> : <Icons.expand />}
            </Button>
            <div className="h-full overflow-auto">
                <QuillEditor
                    className="h-full flex flex-col"
                    value={value}
                    onChange={setValue}
                    theme="snow"
                />
            </div>
            {showUpdated &&
                <div className="editorFooter text-sm">
                    Atualizado agorinha
                </div>
            }
        </div>)
}


export default TextEditor