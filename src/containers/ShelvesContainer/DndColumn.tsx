import type { FC, PropsWithChildren } from "react";
import type { IDndShelfTypes } from "@/types";
import { useDrag, useDrop } from "react-dnd";

type Props = PropsWithChildren<{
  id: string;
  type: IDndShelfTypes;
  onDrop: (type: IDndShelfTypes, dropId: string) => void;
}>;

type DropItem = {
  id: string;
  type: IDndShelfTypes;
};

export const DraggableColumn: FC<Props> = ({
  children,
  id,
  type,
  onDrop,
  // style,
  ...props
}) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type,
    item: { type, id },
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
  }));
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: ["shelfColumn"], // TODO: change to IDndShelfTypes constant
    drop: ({ type, id: dropId }: DropItem) => {
      if (id === dropId) return;
      onDrop(type, dropId);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), []); // TODO: deps arr

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
