import type { ChangeEventHandler, FC } from "react";
import { useStoryEdit } from "./StoryEditContext";
import { DraggableFrameBtn } from "./drags/DraggableFrameBtn";
import { dndContentTypes, dndFrameTypes } from "@/constants/dnd";
import {
  EditPanelElementLayout,
  EditPanelInputLayout,
  EditPanelModuleLayout,
  EditPanelTextAreaLayout,
  EditPanelSelectLayout,
} from "@/components/isomorphic";

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
    addFrameChangeToSelectedCta,
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

  type ChangeSelectaEvent = ChangeEventHandler<HTMLSelectElement>;
  const onChangeFrameChangeSelect: ChangeSelectaEvent = (e) => {
    addFrameChangeToSelectedCta(e.target.value);
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
          />
        </EditPanelModuleLayout>
      )}

      {isCtaSelected && (
        <EditPanelModuleLayout label="Editar botón">
          <EditPanelInputLayout
            key={`${selectedElement.data.id}-editTextCta`}
            type="text"
            value={selectedElement.data.text}
            onChange={(e) => addTextToSelectedCta(e.currentTarget.value)}
          />

          {selectedElement.data.action.type === "frame-change" && (
            <EditPanelSelectLayout
              value={selectedElement.data.action.data}
              onChange={onChangeFrameChangeSelect}
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
            </EditPanelSelectLayout>
          )}
        </EditPanelModuleLayout>
      )}
    </>
  );
};
