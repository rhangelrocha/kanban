"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import 'react-quill-new/dist/quill.bubble.css';
import '@/assets/css/text-editor.css'
import { renderToString } from 'react-dom/server'
import dynamic from 'next/dynamic';
// import 'quill-mention-react';
// import { Mention, MentionBlot } from "quill-mention";
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

async function fetchUsers(query) {
    // Simulação de atraso de 1 minuto
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulação de resposta da API
    const users = [
        { id: 1, name: 'Rhangel Rocha', image: 'https://picsum.photos/30' },
        { id: 2, name: 'Danillo Muniz', image: 'https://picsum.photos/30' },
        { id: 3, name: 'Luca Casanova', image: 'https://picsum.photos/30' },
        { id: 4, name: 'Gabriel Lemos', image: 'https://picsum.photos/30' },
        { id: 5, name: 'Humberto Castelobranco', image: 'https://picsum.photos/30' },
    ];

    // Filtrando usuários com base na query
    return users.filter(user => user.name.toLowerCase().includes(query.toLowerCase()));
}

const Embed = Quill.import('blots/embed');

class MentionBlot extends Embed {
    static create(value) {
        let node = super.create();
        node.setAttribute('data-id', value.id);
        node.setAttribute('data-name', value.name);
        node.setAttribute('data-image', value.image);

        // Criação do HTML da menção
        node.innerHTML = `<span class="mention-blot"><span class="mention-blot-img" style="background-image:url('${value.image}')"></span>${value.name}</span>`;
        return node;
    }

    static value(node) {
        return {
            id: node.getAttribute('data-id'),
            name: node.getAttribute('data-name'),
            image: node.getAttribute('data-image')
        };
    }
}

MentionBlot.blotName = 'mention';
MentionBlot.tagName = 'span';
MentionBlot.className = 'mention';

Quill.register(MentionBlot);

class MentionModule {
    constructor(quill, options) {
        this.quill = quill;
        this.options = options;
        this.container = document.createElement('div');
        this.container.classList.add('mention-container');
        this.quill.container.appendChild(this.container);
        this.container.style.position = 'absolute';
        this.container.style.display = 'none';
        
        quill.root.addEventListener('keyup', (evt) => this.onKeyUp(evt));
    }

    async onKeyUp(evt) {
        const range = this.quill.getSelection();
        if (!range) return;
        const [leaf] = this.quill.getLeaf(range.index - 1);
        const text = leaf ? leaf.text : '';
        if(!text) return;
        const mentionChar = this.options.mentionChar || '@';
        const mentionIndex = text.lastIndexOf(mentionChar);

        if (mentionIndex >= 0) {
            const mentionText = text.substring(mentionIndex + 1);
            await this.showMentionList(mentionText, range);
        } else {
            this.hideMentionList();
        }
    }

    async showMentionList(mentionText, range) {
        this.container.style.display = 'block';
        
        this.container.innerHTML = '<div><span class="mention-loader"></span></div>';
        this.positionMentionList(range);
        const users = await fetchUsers(mentionText);
        
        const matches = users.map(user => 
            `<div class="mention-item" data-id="${user.id}" data-name="${user.name}">
                <img src="${user.image}" alt="${user.name}" />
                ${user.name}
            </div>`
        ).join('');
        this.container.innerHTML = matches;

        this.container.querySelectorAll('.mention-item').forEach(item => {
            item.addEventListener('click', () => this.selectMention(item, range));
        });
    }

    hideMentionList() {
        this.container.style.display = 'none';
    }

    positionMentionList(range) {
        if (!range) return;
        const bounds = this.quill.getBounds(range.index);
        this.container.style.left = `${bounds.left}px`;
        this.container.style.top = `${bounds.bottom + 10}px`;
    }

    selectMention(item, range) {
        const name = item.getAttribute('data-name');
        const id = item.getAttribute('data-id');
        const image = item.querySelector('img').src;
        if (!range) return;
        const [leaf] = this.quill.getLeaf(range.index - 1);
        const text = leaf ? leaf.text : '';
        const mentionChar = this.options.mentionChar || '@';
        const mentionIndex = text.lastIndexOf(mentionChar);
        if (mentionIndex >= 0) {
            const startPos = range.index - (text.length - mentionIndex);
            this.quill.deleteText(startPos, text.length - mentionIndex, Quill.sources.USER);
            this.quill.insertEmbed(startPos, 'mention', { id, name, image }, Quill.sources.USER);
            this.quill.insertText(startPos + 1, ' ', Quill.sources.USER); // Adiciona espaço após a menção
            this.quill.setSelection(startPos + 2, Quill.sources.USER); // Atualiza a posição do cursor
            this.hideMentionList();
        }
    }
}

Quill.register('modules/mention', MentionModule);


