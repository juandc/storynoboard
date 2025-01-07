"use client";

import { ChangeEventHandler, type FC } from "react";
import type { ICta, IFrameContent, IStory } from "@/types";
import { EditStoryFrameCard, EditStoryLayout, StoryFrame } from "@/components/isomorphic";
import { useStoryEdit } from "./useStoryEdit";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DroppableStoryArea } from "./DroppableStoryArea";
import { DraggableFrameBtn } from "./DraggableFrameBtn";

type Props = {
  story: IStory;
};

const StoryEditContainer: FC<Props> = ({ story }) => {
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

  const onFrameDrop = (type: string, frameIndex: number) => {
    console.log({ type });
    addFrameToStory("start", frameIndex);
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
      top={(
        <>
          <h1 style={{ marginRight: "auto", fontSize: "1.5rem" }}>{name}</h1>
          <button disabled style={{
            border: "none",
            borderRadius: 8,
            backgroundColor: "var(--bg)",
            padding: "8px 16px",
            marginRight: 8,
            opacity: 0.6,
          }}>
            Ver
          </button>
          <button disabled style={{
            border: "none",
            borderRadius: 8,
            backgroundColor: "var(--primary)",
            color: "var(--text-inverse)",
            padding: "8px 16px",
            opacity: 0.6,
          }}>
            Guardar
          </button>
        </>
      )}
      left={(
        <>
          {isFrameSelected && (
            <>
              <p>Contenido:</p>
              <button
                onClick={() => addTextToSelectedFrame("texto de ejemplo")}
                disabled={!!actualFrameHasText}
                style={{
                  border: "none",
                  borderRadius: 8,
                  backgroundColor: "var(--bg)",
                  cursor: actualFrameHasText ? "no-drop" : "pointer",
                  padding: 16,
                  width: "100%",
                  aspectRatio: "1/1"
                }}
              >Texto</button>
            </>
          )}
          {isFrameSelected && isTextSelected && (
            <>
              <p style={{ marginTop: 8 }}>Texto</p>
              <textarea
                key={actualFrame?.id}
                value={actualFrame?.data.data.content.text}
                onChange={addInputTextToSelectedFrame}
                autoFocus
                style={{
                  border: "none",
                  borderRadius: 8,
                  backgroundColor: "var(--bg)",
                  cursor: "text",
                  padding: 16,
                  minHeight: "250px",
                  width: "100%",
                  minWidth: "100%",
                  maxWidth: "100%",
                }}
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
              <DraggableFrameBtn type="frame--start">
                <button
                  onClick={() => addFrameToStory("start")}
                  style={{
                    border: "none",
                    borderRadius: 8,
                    backgroundColor: "var(--bg)",
                    cursor: "pointer",
                    padding: 16,
                    width: "100%",
                    aspectRatio: "1/1"
                  }}
                >
                  Página de Inicio
                </button>
              </DraggableFrameBtn>
              <DraggableFrameBtn type="frame--back-and-next">
                <button
                  onClick={() => addFrameToStory("back-and-next")}
                  style={{
                    border: "none",
                    borderRadius: 8,
                    backgroundColor: "var(--bg)",
                    cursor: "pointer",
                    marginTop: 16,
                    padding: 16,
                    width: "100%",
                    aspectRatio: "1/1"
                  }}
                >
                    Página de Anterior y Siguiente
                </button>
              </DraggableFrameBtn>
            </>
          )}
        </>
      )}
      board={(
        <>
          <DroppableStoryArea frameIndex={0} onDrop={onFrameDrop} framesLength={frames.length} />
          {frames.map((frame, frameIndex) => (
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
              <DroppableStoryArea frameIndex={frameIndex + 1} onDrop={onFrameDrop} />
            </EditStoryFrameCard>
          ))}
        </>
      )}
      boardOnClick={resetFrame}
    />
  );
};

const StoryEditContainerWrapper = (props: Props) => {
  return <DndProvider backend={HTML5Backend}><StoryEditContainer {...props} /></DndProvider>
};

export { StoryEditContainerWrapper as StoryEditContainer };
