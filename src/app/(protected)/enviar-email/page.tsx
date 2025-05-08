"use client"

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import Editor from "@monaco-editor/react";
import { Icons } from "@/components/icons"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { emailSend } from "@/actions/send-emails";
  
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
            if (!data) {
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
        <div className="h-full">
            <div className={cn('pt-5 px-2 lg:px-8 mb-4 flex items-center justify-between')}>
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
                    <Dialog open={sendOpen} onOpenChange={setSendOpen}>
                        <DialogTrigger asChild>
                            <Button className="font-medium text-sm" disabled={sendOpen}>Enviar e-mail</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader className="space-0">
                                <DialogTitle>Informações para envio</DialogTitle>
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
                </div>
            </div>
            <div className="flex mx-auto">
                <div
                    className={cn(
                        (view == 'ambos' || view == 'codigo') ? 'md:flex' : 'hidden',
                        "relative min-h-[88vh] flex-col items-start gap-8 p-0",
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
                        "relative min-h-[88vh] flex-col p-0",
                        view == 'ambos' ? 'w-[50%]' : 'w-[100%]'
                    )}>
                    <div className="relative overflow-hidden w-full h-full">
                        <iframe
                            id="previewHtml"
                            title="Preview"
                            style={{ width: "100%", height: "100%", border: "none" }}
                            srcDoc={htmlCode}
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}