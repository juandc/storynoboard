import { Fragment, type FC } from "react";
import type {
  ICta,
  IFrameContent,
  IFrameContentTypes,
  IFrameTypes,
} from "@/types";
import { EditStoryFrameCard, StoryFrame } from "@/components/isomorphic";
import { DroppableStoryArea } from "./drops/DroppableStoryArea";
import { DroppableContentArea } from "./drops/DroppableContentArea";
import { useStoryEdit } from "./StoryEditContext";

export const Board: FC = () => {
  const {
    editingStory: {
      data: {
        frames,
      },
    },
    selection: {
      frameId: selectedFrameId,
    },
    setSelection,
    addFrameToStory,
    removeFrameFromStory,
    addTextToFrame,
  } = useStoryEdit();

  const onFrameDrop = (type: IFrameTypes, frameIndex: number) => {
    addFrameToStory(type, frameIndex);
  };

  const onContentDrop = (type: IFrameContentTypes, id: string) => {
    if (type === "text") {
      addTextToFrame(id, "texto de ejemplo", true);
    }
  };

  const onStoryFrameClick = (frameId: string) => {
    setSelection({ frameId, element: undefined });
  };

  const onFrameTextClick = (frameId: string, data: IFrameContent["text"]) => {
    setSelection({ frameId, element: { type: "text", data } });
  };

  const onFrameCtaClick = (frameId: string, data: ICta) => {
    setSelection({ frameId, element: { type: "cta", data } });
  };

  return (
    <>
      <DroppableStoryArea
        frameIndex={0}
        onDrop={onFrameDrop}
        framesLength={frames.length}
      />
      {frames.map((frame, frameIndex) => (
        <Fragment key={frame.id}>
          <EditStoryFrameCard
            active={frame.id === selectedFrameId}
            onClick={() => onStoryFrameClick(frame.id)}
            onClose={() => removeFrameFromStory(frame.id)}
          >
            <StoryFrame
              frame={frame}
              dispatchText={onFrameTextClick}
              dispatchCta={onFrameCtaClick}
              textWrapper={(c) => (
                <DroppableContentArea
                  frameId={frame.id}
                  frameHasContent={!!frame.data.data.content.text.trim().length}
                  onDrop={onContentDrop}
                >
                  {c}
                </DroppableContentArea>
              )}
            />
          </EditStoryFrameCard>
          <DroppableStoryArea frameIndex={frameIndex + 1} onDrop={onFrameDrop} />
        </Fragment>
      ))}
    </>
  );
};
