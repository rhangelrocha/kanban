// @flow
import React, { useState, useLayoutEffect, useRef } from "react";
import { VariableSizeList, FixedSizeList, areEqual } from "react-window";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import KanbanCard from "../KanbanCard/KanbanCard";

function getStyle({ draggableStyle, virtualStyle, isDragging }) {
    // If you don't want any spacing between your items
    // then you could just return this.
    // I do a little bit of magic to have some nice visual space
    // between the row items
    const combined = {
        ...virtualStyle,
        ...draggableStyle
    };

    // Being lazy: this is defined in our css file
    const grid = 8;

    // when dragging we want to use the draggable style for placement, otherwise use the virtual style
    const result = {
        ...combined,
        height: isDragging ? combined.height : combined.height - grid,
        left: isDragging ? combined.left : combined.left + grid,
        width: isDragging
            ? draggableStyle.width
            : `calc(${combined.width} - ${grid * 2}px)`,
        marginBottom: grid
    };

    return result;
}

function Item({ provided, item, style, isDragging }) {
    return (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={getStyle({
                draggableStyle: provided.draggableProps.style,
                virtualStyle: style,
                isDragging
            })}
            className={`item ${isDragging ? "is-dragging" : ""}`}
        >
            <KanbanCard item={item} />
        </div>
    );
}

// Recommended react-window performance optimisation: memoize the row render function
// Things are still pretty fast without this, but I am a sucker for making things faster
const Row = React.memo(function Row(props) {
    const { data: items, index, style } = props;
    const item = items[index];

    // We are rendering an extra item for the placeholder
    if (!item) {
        return null;
    }

    return (
        <Draggable draggableId={item.id} index={index} key={item.id}>
            {provided => <Item provided={provided} item={item} style={style} />}
        </Draggable>
    );
}, areEqual);

const ItemList = React.memo(function ItemList({ column, index }) {
    // There is an issue I have noticed with react-window that when reordered
    // react-window sets the scroll back to 0 but does not update the UI
    // I should raise an issue for this.
    // As a work around I am resetting the scroll to 0
    // on any list that changes it's index
    const listRef = useRef();
    useLayoutEffect(() => {
        const list = listRef.current;
        if (list) {
            list.scrollTo(0);
        }
    }, [index]);

    return (
        <Droppable
            droppableId={column.id}
            mode="virtual"
            renderClone={(provided, snapshot, rubric) => (
                <Item
                    provided={provided}
                    isDragging={snapshot.isDragging}
                    item={column.items[rubric.source.index]}
                />
            )}
        >
            {(provided, snapshot) => {
                // Add an extra item to our list to make space for a dragging item
                // Usually the DroppableProvided.placeholder does this, but that won't
                // work in a virtual list
                const itemCount = snapshot.isUsingPlaceholder
                    ? column.items.length + 1
                    : column.items.length;

                return (
                    <VariableSizeList
                        height={500}
                        itemCount={itemCount}
                        itemSize={() => 130}
                        width={300}
                        outerRef={provided.innerRef}
                        itemData={column.items}
                        className="task-list"
                        ref={listRef}
                    >
                        {Row}
                    </VariableSizeList>
                );
            }}
        </Droppable>
    );
});

const Column = React.memo(function Column({ column, index }) {
    return (
        <Draggable draggableId={column.id} index={index}>
            {provided => (
                <div
                    className="column"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <h3 className="column-title" {...provided.dragHandleProps}>
                        {column.title}
                    </h3>
                    <ItemList column={column} index={index} />
                </div>
            )}
        </Draggable>
    );
});

export default function NewKanbanBoard() {
    const [state, setState] = useState(() => getInitialData());

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }

        if (result.type === "column") {
            // if the list is scrolled it looks like there is some strangeness going on
            // with react-window. It looks to be scrolling back to scroll: 0
            // I should log an issue with the project
            const columnOrder = reorderList(
                state.columnOrder,
                result.source.index,
                result.destination.index
            );
            setState({
                ...state,
                columnOrder
            });
            return;
        }

        // reordering in same list
        if (result.source.droppableId === result.destination.droppableId) {
            const column = state.columns[result.source.droppableId];
            const items = reorderList(
                column.items,
                result.source.index,
                result.destination.index
            );

            // updating column entry
            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [column.id]: {
                        ...column,
                        items
                    }
                }
            };
            setState(newState);
            return;
        }

        // moving between lists
        const sourceColumn = state.columns[result.source.droppableId];
        const destinationColumn = state.columns[result.destination.droppableId];
        const item = sourceColumn.items[result.source.index];

        // 1. remove item from source column
        const newSourceColumn = {
            ...sourceColumn,
            items: [...sourceColumn.items]
        };
        newSourceColumn.items.splice(result.source.index, 1);

        // 2. insert into destination column
        const newDestinationColumn = {
            ...destinationColumn,
            items: [...destinationColumn.items]
        };
        // in line modification of items
        newDestinationColumn.items.splice(result.destination.index, 0, item);

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newSourceColumn.id]: newSourceColumn,
                [newDestinationColumn.id]: newDestinationColumn
            }
        };

        setState(newState);
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="app">
                <Droppable
                    droppableId="all-droppables"
                    direction="horizontal"
                    type="column"
                >
                    {provided => (
                        <div
                            className="columns"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {state.columnOrder.map((columnId, index) => (
                                <Column
                                    key={columnId}
                                    column={state.columns[columnId]}
                                    index={index}
                                />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    );
}


export function reorderList(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}
let uniqueId = 0;
function getItems(count) {
    return Array.from({ length: count }, (v, k) => {
        const id = uniqueId++;
        return {
            id: `id:${id}`,
            text: `item ${id}`,
        };
    });
}

const initial = {
    columns: {
        "column-0": {
            id: "column-0",
            title: "First column",
            items: getItems(1000),
        },
        "column-1": {
            id: "column-1",
            title: "Second column",
            items: getItems(1000),
        },
        "column-2": {
            id: "column-2",
            title: "Second column",
            items: getItems(1000),
        },
        "column-3": {
            id: "column-3",
            title: "Second column",
            items: getItems(1000),
        },
        "column-4": {
            id: "column-4",
            title: "Second column",
            items: getItems(1000),
        },
        "column-5": {
            id: "column-5",
            title: "Second column",
            items: getItems(1000),
        },
    },
    columnOrder: [
        "column-0",
        "column-1",
        "column-2",
        "column-3",
        "column-4",
        "column-5",
    ],
};

export function getInitialData() {
    return initial;
}