import {
  type Dispatch,
  type SetStateAction,
  type FC,
  type PropsWithChildren,
  createContext,
  useState,
  useContext,
} from "react";
import type { ICta, IFrame, IFrameContent, IFrameTypes, IStory } from "@/types";
import { transformStoryToFramesDict } from "@/services/getStory";
import {
  createEmptyBackAndNextFrame,
  createEmptyStartFrame,
  getFrameById,
  removeFrameById,
  replaceFrameById,
  editFrameText,
  editFrameCta,
} from "./storyEditUtils";

type SelectedElement = {
  type: "text";
  data: IFrameContent["text"];
} | {
  type: "cta";
  data: ICta;
};

type SelectionState = {
  frameId: string | undefined;
  element: SelectedElement | undefined;
};

const initialSelectionState = { frameId: undefined, element: undefined };

type StoryEditState = {
  editingStory: IStory;
  selection: SelectionState;
  setSelection: Dispatch<SetStateAction<SelectionState>>;
  actualFrame: IFrame | undefined;
  resetFrame: () => void;
  addFrameToStory: (type: IFrameTypes, index?: number) => void;
  removeFrameFromStory: (frameId: string) => void;
  addTextToFrame: (frameId: string, text: string, ifEmpty?: boolean) => void;
  addTextToSelectedFrame: (text: string) => void;
  addTextToSelectedCta: (text: string) => void;
  addFrameChangeToCta: (frameId: string, ctaId: string, newPointingFrameId: string) => void;
  addFrameChangeToSelectedCta: (newPointingFrameId: string) => void;
};

export const StoryEditContext = createContext<StoryEditState | undefined>(undefined);

type Props = PropsWithChildren<{ story: IStory; }>;

