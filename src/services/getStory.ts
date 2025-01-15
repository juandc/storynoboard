import { HOST } from "@/env";
import type { IFramesDict, IStory, IStoryApi } from "@/types";

export const getStory = async () => {
  const res = await fetch(`${HOST}/first-mock.json`);
  const { data, error } = await res.json() as IStoryApi;
  if (typeof data !== "undefined") {
    return data;
  }
  throw new Error(error);
};

export const transformStoryToFramesDict = (story: IStory): IFramesDict => {
  const frameDict: IFramesDict = {};
  story.data.frames.forEach((frame) => {
    frameDict[frame.id] = frame;
  });
  return frameDict;
};
