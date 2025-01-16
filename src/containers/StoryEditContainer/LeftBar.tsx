import { ChangeEventHandler, type FC } from "react";
import { useStoryEdit } from "./StoryEditContext";
import { DraggableFrameBtn } from "./drags/DraggableFrameBtn";
import { dndContentTypes, dndFrameTypes } from "@/constants/dnd";
import { EditPanelElementLayout, EditPanelModuleLayout, EditPanelTextAreaLayout } from "@/components/isomorphic";

export const LeftBar: FC = () => {
  const {
    editingStory: {
      data: {
        frames,
      },
    },
    selection: {
      frameId: selectedFrameId,
      element: selectedElement,
    },
    actualFrame,
    setSelection,
    addFrameToStory,
    addTextToFrame,
    addTextToSelectedFrame,
    addTextToSelectedCta,
  } = useStoryEdit();

  const actualFrameHasText = actualFrame?.data.data.content.text.trim().length;
  const isFrameSelected = typeof selectedFrameId !== "undefined";
  const isTextSelected = isFrameSelected && selectedElement?.type === "text";
  const isCtaSelected = isFrameSelected && selectedElement?.type === "cta";

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
      <EditPanelModuleLayout label="Páginas">
        <EditPanelElementLayout
          label="1 Sentido"
          labelWrapper={(c) => (
            <DraggableFrameBtn type={dndFrameTypes.BTN_FRAME_START}>
              {c}
            </DraggableFrameBtn>
          )}
          btnOnClick={() => addFrameToStory("start")}
        />
        <EditPanelElementLayout
          label="Anterior y Siguiente"
          labelWrapper={(c) => (
            <DraggableFrameBtn type={dndFrameTypes.BTN_FRAME_BACK_NEXT}>
              {c}
            </DraggableFrameBtn>
          )}
          btnOnClick={() => addFrameToStory("back-and-next")}
        />
      </EditPanelModuleLayout>

      {frames.length > 0 && (
        <EditPanelModuleLayout label="Elementos">
          <EditPanelElementLayout
            label="Texto"
            labelWrapper={(c) => (
              <DraggableFrameBtn type={dndContentTypes.BTN_TEXT}>
                {c}
              </DraggableFrameBtn>
            )}
            btnDisabled={!!actualFrameHasText || !isFrameSelected}
            btnOnClick={() => addTextToSelectedFrame("texto de ejemplo")}
          />
        </EditPanelModuleLayout>
      )}

      {isTextSelected && (
        <EditPanelModuleLayout label="Editar texto">
          <EditPanelTextAreaLayout
            key={`${actualFrame?.id}-editText`}
            value={actualFrame?.data.data.content.text}
            onChange={addInputTextToSelectedFrame}
            autoFocus
            onFocus={(e) => e.target.selectionStart = e.target.selectionEnd = e.target.value.length}
          />
        </EditPanelModuleLayout>
      )}

      {isCtaSelected && (
        <EditPanelModuleLayout label="Editar botón">
          <pre>{JSON.stringify(selectedElement, null, 1)}</pre>
          <input
            type="text"
            value={selectedElement.data.text}
            onChange={(e) => addTextToSelectedCta(e.target.value)}
          />
          {selectedElement.data.action.type === "frame-change" && (
            <select
              value={selectedElement.data.action.data}
              onChange={console.log}
            >
              {!selectedElement.data.action.data.length && (
                <option key={"empty-ctaSelect"}>Seleccionar</option>
              )}
              {frames.map((frame, frameIndex) => {
                if (frame.id === actualFrame?.id) return null;
                return (
                  <option key={frame.id} value={frame.id}>
                    {frameIndex + 1} - {frame.data.data.content.text}
                  </option>
                );
              })}
            </select>
          )}
        </EditPanelModuleLayout>
      )}
    </>
  );
};
