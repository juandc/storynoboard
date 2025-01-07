"use client";

import { ChangeEventHandler, type FC } from "react";
import type { ICta, IFrameContent, IStory } from "@/types";
import { EditStoryFrameCard, EditStoryLayout, StoryFrame } from "@/components/isomorphic";
import { useStoryEdit } from "./useStoryEdit";

type Props = {
  story: IStory;
};

export const StoryEditContainer: FC<Props> = ({ story }) => {
  const {
    editingStory: {
      data: {
        name,
        frames,
      }
    },
    selection: {
      frameId: selectedFrameId,
      element: selectedElement,
    },
    resetFrame,
    setSelection,
    actualFrame,
    addFrameToStory,
    removeFrameFromStory,
    addTextToFrame,
    addTextToSelectedFrame,
  } = useStoryEdit({ story });

  const actualFrameHasText = actualFrame?.data.data.content.text.length;
  const isFrameSelected = typeof selectedFrameId !== "undefined";
  const isTextSelected = isFrameSelected && selectedElement?.type === "text";

  const addInputTextToSelectedFrame: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (selectedFrameId && actualFrame) {
      addTextToFrame(selectedFrameId, e.target.value);
      setSelection(prev => ({
        ...prev,
        element: {
          type: "text",
          data: actualFrame.data.data.content.text,
        },
      }));
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
    <EditStoryLayout
      top={<>TopBar: {name}</>}
      left={(
        <>
          {isFrameSelected && (
            <>
              <p>{selectedFrameId}</p>
              <p>Contenido:</p>
              <button
                onClick={() => addTextToSelectedFrame("texto de ejemplo")}
                disabled={!!actualFrameHasText}
              >Agregar texto</button>
            </>
          )}
          {isFrameSelected && isTextSelected && (
            <>
              <p>{selectedElement?.type}</p>
              <textarea
                key={actualFrame?.id}
                value={actualFrame?.data.data.content.text}
                onChange={addInputTextToSelectedFrame}
                autoFocus
              />
            </>
          )}
          {/* {isFrameSelected && isCtaSelected && (
            <>
              <p>{selectedElement?.type}</p>
              <input
                value={actualFrame?.data.data.content.text}
                onChange={e => addTextToSelectedFrame(selectedFrameId, e.target.value)}
              />
            </>
          )} */}
          {!isFrameSelected && (
            <>
              <button onClick={() => addFrameToStory("start")}>Agregar página de Inicio</button>
              <button onClick={() => addFrameToStory("back-and-next")}>Agregar página de Anterior y Siguiente</button>
            </>
          )}
        </>
      )}
      board={frames.map(frame => (
        <EditStoryFrameCard
          key={frame.id}
          active={frame.id === selectedFrameId}
          onClick={() => onStoryFrameClick(frame.id)}
          onClose={() => removeFrameFromStory(frame.id)}
        >
          <StoryFrame
            frame={frame}
            dispatchText={onFrameTextClick}
            dispatchCta={onFrameCtaClick}
          />
        </EditStoryFrameCard>
      ))}
      boardOnClick={resetFrame}
    />
  );
};
