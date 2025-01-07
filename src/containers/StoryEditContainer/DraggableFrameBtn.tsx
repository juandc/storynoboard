import type { Ref, FC, PropsWithChildren } from "react";
import { useDrag } from "react-dnd";

type Props = PropsWithChildren<{
  type: "frame--start" | "frame--back-and-next"
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