export const StoryEditProvider: FC<Props> = ({ children, story }) => {
  const [editingStory, setEditingStory] = useState<IStory>(story);
  const [selection, setSelection] = useState<SelectionState>(initialSelectionState); // TODO: use only 1 source of truth, use id refs to edittingStory instead fo copying the content

  const framesDict = transformStoryToFramesDict(editingStory);
  const actualFrame = selection.frameId ? framesDict[selection.frameId] : undefined;

  const resetFrame = () => {
    setSelection(initialSelectionState);
  };

  const addFrameToStory = (type: IFrameTypes, index?: number) => {
    let newFrame: IFrame | undefined = undefined;
    if (type === "start") newFrame = createEmptyStartFrame();
    if (type === "back-and-next") newFrame = createEmptyBackAndNextFrame();
    if (newFrame) {
      setEditingStory(prev => {
        const newFrames: IFrame[] = prev.data.frames;
        if (typeof index === "undefined") index = newFrames.length;
        newFrames.splice(index, 0, newFrame);
        return {
          ...prev,
          data: {
            ...prev.data,
            frames: newFrames,
          }
        };
      });
      setSelection({ frameId: newFrame.id, element: undefined });
    }
  };

  const removeFrameFromStory = (frameId: string) => {
    setEditingStory(prev => ({
      ...prev,
      data: {
        ...prev.data,
        frames: removeFrameById(prev.data.frames, frameId),
      },
    }));
    resetFrame();
  };

  const addTextToFrame = (frameId: string, text: string, ifEmpty: boolean = false) => {
    setEditingStory(prev => {
      const frameToEdit = getFrameById(prev.data.frames, frameId);
      if (!frameToEdit) return prev;
      if (ifEmpty && frameToEdit.data.data.content.text.trim().length) return prev;
      return {
        ...prev,
        data: {
          ...prev.data,
          frames: replaceFrameById(
            prev.data.frames,
            frameId,
            editFrameText(frameToEdit, text) as IFrame // TODO: remove as
          ),
        },
      };
    });
  };

  const addTextToSelectedFrame = (text: string) => {
    if (selection.frameId && actualFrame) {
      addTextToFrame(selection.frameId, text);
      setSelection(prev => ({
        ...prev,
        element: {
          type: "text",
          data: actualFrame.data.data.content.text,
        },
      }));
    }
  };

  const addTextToCta = (frameId: string, ctaId: string, text: string) => {
    setEditingStory(prev => {
      const frameToEdit = getFrameById(prev.data.frames, frameId);
      if (!frameToEdit) return prev;
      const frameData = frameToEdit.data;

      if (frameData.type === "start") {
        const newCta: ICta = { ...frameData.data.cta, text };
        return {
          ...prev,
          data: {
            ...prev.data,
            frames: replaceFrameById(
              prev.data.frames,
              frameId,
              editFrameCta(frameToEdit, newCta)
            ),
          },
        };
      }
      if (frameData.type === "back-and-next") {
        const backId = frameData.data.cta.back.id;
        const nextId = frameData.data.cta.next.id;
        let newCta: ICta | undefined = undefined;
        if (ctaId === backId) newCta = frameData.data.cta.back;
        if (ctaId === nextId) newCta = frameData.data.cta.next;
        if (!newCta) return prev;
        newCta.text = text;
        return {
          ...prev,
          data: {
            ...prev.data,
            frames: replaceFrameById(
              prev.data.frames,
              frameId,
              editFrameCta(frameToEdit, newCta)
            ),
          },
        };
      }
      return prev;
    });
  };

  const addTextToSelectedCta = (text: string) => {
    if (selection.frameId && actualFrame && selection.element?.type === "cta") {
      const selectedElement: ICta = selection.element.data;
      addTextToCta(selection.frameId, selectedElement.id, text);
      setSelection(prev => ({
        ...prev,
        element: {
          type: "cta",
          data: {
            ...selectedElement,
            text,
          },
        },
      }));
    }
  };

  const addFrameChangeToCta = (frameId: string, ctaId: string, newPointingFrameId: string) => {
    setEditingStory(prev => {
      const frameToEdit = getFrameById(prev.data.frames, frameId);
      if (!frameToEdit) return prev;
      const frameData = frameToEdit.data;

      if (frameData.type === "start") {
        if (frameData.data.cta.action.type === "frame-change") {
          const newCta: ICta = {
            ...frameData.data.cta,
            action: {
              ...frameData.data.cta.action,
              data: newPointingFrameId,
            },
          };
          return {
            ...prev,
            data: {
              ...prev.data,
              frames: replaceFrameById(
                prev.data.frames,
                frameId,
                editFrameCta(frameToEdit, newCta)
              ),
            },
          };
        }
        console.warn("Only CTA action supported is frame-change");
        return prev;
      }
      if (frameData.type === "back-and-next") {
        const backId = frameData.data.cta.back.id;
        const nextId = frameData.data.cta.next.id;
        let newCta: ICta | undefined = undefined;
        if (ctaId === backId) newCta = frameData.data.cta.back;
        if (ctaId === nextId) newCta = frameData.data.cta.next;
        if (!newCta) return prev;
        if (newCta.action.type === "frame-change") {
          newCta.action.data = newPointingFrameId;
          return {
            ...prev,
            data: {
              ...prev.data,
              frames: replaceFrameById(
                prev.data.frames,
                frameId,
                editFrameCta(frameToEdit, newCta)
              ),
            },
          };
        }
        console.warn("Only CTA action supported is frame-change");
        return prev;
      }
      console.warn("Only CTA types supported are start and back-and-next");
      return prev;
    });
  };

  const addFrameChangeToSelectedCta = (newPointingFrameId: string) => {
    if (selection.frameId && actualFrame && selection.element?.type === "cta") {
      const selectedElement: ICta = selection.element.data;
      addFrameChangeToCta(selection.frameId, selectedElement.id, newPointingFrameId);
      setSelection(prev => ({
        ...prev,
        element: {
          type: "cta",
          data: {
            ...selectedElement,
            action: {
              type: "frame-change",
              data: newPointingFrameId,
            },
          },
        },
      }));
    }
  };

  const state: StoryEditState = {
    editingStory,
    selection,
    setSelection,
    actualFrame,
    resetFrame,
    addFrameToStory,
    removeFrameFromStory,
    addTextToFrame,
    addTextToSelectedFrame,
    addTextToSelectedCta,
    addFrameChangeToCta,
    addFrameChangeToSelectedCta,
  };

  return (
    <StoryEditContext.Provider value={state}>
      {children}
    </StoryEditContext.Provider>
  );
};

export const useStoryEdit = () => {
  const context = useContext(StoryEditContext);
  if (!context) {
    throw new Error("useStoryEdit must be used within a StoryEditProvider");
  }
  return context;
};
