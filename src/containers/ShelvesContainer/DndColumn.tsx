import type { FC, PropsWithChildren } from "react";
import type { IDndShelfTypes } from "@/types";
import { useDrag, useDrop } from "react-dnd";

type Props = PropsWithChildren<{
  id: string;
  type: IDndShelfTypes;
  index: number;
  onDrop: (type: IDndShelfTypes, dropId: string, originalIndex?: number) => void;
}>;

type DropItem = {
  id: string;
  type: IDndShelfTypes;
  index: number;
};

export const DraggableColumn: FC<Props> = ({
  children,
  id,
  type,
  index,
  onDrop,
  // style,
  ...props
}) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type,
    item: { type, id, index },
    end: (draggedItem, monitor) => {
      if (monitor.didDrop()) return;
      console.log("end", draggedItem);
      onDrop(type, draggedItem.id, draggedItem.index);
    },
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
  }));
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: ["shelfColumn"], // TODO: change to IDndShelfTypes constant
    // drop: ({ type, id: dropId }: DropItem) => {
    //   if (id === dropId) return;
    //   onDrop(type, dropId);
    // },
    hover: ({ type, id: dropId, index: originalIndex }: DropItem) => {
      if (id === dropId) return;
      console.log("hover", { type, id, dropId, originalIndex });
      onDrop(type, dropId);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [index]); // TODO: deps arr

  console.log("isOver", isOver);
  console.log("canDrop", canDrop);

  const ref = (node: HTMLDivElement) => dragRef(dropRef(node)) as unknown as void;

  return (
    <div
      ref={ref}
      {...props}
      style={{
        opacity: isDragging ? 0.5 : 1,
        backgroundColor: (!isDragging && isOver && canDrop) ? "lightgreen" : "transparent",
        // ...style
      }}
    >
      {children}
    </div>
  );
};