const icons = Quill.import('ui/icons');
icons.bold = renderToString(<Icons.bold />);
icons.italic = renderToString(<Icons.italic />);
icons.underline = renderToString(<Icons.underline />);
icons.strike = renderToString(<Icons.strike />);
icons.color = renderToString(<Icons.color />);
icons.background = renderToString(<Icons.background />);
icons.list.check = renderToString(<Icons.checkList />);
icons.list.bullet = renderToString(<Icons.bulletList />);
icons.list.ordered = renderToString(<Icons.orderedList />);
icons.align[''] = renderToString(<Icons.alighLeft />);
icons.align.left = renderToString(<Icons.alighLeft />);
icons.align.center = renderToString(<Icons.alighCenter />);
icons.align.justify = renderToString(<Icons.alighJustify />);
icons.align.right = renderToString(<Icons.alighRight />);
icons.link = renderToString(<Icons.link />);
icons.image = renderToString(<Icons.image />);
icons.video = renderToString(<Icons.video />);
icons.blockquote = renderToString(<Icons.quote />);
icons['code-block'] = renderToString(<Icons.code />);


const QuillEditor = ({ theme = 'snow', defaultValue = '', ...props }) => {

    useEffect(() => {
        // console.log('Mention', Mention)
        document.querySelectorAll('.ql-picker-label[data-value]').forEach((el) => {
            // @ts-ignore
            el.style['--value'] = el.getAttribute('data-value') || '';
        });
    }, [])

    let toolbar = {
        // container: '#toolbar',
        container: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [
                "bold",
                "italic",
                "underline",
                "strike",
            ],
            [
                {
                    color: ["hsl(var(--foreground))", "#8492A6", "#54677B", "#FFB09C", "#D83818", "#FD9126", "#50B840", "#FFCCBC", "#F8BBD0", "#D1C4E9", "#B2DFDB", "#D7CCC8", "#C6C6C6", "purple", "silver", "gray", "maroon", "red", "magenta", "green", "olive", "navy", "blue", "orange"]
                },
                {
                    background: ["hsl(var(--background))", "#D83818", "#FD9126", "#50B840", "#009AE7", "#C00810", "#FFFF00", "#108040", "#007DBB", 'magenta', "purple", "silver"]
                }
            ],
            [
                { list: "ordered" },
                { list: "bullet" },
                { list: "check" },
                { align: [] },
            ],
            ["link", "image", "video"],
            ["code-block", "blockquote"]
        ],
        handlers: {}
    };
    if (theme === 'bubble') {
        toolbar = {
            // container: '#toolbar',
            container: [
                [
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                ],
            ],
            handlers: {}
        };
    }
    const atValues = [
        { id: 1, value: "Rhangel Rocha" },
        { id: 2, value: "Danillo Muniz" }
    ];
    const hashValues = [
        { id: 3, value: "hashtag1" },
        { id: 4, value: "hashtag2" }
    ];
    const people = [
        { id: 5, value: "Rhangel Rocha" },
    ]
    const data = [
        { id: 1, name: 'Rhangel Rocha', image: 'https://picsum.photos/30' },
        { id: 2, name: 'Danillo Muniz', image: 'https://picsum.photos/30' },
        { id: 3, name: 'Luca Casanova', image: 'https://picsum.photos/30' },
        { id: 4, name: 'Gabriel Lemos', image: 'https://picsum.photos/30' },
        { id: 5, name: 'Humberto Castelobranco', image: 'https://picsum.photos/30' },
    ]
    
    const mention = {
        mentionChar: '@',
        users: ['Alice', 'Bob', 'Charlie', 'Dave']
    }
    const ref = useRef(null)
    useEffect(() => {
        // console.log('defaultValue', defaultValue);
        // ref.current.editor.setContents(defaultValue)
    }, [defaultValue])
    // const handleChange = (a, b, c) => {
    //     console.log("handleChange", a, b, c)
    //     if (onChange) onChange(a);
    // }
    return (
        <>
            <ReactQuill
                ref={ref}
                theme={theme}
                modules={{
                    toolbar: toolbar,
                    // ImageResize: {
                    //     modules: ['Resize', 'DisplaySize', 'Toolbar']
                    // }
                    imageResize: {
                        parchment: Quill.import('parchment'),
                        modules: ['Resize', 'DisplaySize', 'Toolbar'],

                        handleStyles: {
                            backgroundColor: 'hsl(var(--primary))',
                            opacity: 1,
                            borderRadius: 10,
                            border: 'none',
                            color: 'white'
                            // other camelCase styles for size display
                        },
                        toolbarStyles: {
                            // other camelCase styles for size display
                        },
                        toolbarButtonStyles: {
                            background: 'transparent',
                            margin: '0 5px',
                            border: 'none',
                            width: '34px',
                            height: '34px',
                            // ...
                        },
                        toolbarButtonSvgStyles: {
                            fill: 'currentColor',
                            backgroundColor: 'hsl(var(--popover))',
                            color: 'hsl(var(--popover-foreground))',
                            border: 'solid 1px hsl(var(--border))',
                            boxShadow: 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
                            padding: '5px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            // ...
                        },
                    },
                    mention: mention
                }}
                {...props}
            />
        </>
    )
}


export default QuillEditor