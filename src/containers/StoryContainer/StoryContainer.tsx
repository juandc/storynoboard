"use client";

import { type FC, useState } from "react";
import type { ICta, IFrame, IFramesDict } from "@/types";
import { StoryFrame } from "@/components/isomorphic/StoryFrame/StoryFrame";

type Props = {
  framesDict: IFramesDict;
  firstFrameId: string;
};

export const StoryContainer: FC<Props> = ({ framesDict, firstFrameId }) => {
  const [framesHistory, setFramesHistory] = useState<string[]>([firstFrameId]);
  const [actualFrame, setActualFrame] = useState<IFrame>(() => framesDict[firstFrameId]);

  const addFrameToHistory = (frameId: string) => {
    setFramesHistory((prev) => [...prev, frameId]);
  }

  const dispatchCta = (id: string, cta: ICta) => {
    if (cta.action.type === "frame-change") {
      addFrameToHistory(actualFrame.id);
      setActualFrame(framesDict[cta.action.data]);
    } else if (cta.action.type === "past-frame") {
      const lastFrameId = framesHistory[framesHistory.length - 1];
      setFramesHistory((prev) => prev.slice(0, -1));
      setActualFrame(framesDict[lastFrameId]);
    }
  };

  return (
    <StoryFrame frame={actualFrame} dispatchCta={dispatchCta} />
  );
};
