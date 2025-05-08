"use client"
import React, { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import styles from "./ProjetoDescription.module.css"
import { Skeleton } from "@/components/ui/skeleton"
import { projetoDescricaoPut } from "@/actions/projeto-description-put"
import { projetoGet } from "@/actions/projeto-get"
import { Project } from "@/models"

// import ReactQuill, { Quill } from "react-quill"
// import Quill from 'quill';
import "react-quill/dist/quill.snow.css"
import "@/assets/css/text-editor.css"
import { renderToString } from "react-dom/server"
import dynamic from "next/dynamic"
// import ImageResize from 'quill-image-resize-module-react';
// Quill.register('modules/imageResize', ImageResize);

// const icons = Quill.import("ui/icons")
// icons.bold = renderToString(<Icons.bold />);
// icons.italic = renderToString(<Icons.italic />);
// icons.underline = renderToString(<Icons.underline />);
// icons.strike = renderToString(<Icons.strike />);
// icons.color = renderToString(<Icons.color />);
// icons.background = renderToString(<Icons.background />);
// icons.list = {
//     check: renderToString(<Icons.checkList />),
//     bullet: renderToString(<Icons.bulletList />),
//     ordered: renderToString(<Icons.orderedList />),
// }
// icons.align[''] = renderToString(<Icons.alighLeft />);
// icons.align.left = renderToString(<Icons.alighLeft />);
// icons.align.center = renderToString(<Icons.alighCenter />);
// icons.align.justify = renderToString(<Icons.alighJustify />);
// icons.align.right = renderToString(<Icons.alighRight />);

// icons.link = renderToString(<Icons.link />);
// icons.image = renderToString(<Icons.image />);
// icons.video = renderToString(<Icons.video />);
// icons.blockquote = renderToString(<Icons.quote />);
// icons['code-block'] = renderToString(<Icons.code />);

const ProjetoDescription = ({
  idProjeto,
  descriptionProjeto,
}: {
  idProjeto: string
  descriptionProjeto: string
}) => {
  const [editCount, setEditCount] = useState<number>(0)
  const [loadingContent, setLoadingContent] = useState<boolean>(false)
  const [updateContent, setUpdateContent] = useState<boolean>(false)
  const [contentProjeto, setContentProjeto] =
    useState<string>(descriptionProjeto)
  const [fullScreen, setFullScreen] = useState<boolean>(false)

  async function onSubmit(content: string) {
    if (editCount > 0 && content != contentProjeto) {
      setEditCount(editCount + 1)
      setUpdateContent(true)
      setContentProjeto(content)
      console.log("Iniciando atualização da descrição do projeto...")

      // await projetoDescricaoPut({id: idProjeto, description: content})
      // .then((data : any) => {
      //     console.log('Título do projeto alterado.');
      //     setUpdateContent(false);
      // });

      setTimeout(() => {
        setUpdateContent(false)
      }, 5000)
    }
  }

  // useEffect(() => {
  //     document.querySelectorAll('.ql-picker-label[data-value]').forEach((el) => {
  //         // @ts-ignore
  //         el.style['--value'] = el.getAttribute('data-value') || '';
  //     });
  // }, []);

  return (
    <div
      id="textEditor"
      className={cn("h-full min-h-[70vh]", fullScreen ? "fullScreen" : "")}
    >
      <Button
        className="expandButton"
        onClick={() => setFullScreen(!fullScreen)}
        size={"icon"}
        variant={"ghost"}
      >
        {fullScreen ? <Icons.shrink /> : <Icons.expand />}
      </Button>
      {/* <ReactQuill
        theme="snow"
        value={contentProjeto}
        onChange={(value) => onSubmit(value)}
        modules={{
          toolbar: {
            // container: '#toolbar',
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "strike"],
              [
                {
                  color: [
                    "hsl(var(--foreground))",
                    "#8492A6",
                    "#54677B",
                    "#FFB09C",
                    "#D83818",
                    "#FD9126",
                    "#50B840",
                    "#FFCCBC",
                    "#F8BBD0",
                    "#D1C4E9",
                    "#B2DFDB",
                    "#D7CCC8",
                    "#C6C6C6",
                    "purple",
                    "silver",
                    "gray",
                    "maroon",
                    "red",
                    "magenta",
                    "green",
                    "olive",
                    "navy",
                    "blue",
                    "orange",
                  ],
                },
                {
                  background: [
                    "hsl(var(--background))",
                    "#D83818",
                    "#FD9126",
                    "#50B840",
                    "#009AE7",
                    "#C00810",
                    "#FFFF00",
                    "#108040",
                    "#007DBB",
                    "magenta",
                    "purple",
                    "silver",
                  ],
                },
              ],
              [
                { list: "ordered" },
                { list: "bullet" },
                { list: "check" },
                { align: [] },
              ],
              ["link", "image", "video"],
              ["code-block", "blockquote"],
            ],
            handlers: {},
          },
          // ImageResize: {
          //     modules: ['Resize', 'DisplaySize', 'Toolbar']
          // }
          imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize", "Toolbar"],

            handleStyles: {
              backgroundColor: "hsl(var(--primary))",
              opacity: 1,
              borderRadius: 10,
              border: "none",
              color: "white",
              // other camelCase styles for size display
            },
            toolbarStyles: {
              // other camelCase styles for size display
            },
            toolbarButtonStyles: {
              background: "transparent",
              margin: "0 5px",
              border: "none",
              width: "34px",
              height: "34px",
              // ...
            },
            toolbarButtonSvgStyles: {
              fill: "currentColor",
              backgroundColor: "hsl(var(--popover))",
              color: "hsl(var(--popover-foreground))",
              border: "solid 1px hsl(var(--border))",
              boxShadow:
                "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
              padding: "5px",
              borderRadius: "5px",
              cursor: "pointer",
              // ...
            },
          },
        }}
      /> */}
      <div className="editorFooter text-sm flex items-center justify-end gap-3">
        {updateContent ? (
          <div className="text-sm flex items-center justify-end gap-3">
            <Icons.spinner className="h-4 w-4 animate-spin stroke-neutral-400" />{" "}
            Atualizando
          </div>
        ) : (
          <>Atualizado agorinha</>
        )}
      </div>
    </div>
  )
}
export default ProjetoDescription
