"use client";

import { type FC, useState } from "react";
import type { ICta, IFrame, IFramesDict } from "@/types";
import { StoryFrame } from "@/components/isomorphic/StoryFrame/StoryFrame";
import { useSwipe } from "@/hooks/useSwipe";

type Props = {
  framesDict: IFramesDict;
  firstFrameId: string;
};

export const StoryContainer: FC<Props> = ({ framesDict, firstFrameId }) => {
  const [actualFrame, setActualFrame] = useState<IFrame>(() => framesDict[firstFrameId]);

  const dispatchCta = (id: string, cta: ICta) => {
    if (cta.action.type === "frame-change") {
      setActualFrame(framesDict[cta.action.data]);
    }
  };

  useSwipe({
    onSwipeLeft: () => {
      if (actualFrame.data.type === "start") {
        dispatchCta(actualFrame.id, actualFrame.data.data.cta);
      } else if (actualFrame.data.type === "back-and-next") {
        dispatchCta(actualFrame.id, actualFrame.data.data.cta.next);
      }
    },
    onSwipeRight: () => {
      if (actualFrame.data.type === "back-and-next") {
        dispatchCta(actualFrame.id, actualFrame.data.data.cta.back);
      }
    },
    deps: [actualFrame],
  });

  return (
    <StoryFrame frame={actualFrame} dispatchCta={dispatchCta} />
  );
};
