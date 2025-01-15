import type { Ref, FC, PropsWithChildren } from "react";
import { useDrop } from "react-dnd";
import type { IDndFrameTypes, IFrameContentTypes } from "@/types";
import { DroppableContentAreaLayout } from "@/components/isomorphic";
import { dndContentTypes } from "@/constants/dnd";

type Props = PropsWithChildren<{
  frameId: string;
  frameHasContent?: boolean;
  onDrop: (type: IFrameContentTypes, id: string) => void;
}>;

type DropItem = {
  type: IDndFrameTypes;
};

export const DroppableContentArea: FC<Props> = ({
  children,
  frameId,
  frameHasContent = false,
  onDrop,
}) => {
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: frameHasContent ? [] : Object.values(dndContentTypes),
    drop: ({ type }: DropItem) => {
      const contentType = type.replace("btnContent--", "") as IFrameContentTypes;
      onDrop(contentType, frameId);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [frameId, frameHasContent]);

  return (
    <DroppableContentAreaLayout
      ref={dropRef as unknown as Ref<HTMLDivElement>}
      isOver={isOver}
      canDrop={canDrop}
    >{children}</DroppableContentAreaLayout>
  );
};
