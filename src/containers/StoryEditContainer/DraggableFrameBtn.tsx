import type { Ref, FC, PropsWithChildren } from "react";
import type { IDndFrameTypes, IDndContentTypes } from "@/types";
import { useDrag } from "react-dnd";
import {  } from "@/types/IDnd";

type Props = PropsWithChildren<{
  type: IDndFrameTypes | IDndContentTypes;
}>;

export const DraggableFrameBtn: FC<Props> = ({ children, type }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type },
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
  }));
  return (
    <div
      ref={drag as unknown as Ref<HTMLDivElement>}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {children}
    </div>
  );
};
