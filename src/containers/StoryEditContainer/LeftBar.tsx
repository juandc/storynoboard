import { ChangeEventHandler, type FC } from "react";
import { useStoryEdit } from "./StoryEditContext";
import { DraggableFrameBtn } from "./drags/DraggableFrameBtn";
import { dndContentTypes, dndFrameTypes } from "@/constants/dnd";
import { EditPanelElementLayout, EditPanelModuleLayout, EditPanelTextAreaLayout } from "@/components/isomorphic";

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
      <EditPanelModuleLayout label="Páginas">
        <EditPanelElementLayout
          label="1 Sentido"
          labelWrapper={(c) => (
            <DraggableFrameBtn type={dndFrameTypes.BTN_FRAME_START}>
              {c}
            </DraggableFrameBtn>
          )}
          btnDisabled={!!actualFrameHasText}
          btnOnClick={() => addFrameToStory("start")}
        />
        <EditPanelElementLayout
          label="Anterior y Siguiente"
          labelWrapper={(c) => (
            <DraggableFrameBtn type={dndFrameTypes.BTN_FRAME_BACK_NEXT}>
              {c}
            </DraggableFrameBtn>
          )}
          btnDisabled={!!actualFrameHasText}
          btnOnClick={() => addFrameToStory("back-and-next")}
        />
      </EditPanelModuleLayout>

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

      {isFrameSelected && isTextSelected && (
        <EditPanelModuleLayout label="Editar texto">
          <EditPanelTextAreaLayout
            key={actualFrame?.id}
            value={actualFrame?.data.data.content.text}
            onChange={addInputTextToSelectedFrame}
            autoFocus
          />
        </EditPanelModuleLayout>
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
    </>
  );
};
