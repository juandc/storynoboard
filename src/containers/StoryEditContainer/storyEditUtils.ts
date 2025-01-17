import type { IBackAndNextFrame, ICta, IFrame, IFrameData, IRadioChoiceFrame, IStartFrame } from "@/types";

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
        id: `${Math.random()}`,
        text: "Empezar",
        action: {
          type: "frame-change",
          data: ""
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
          id: `${Math.random()}`,
          text: "Atrás",
          action: {
            type: "past-frame",
            data: undefined,
          },
        },
        next: {
          id: `${Math.random()}`,
          text: "Siguiente",
          action: {
            type: "frame-change",
            data: ""
          },
        },
      },
    }
  };
  return createEmptyFrame(backAndNextFrameData);
};

export const createEmptyRadioChoiceFrame = (): IFrame => {
  const backAndNextFrameData: IRadioChoiceFrame = {
    type: "radio-choice",
    data: {
      content: {
        text: "",
        asset: undefined,
      },
      cta: [
        ...[1,2,3].map((x: number): ICta => ({
          id: `${Math.random()}`,
          text: `Opción ${x}`,
          action: {
            type: "frame-change",
            data: "",
          },
        })),
      ],
    }
  };
  return createEmptyFrame(backAndNextFrameData);
};

export const getFrameById = (frames: IFrame[], id: string): IFrame | undefined => (
  frames.find(frame => frame.id === id)
);

export const removeFrameById = (frames: IFrame[], id: string): IFrame[] => ([
  ...frames.filter(frame => frame.id !== id),
]);

export const replaceFrameById = (frames: IFrame[], id: string, newFrame: IFrame): IFrame[] => ([
  ...frames.map(frame => frame.id !== id ? frame : newFrame),
]);


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

export const editStartFrameCta = (frame: IStartFrame, newCta: ICta): IStartFrame => ({
  ...frame,
  data: {
    ...frame.data,
    cta: {
      ...frame.data.cta,
      ...newCta,
    },
  },
});

export const editBackAndNextFrameCta = (frame: IBackAndNextFrame, newCta: ICta): IBackAndNextFrame => ({
  ...frame,
    data: {
    ...frame.data,
    cta: {
      next: newCta.id === frame.data.cta.next.id ? newCta : frame.data.cta.next,
      back: newCta.id === frame.data.cta.back.id ? newCta : frame.data.cta.back,
    },
  },
});

export const editFrameCta = (frame: IFrame, newCta: ICta): IFrame => {
  let frameData: IFrame["data"] = frame.data;
  if (frame.data.type === "start") {
    frameData = editStartFrameCta(frame.data, newCta);
  }
  if (frame.data.type === "back-and-next") {
    frameData = editBackAndNextFrameCta(frame.data, newCta);
  }
  return { ...frame, data: frameData };
};

export const addRadioChoiceFrameCta = (frame: IRadioChoiceFrame, newCta: ICta): IRadioChoiceFrame => {
  const newCtaList = [...frame.data.cta, newCta];
  return { ...frame, data: { ...frame.data, cta: newCtaList } };
};

export const removeRadioChoiceFrameCta = (frame: IRadioChoiceFrame, ctaId: string): IRadioChoiceFrame => {
  const newCtaList = frame.data.cta.filter(cta => cta.id !== ctaId);
  return {
    ...frame,
    data: { ...frame.data, cta: newCtaList },
  };
};
