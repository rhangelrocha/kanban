"use client"

import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  forwardRef
} from "react";

import styles from "./styles.module.css";
import useKanban from "@/app/hooks/useKanban";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  DraggableProvided
} from "@hello-pangea/dnd";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ClockIcon,
  DotsVerticalIcon,
  LayersIcon
} from "@radix-ui/react-icons";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import KanbanCard from "../KanbanCard/KanbanCard";
import { Task } from "@/types/kanban";
import { KanbanContext } from "@/contexts/KanbanContext";
import { NewTaskModalOnFinishType } from "../NewTaskModal/NewTaskModal";
import { areEqual, VariableSizeList } from "react-window";

interface KanbanBoard2Props extends React.HTMLAttributes<HTMLElement> {}

export default function KanbanBoard2({ className, ...props }: KanbanBoard2Props) {
  const { addCard, onDragEnd, columns, setColumns } = useKanban({
    taskStatus: {},
    onUpdate: (updated) => {},
    onMove: (moveData) => {}
  });

  const kanbanContext = useContext(KanbanContext);
  if (!kanbanContext) {
    throw new Error("KanbanContext must be used within a KanbanProvider");
  }
  const { createNewTask } = kanbanContext;

  const addTask = (columnId: string | number, task?: Task, push = false) => {
    const initialData: Partial<Task> = { ...task, column: columnId };
    const onFinish: NewTaskModalOnFinishType = (task) => {
      if (task && columnId) {
        addCard(`${columnId}`, task, false);
      }
    };
    if (task) addCard(`${columnId}`, task, false);
    createNewTask(initialData, onFinish);
  };

  const [listRef, setListRef] = useState<{ [key: string]: VariableSizeList | null }>({});
  const [listHeight, setListHeight] = useState(500);

  const updateHeight = () => {
    const el = document.querySelector(`.${styles.cards}`);
    if (el) {
      setListHeight(el.clientHeight);
    }
  };

  useEffect(updateHeight, [listRef]);

  useEffect(() => {
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div {...props} className={cn(className, styles.board)}>
      <ul className={cn(styles.columns, "cursor-default")}>
        <DragDropContext
          onDragEnd={(result: DropResult) => {
            onDragEnd(result);
            if (result.destination) {
              listRef[result.destination.droppableId]?.resetAfterIndex(
                result.destination.index
              );
            }
            listRef[result.source.droppableId]?.resetAfterIndex(
              result.source.index
            );
          }}
        >
          {Object.keys(columns).map((columnId) => {
            const column = columns[columnId];
            return (
              <li className="flex" key={`${columnId}`}>
                <header className="flex-none py-2 px-4 space-y-0 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="font-bold">{column.title}</div>
                    <div className="flex-none">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <DotsVerticalIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                          <DropdownMenuItem>Adicionar nova tarefa</DropdownMenuItem>
                          <DropdownMenuItem>Mover tarefas</DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Ordenar tarefas</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem>Data de início desejado</DropdownMenuItem>
                                <DropdownMenuItem>Data de entrega desejada</DropdownMenuItem>
                                <DropdownMenuItem>Data de criação</DropdownMenuItem>
                                <DropdownMenuItem>Cliente</DropdownMenuItem>
                                <DropdownMenuItem>Projeto</DropdownMenuItem>
                                <DropdownMenuItem>Tipo</DropdownMenuItem>
                                <DropdownMenuItem>Título</DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Desabilitar notificações</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Minimizar etapa</DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Criar nova etapa</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem>Opção 1</DropdownMenuItem>
                                <DropdownMenuItem>Opção 2</DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="flex items-center justify-normal gap-4 text-xs font-bold">
                    <HoverCard openDelay={0} closeDelay={0}>
                      <HoverCardTrigger className="flex gap-2 items-center">
                        <LayersIcon /> {column.items?.length || 0}
                      </HoverCardTrigger>
                      <HoverCardContent side="bottom" className="text-sm pointer-events-none">
                        Total de tarefas nesta etapa
                      </HoverCardContent>
                    </HoverCard>
                    <HoverCard openDelay={0} closeDelay={0}>
                      <HoverCardTrigger className="flex gap-2 items-center">
                        <ClockIcon /> 10h
                      </HoverCardTrigger>
                      <HoverCardContent side="bottom" className="text-sm pointer-events-none">
                        Tempo médio que uma tarefa fica nesta etapa. Considerando as tarefas entregues nos últimos 30 dias.
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </header>
                <div className={styles.cards}>
                  <Droppable
                    droppableId={`${columnId}`}
                    key={`${columnId}`}
                    mode="virtual"
                    renderClone={(provided, snapshot, rubric) => (
                      <Item
                        provided={provided}
                        isDragging={snapshot.isDragging}
                        item={column.items?.[rubric.source.index]}
                      />
                    )}
                  >
                    {(provided, snapshot) => (
                      <ItemList
                        height={listHeight}
                        provided={provided}
                        snapshot={snapshot}
                        column={column}
                        setListRef={setListRef}
                      />
                    )}
                  </Droppable>
                </div>
                <a
                  className={styles.addCardCol}
                  onClick={() => addTask(`${columnId}`)}
                >
                  + Adicionar tarefa
                </a>
              </li>
            );
          })}
        </DragDropContext>
      </ul>
    </div>
  );
}

const Row = React.memo(function Row({ data, index, style }: {
  data: Task[];
  index: number;
  style: React.CSSProperties;
}) {
  const item = data[index];
  if (!item || typeof item.id !== 'string') return null;

  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided, snapshot) => (
        <Item
          provided={provided}
          item={item}
          style={style}
          isDragging={snapshot.isDragging}
        />
      )}
    </Draggable>
  );
}, areEqual);

function Item({
  provided,
  item,
  style = {},
  isDragging
}: {
  provided: DraggableProvided;
  item: Task;
  style?: React.CSSProperties;
  isDragging: boolean;
}) {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={{ ...provided.draggableProps.style, ...style }}
      className={`item ${isDragging ? "is-dragging" : ""}`}
    >
      <KanbanCard item={item} />
    </div>
  );
}

type ItemListProps = {
  height: number;
  column: { id: string; items: Task[] };
  snapshot: any;
  provided: any;
  setListRef: React.Dispatch<React.SetStateAction<{ [key: string]: VariableSizeList | null }>>;
};

const ItemList = ({ height, column, snapshot, provided, setListRef }: ItemListProps) => {
  const listRef = useRef<VariableSizeList>(null);

  const itemCount = snapshot.isUsingPlaceholder
    ? column.items.length + 1
    : column.items.length;

  useEffect(() => {
    setListRef((ref) => ({
      ...ref,
      [column.id]: listRef.current
    }));
  }, [column.id]);

  return (
    // @ts-ignore
    <VariableSizeList
      height={height}
      itemCount={itemCount}
      itemSize={(index) => calculeItemSize(column, index)}
      width={300}
      outerRef={provided.innerRef}
      itemData={column.items}
      className="task-list"
      ref={listRef}
    >
      {Row}
    </VariableSizeList>
  );
};

function calculeItemSize(column: { items: Task[] }, index: number): number {
  return 180; // Pode implementar o cálculo dinâmico depois, se necessário
}
