import { type Ref, type FC } from "react";
import { useDrop } from "react-dnd";
// import { DroppableStoryAreaLayout } from "@/components/isomorphic";

type Props = {
  frameIndex: number;
  framesLength?: number;
  onDrop: (type: string, index: number) => void;
};

export const DroppableStoryArea: FC<Props> = ({
  frameIndex,
  framesLength,
  onDrop,
}) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ["frame--start", "frame--back-and-next"],
    drop: (item, monitor) => {
      alert("Llegó un frame al " + frameIndex + item);
      console.log({ item, monitor });
      onDrop("start", frameIndex);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }), [frameIndex]);

  return (
    <div
      ref={dropRef as unknown as Ref<HTMLDivElement>}
      onClick={e => e.stopPropagation()}
      style={{
        backgroundColor: isOver ? "var(--bg)" : "transparent",
        opacity: .5,
        position: "absolute",
        left: 0,
        right: 0,
        top: frameIndex === 0 ? -24 : "unset",
        bottom: frameIndex === 0 ? "unset" : -16,
        height: (typeof framesLength !== "undefined" && !framesLength) ? "calc(100dvh - 64px)" : 48,
        zIndex: 1,
      }}
    />
  );

  // return (
  //   <DroppableStoryAreaLayout ref={dropRef} isOver={isOver} />
  // );
};
