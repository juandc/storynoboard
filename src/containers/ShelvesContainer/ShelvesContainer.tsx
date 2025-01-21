"use client";

import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Shelf } from "@/components/isomorphic"
import { DraggableColumn } from "./DndColumn";

const ShelvesContainer = () => {
  const initialState = {
    name: "nombre del shelf",
    columns: [
      {
        id: "id de la columna",
        name: "nombre de la columna",
        stories: [
          {
            id: "id de la historia",
            title: "titulo de la historia",
          },
        ],
      },
      {
        id: "id de la columna 2",
        name: "nombre de la columna 2",
        stories: [
          {
            id: "id de la historia 2",
            title: "titulo de la historia 2",
          },
        ],
      },
      {
        id: "id de la columna 3",
        name: "nombre de la columna 3",
        stories: [
          {
            id: "id de la historia 3",
            title: "titulo de la historia 3",
          },
        ],
      },
    ],
  };
  const [shelf, setShelf] = useState<any>(initialState);

  const onDrop = (dropId: string) => (type: string, dragId: string, originalIndex?: number): void => {
    console.log("onDrop", {type, dragId});
    if (originalIndex !== undefined && originalIndex !== -1) {
      console.log("originalIndex", originalIndex);
      setShelf((prev: any) => {
        // const dropItemIndex = prev.columns.findIndex((column: any) => column.id === dropId);
        const dragItemIndex = prev.columns.findIndex((column: any) => column.id === dragId);
        if (originalIndex === -1 || dragItemIndex === -1) return prev;
        const dragItem = { ...prev.columns[dragItemIndex] };
        const newColumns = [...prev.columns];
        newColumns.splice(dragItemIndex, 1);
        newColumns.splice(originalIndex, 0, dragItem);
        return {
          ...prev,
          columns: newColumns,
        };
      });
    } else {
      setShelf((prev: any) => {
        const dropItemIndex = prev.columns.findIndex((column: any) => column.id === dropId);
        const dragItemIndex = prev.columns.findIndex((column: any) => column.id === dragId);
        if (dropItemIndex === -1 || dragItemIndex === -1) return prev;
        const dragItem = { ...prev.columns[dragItemIndex] };
        const newColumns = [...prev.columns];
        newColumns.splice(dragItemIndex, 1);
        newColumns.splice(dropItemIndex, 0, dragItem);
        return {
          ...prev,
          columns: newColumns,
        };
      });
    }
  };

  return (
    <>
      <Shelf
        columns={shelf.columns}
        columnContainer={(id, c) => (
          <DraggableColumn
            key={id}
            id={id}
            type="shelfColumn"
            index={shelf.columns.findIndex((column: any) => column.id === id)}
            onDrop={onDrop(id)}
          >{c}</DraggableColumn>
        )}
      />

      <div>
        <h2>Buscador de historias</h2>
        {/* <StorySearch /> */}
        {/* {[].map((story: any) => (
          <div key={story.id}>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
            <button>Agregar al "shelf"</button>
          </div>
        ))} */}
      </div>
    </>
  );
};

const ShelvesContainerWrapper = () => (
  <DndProvider backend={HTML5Backend}>
    <ShelvesContainer />
  </DndProvider>
);

export { ShelvesContainerWrapper as ShelvesContainer };

