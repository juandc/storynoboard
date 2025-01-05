"use client";

import { type FC, useState } from "react";
import type { IFrame, IFramesDict } from "@/types";
import { StoryFrame } from "@/components/isomorphic/StoryFrame/StoryFrame";
import { useSwipe } from "@/hooks/useSwipe";

type Props = {
  framesDict: IFramesDict;
  firstFrameId: string;
};

export const StoryContainer: FC<Props> = ({ framesDict, firstFrameId }) => {
  const [actualFrame, setActualFrame] = useState<IFrame>(() => framesDict[firstFrameId]);

  const changeFrame = (frameId: string) => {
    setActualFrame(framesDict[frameId]);
  };

  useSwipe({
    onSwipeLeft: () => {
      if (actualFrame.data.type === "start") {
        changeFrame(actualFrame.data.data.cta.action.data);
      } else if (actualFrame.data.type === "back-and-next") {
        changeFrame(actualFrame.data.data.cta.next.action.data);
      }
    },
    onSwipeRight: () => {
      if (actualFrame.data.type === "back-and-next") {
        changeFrame(actualFrame.data.data.cta.back.action.data);
      }
    },
    deps: [actualFrame],
  });

  return (
    <StoryFrame frame={actualFrame} changeFrame={changeFrame} />
  );
};
