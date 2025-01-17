import type { IDndFrameTypes } from "@/types";
import { IDndContentTypes } from "@/types/IDnd";

export const dndFrameTypes: Record<string, IDndFrameTypes> = {
  BTN_FRAME_START: "btnFrame--start",
  BTN_FRAME_BACK_NEXT: "btnFrame--back-and-next",
  BTN_FRAME_RADIO_CHOICE: "btnFrame--radio-choice",
};

export const dndContentTypes: Record<string, IDndContentTypes> = {
  BTN_TEXT: "btnContent--text",
};
