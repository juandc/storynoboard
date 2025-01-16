"use client";

import { type FC, useState } from "react";
import type { ICta, IFrame, IFramesDict } from "@/types";
import { StoryFrame } from "@/components/isomorphic/StoryFrame/StoryFrame";

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

  return (
    <StoryFrame frame={actualFrame} dispatchCta={dispatchCta} />
  );
};
