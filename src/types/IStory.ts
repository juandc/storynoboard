import type { IFrame } from "./IFrame";

export type IStory = {
  id: string;
  type: "story";
  data: {
    name: string;
    description: string;
    characters?: unknown[];
    frames: IFrame[];
  }
};

export type IStoryApi = {
  data: IStory;
  error: string | undefined;
};
