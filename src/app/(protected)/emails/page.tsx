"use client"

import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import Editor from "@monaco-editor/react";
import { emailSend } from "@/actions/send-emails";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icons } from "@/components/icons";

export default function SenderEmails() {
    const { toast } = useToast()
    const [htmlCode, setHtmlCode] = useState<any>('');
    const [to, setTo] = useState<any>('');
    const [subject, setSubject] = useState<any>('');
    const [sendOpen, setSendOpen] = useState<boolean>(false);
    const [sending, setSending] = useState<boolean>(false);
    const [view, setView] = useState<string>('ambos');

    const handleCodeChange = (newCode : any) => {
        setHtmlCode(newCode);
    };

    async function handleSubmit() {
        setSending(true);
        console.log('Iniciando envio do e-mail...');

        const values = {
            to: to,
            subject: subject,
            html: htmlCode
        }

        await emailSend(values)
        .then((data : any) => {
            if (!data.ok) {
                console.log(data.error);
                toast({
                    variant: "destructive",
                    title: "Ocorreu um erro",
                    description: "Erro ao enviar e-mail.",
                    // action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            } else {
                console.log('E-mail enviado!');
                setSendOpen(false);
                toast({
                    title: "Sucesso",
                    description: "E-mail enviado.",
                })
            }
            setSending(false);
        });
    }

    return (
        <div className="grid h-[100svh] w-full">
            <div className="flex flex-col">
                <header className="sticky top-0 z-10 flex h-[53px] items-center justify-between gap-2 border-b bg-background px-4">
                    <h1 className="text-xl font-semibold">Envio de html</h1>
                    <div className="switch_view flex items-center justify-center">
                        <Tabs defaultValue="ambos" onValueChange={(value : string) => setView(value)}>
                            <TabsList>
                                <TabsTrigger value="ambos">Ambos</TabsTrigger>
                                <TabsTrigger value="codigo">Código</TabsTrigger>
                                <TabsTrigger value="preview">Preview</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                    <div className="actions flex items-center gap-4">
                        <Drawer>
                            <DrawerContent>
                                <div className="min-h-[50vh] mx-auto w-full max-w-sm">
                                    <DrawerHeader className="p-0 mb-5">
                                        <DrawerTitle>Informações para envio</DrawerTitle>
                                    </DrawerHeader>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="content">Para</Label>
                                            <Input
                                                id="content"
                                                placeholder="E-mail de destino"
                                                className=""
                                                onChange={(event) => setTo(event.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="content">Assunto</Label>
                                            <Input
                                                id="content"
                                                placeholder="Assunto do e-mail"
                                                className=""
                                                onChange={(event) => setSubject(event.target.value)}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Button
                                                type="button"
                                                id="send"
                                                className=""
                                                onClick={() => handleSubmit()}
                                            >Enviar</Button>
                                        </div>
                                    </div>
                                </div>
                            </DrawerContent>
                        </Drawer>
                        <Dialog open={sendOpen} onOpenChange={setSendOpen}>
                            <DialogTrigger asChild>
                                <Button className="font-medium text-sm" disabled={sendOpen}>Enviar e-mail</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Informações para envio</DialogTitle>
                                    {/* <DialogDescription>
                                        Make changes to your profile here. Click save when you're done.
                                    </DialogDescription> */}
                                </DialogHeader>
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="content">Para</Label>
                                        <Input
                                            id="content"
                                            placeholder="E-mail de destino"
                                            className=""
                                            onChange={(event) => setTo(event.target.value)}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="content">Assunto</Label>
                                        <Input
                                            id="content"
                                            placeholder="Assunto do e-mail"
                                            className=""
                                            onChange={(event) => setSubject(event.target.value)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Button
                                            type="button"
                                            variant={'outline'}
                                            className=""
                                            onClick={() => setSendOpen(false)}
                                        >Cancelar</Button>
                                        <Button
                                            type="button"
                                            id="send"
                                            className=""
                                            disabled={sending}
                                            onClick={() => handleSubmit()}
                                            >
                                            {sending && (
                                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                            )}
                                            Enviar</Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Drawer>
                            <DrawerTrigger asChild>
                            <Button variant="ghost" size="icon" className="hidden">
                                {/* <Settings className="size-4" /> */}
                                <span className="sr-only">Settings</span>
                            </Button>
                            </DrawerTrigger>
                            <DrawerContent className="max-h-[80vh]">
                            <DrawerHeader>
                                <DrawerTitle>Configuration</DrawerTitle>
                                <DrawerDescription>
                                Configure the settings for the model and messages.
                                </DrawerDescription>
                            </DrawerHeader>
                            <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                                <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Settings
                                </legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="model">Model</Label>
                                    <Select>
                                    <SelectTrigger
                                        id="model"
                                        className="items-start [&_[data-description]]:hidden"
                                    >
                                        <SelectValue placeholder="Select a model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="genesis">
                                        <div className="flex items-start gap-3 text-muted-foreground">
                                            {/* <Rabbit className="size-5" /> */}
                                            <div className="grid gap-0.5">
                                            <p>
                                                Neural{" "}
                                                <span className="font-medium text-foreground">
                                                Genesis
                                                </span>
                                            </p>
                                            <p className="text-xs" data-description>
                                                Our fastest model for general use cases.
                                            </p>
                                            </div>
                                        </div>
                                        </SelectItem>
                                        <SelectItem value="explorer">
                                        <div className="flex items-start gap-3 text-muted-foreground">
                                            {/* <Bird className="size-5" /> */}
                                            <div className="grid gap-0.5">
                                            <p>
                                                Neural{" "}
                                                <span className="font-medium text-foreground">
                                                Explorer
                                                </span>
                                            </p>
                                            <p className="text-xs" data-description>
                                                Performance and speed for efficiency.
                                            </p>
                                            </div>
                                        </div>
                                        </SelectItem>
                                        <SelectItem value="quantum">
                                        <div className="flex items-start gap-3 text-muted-foreground">
                                            {/* <Turtle className="size-5" /> */}
                                            <div className="grid gap-0.5">
                                            <p>
                                                Neural{" "}
                                                <span className="font-medium text-foreground">
                                                Quantum
                                                </span>
                                            </p>
                                            <p className="text-xs" data-description>
                                                The most powerful model for complex
                                                computations.
                                            </p>
                                            </div>
                                        </div>
                                        </SelectItem>
                                    </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="temperature">Temperature</Label>
                                    <Input id="temperature" type="number" placeholder="0.4" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="top-p">Top P</Label>
                                    <Input id="top-p" type="number" placeholder="0.7" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="top-k">Top K</Label>
                                    <Input id="top-k" type="number" placeholder="0.0" />
                                </div>
                                </fieldset>
                                <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Messages
                                </legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="role">Role</Label>
                                    <Select defaultValue="system">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="system">System</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                        <SelectItem value="assistant">Assistant</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea id="content" placeholder="You are a..." />
                                </div>
                                </fieldset>
                            </form>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </header>
                <main className="flex flex-1 gap-2 h-[50svh] overflow-auto">
                    <div
                        className={cn(
                            (view == 'ambos' || view == 'codigo') ? 'md:flex' : 'hidden',
                            "relative flex-col items-start gap-8 p-0",
                            view == 'ambos' ? 'w-[50%]' : 'w-[100%]'
                        )}
                        x-chunk="dashboard-03-chunk-0">
                        <form className="grid w-full h-full items-start gap-2 overflow-hidden">
                            <fieldset className="grid gap-6 w-full h-full">
                                <div className="grid gap-0">
                                    <Editor
                                        theme="vs-dark"
                                        width="100%"
                                        height="100%"
                                        defaultLanguage="html"
                                        defaultValue=''
                                        onChange={handleCodeChange}
                                        options={
                                            {
                                                "acceptSuggestionOnCommitCharacter": true,
                                                "acceptSuggestionOnEnter": "on",
                                                "accessibilitySupport": "auto",
                                                "autoIndent": "none",
                                                "automaticLayout": true,
                                                "codeLens": false,
                                                "colorDecorators": true,
                                                "contextmenu": false,
                                                "cursorBlinking": "blink",
                                                "cursorSmoothCaretAnimation": "off",
                                                "cursorStyle": "line",
                                                "disableLayerHinting": true,
                                                "disableMonospaceOptimizations": true,
                                                "dragAndDrop": false,
                                                "fixedOverflowWidgets": false,
                                                "folding": false,
                                                "foldingStrategy": "auto",
                                                "fontLigatures": false,
                                                "formatOnPaste": false,
                                                "formatOnType": false,
                                                "hideCursorInOverviewRuler": true,
                                                "links": true,
                                                "mouseWheelZoom": false,
                                                "multiCursorMergeOverlapping": true,
                                                "multiCursorModifier": "alt",
                                                "overviewRulerBorder": true,
                                                "overviewRulerLanes": 2,
                                                "quickSuggestions": true,
                                                "quickSuggestionsDelay": 100,
                                                "readOnly": false,
                                                "renderControlCharacters": false,
                                                "renderFinalNewline": "off",
                                                "renderLineHighlight": "all",
                                                "renderWhitespace": "none",
                                                "revealHorizontalRightPadding": 30,
                                                "roundedSelection": true,
                                                "rulers": [],
                                                "scrollBeyondLastColumn": 5,
                                                "scrollBeyondLastLine": true,
                                                "selectOnLineNumbers": true,
                                                "selectionClipboard": true,
                                                "selectionHighlight": true,
                                                "showFoldingControls": "mouseover",
                                                "smoothScrolling": false,
                                                "suggestOnTriggerCharacters": true,
                                                "wordBasedSuggestions": "currentDocument",
                                                "wordSeparators": "~!@#$%^&*()-=+[{]}|;:'\",.<>/?",
                                                "wordWrap": "off",
                                                "wordWrapBreakAfterCharacters": "\t})]?|&,;",
                                                "wordWrapBreakBeforeCharacters": "{([+",
                                                "wordWrapColumn": 80,
                                                "wrappingIndent": "none",
                                                "minimap": { enabled: false },
                                            }
                                        }
                                    />
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <div 
                        className={cn(
                            (view == 'ambos' || view == 'preview') ? 'md:flex' : 'hidden',
                            "relative flex-col h-full min-h-[40vh] p-0",
                            view == 'ambos' ? 'w-[50%]' : 'w-[100%]'
                        )}>
                        {/* <Badge variant="outline" className="absolute right-3 top-3 z-10">
                            Desktop
                        </Badge> */}
                        <div className="relative overflow-hidden  w-full h-full">
                            <iframe
                                id="previewHtml"
                                title="Preview"
                                style={{ width: "100%", height: "100%", border: "none" }}
                                srcDoc={htmlCode}
                            ></iframe>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
