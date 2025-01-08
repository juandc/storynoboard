import type { Ref, FC } from "react";
import { useDrop } from "react-dnd";
import type { IDndFrameTypes, IFrameTypes } from "@/types";
import { DroppableStoryAreaLayout } from "@/components/isomorphic";
import { dndFrameTypes } from "@/constants/dnd";

type Props = {
  frameIndex: number;
  framesLength?: number;
  onDrop: (type: IFrameTypes, index: number) => void;
};

type DropItem = {
  type: IDndFrameTypes;
};

export const DroppableStoryArea: FC<Props> = ({
  frameIndex,
  framesLength,
  onDrop,
}) => {
  const [{ isOver, canDrop }, dropRef] = useDrop(() => ({
    accept: Object.values(dndFrameTypes),
    drop: ({ type }: DropItem) => {
      const frameType = type.replace("frame--", "") as IFrameTypes;
      onDrop(frameType, frameIndex);
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [frameIndex]);

  return (
    <DroppableStoryAreaLayout
      ref={dropRef as unknown as Ref<HTMLDivElement>}
      isOver={isOver}
      canDrop={canDrop}
      isFirst={frameIndex === 0}
      isOnly={typeof framesLength !== "undefined" && framesLength === 0}
    />
  );
};
