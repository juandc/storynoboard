import type { Ref, FC, PropsWithChildren, HTMLAttributes } from "react";
import type { IDndFrameTypes, IDndContentTypes } from "@/types";
import { useDrag } from "react-dnd";

type Props = PropsWithChildren<{
  type: IDndFrameTypes | IDndContentTypes;
} & HTMLAttributes<HTMLDivElement>>;

export const DraggableFrameBtn: FC<Props> = ({
  children,
  type,
  style,
  ...props
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { type },
    collect: monitor => ({ isDragging: !!monitor.isDragging() }),
  }));
  return (
    <div
      ref={drag as unknown as Ref<HTMLDivElement>}
      {...props}
      style={{ opacity: isDragging ? 0.5 : 1, ...style }}
    >
      {children}
    </div>
  );
};
