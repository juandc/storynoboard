import type { IBackAndNextFrame, IFrame, IFrameData, IStartFrame } from "@/types";

export const createEmptyFrame = (data: IFrameData): IFrame => ({
  id: `${Math.random()}`,
  type: "frame",
  data,
});

export const createEmptyStartFrame = (): IFrame => {
  const startFrameData: IStartFrame = {
    type: "start",
    data: {
      content: {
        text: "",
        asset: undefined,
      },
      cta: {
        text: "Texto de ejemplo",
        action: {
          type: "frame-change",
          data: "..."
        },
      },
    }
  };
  return createEmptyFrame(startFrameData);
};

export const createEmptyBackAndNextFrame = (): IFrame => {
  const backAndNextFrameData: IBackAndNextFrame = {
    type: "back-and-next",
    data: {
      content: {
        text: "",
        asset: undefined,
      },
      cta: {
        back: {
          text: "Texto de ejemplo",
          action: {
            type: "frame-change",
            data: "..."
          },
        },
        next: {
          text: "Texto de ejemplo",
          action: {
            type: "frame-change",
            data: "..."
          },
        },
      },
    }
  };
  return createEmptyFrame(backAndNextFrameData);
};

// TODO: should return type IFrame
export const editFrameText = (frame: IFrame, text: string) => ({
  ...frame,
  data: {
    ...frame.data,
    data: {
      ...frame.data.data,
      content: {
        ...frame.data.data.content,
        text,
      },
    },
  },
});

export const getFrameById = (frames: IFrame[], id: string): IFrame | undefined => (
  frames.find(frame => frame.id === id)
);

export const removeFrameById = (frames: IFrame[], id: string): IFrame[] => ([
  ...frames.filter(frame => frame.id !== id),
]);

export const replaceFrameById = (frames: IFrame[], id: string, newFrame: IFrame): IFrame[] => ([
  ...frames.map(frame => {
    if (frame.id !== id) return frame;
    return newFrame;
  }),
]);
