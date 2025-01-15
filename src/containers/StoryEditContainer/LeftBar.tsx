import { ChangeEventHandler, type FC } from "react";
import { useStoryEdit } from "./StoryEditContext";
import { DraggableFrameBtn } from "./drags/DraggableFrameBtn";
import { dndContentTypes, dndFrameTypes } from "@/constants/dnd";

export const LeftBar: FC = () => {
  const {
    selection: {
      frameId: selectedFrameId,
      element: selectedElement,
    },
    actualFrame,
    setSelection,
    addFrameToStory,
    addTextToFrame,
    addTextToSelectedFrame,
  } = useStoryEdit();

  const actualFrameHasText = actualFrame?.data.data.content.text.trim().length;
  const isFrameSelected = typeof selectedFrameId !== "undefined";
  const isTextSelected = isFrameSelected && selectedElement?.type === "text";

  type ChangeTextAreaEvent = ChangeEventHandler<HTMLTextAreaElement>;
  const addInputTextToSelectedFrame: ChangeTextAreaEvent = (e) => {
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

  return (
    <>
      {isFrameSelected && (
        <>
          <p>Contenido:</p>
          <DraggableFrameBtn type={dndContentTypes.BTN_TEXT}>
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
          </DraggableFrameBtn>
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
          <DraggableFrameBtn type={dndFrameTypes.BTN_FRAME_START}>
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
          <DraggableFrameBtn type={dndFrameTypes.BTN_FRAME_BACK_NEXT}>
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
  );
};
