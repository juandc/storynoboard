import { useState } from "react";
import type { ICta, IFrame, IFrameContent, IFrameTypes, IStory } from "@/types";
import { transformStoryToFramesDict } from "@/services/getStory";
import { createEmptyBackAndNextFrame, createEmptyStartFrame, editFrameText, getFrameById, removeFrameById, replaceFrameById } from "./storyEditUtils";

type Props = {
  story: IStory;
};

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

export const useStoryEdit = ({ story }: Props) => {
  const [editingStory, setEditingStory] = useState<IStory>(story);
  const [selection, setSelection] = useState<SelectionState>(initialSelectionState);

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
      if (ifEmpty && frameToEdit.data.data.content.text.length) return prev;
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

  return {
    editingStory,
    selection,
    setSelection,
    actualFrame,
    resetFrame,
    addFrameToStory,
    removeFrameFromStory,
    addTextToFrame,
    addTextToSelectedFrame,
  };
};
