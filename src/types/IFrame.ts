export type ICta = {
  text: string;
  action: {
    type: "frame-change";
    data: string;
  };
};

export type IFrameContent = {
  text: string;
  asset?: unknown;
};

export type IFrameContentTypes = keyof IFrameContent;

export type IFrameTypes = "start" | "back-and-next" | "radio-choice";

interface IBaseFrameData<T> {
  type: IFrameTypes;
  data: {
    content: IFrameContent;
    cta: T;
  };
}

export interface IStartFrame extends IBaseFrameData<ICta> {
  type: "start";
};

export interface IBackAndNextFrame extends IBaseFrameData<{
  back: ICta;
  next: ICta;
}> {
  type: "back-and-next";
}

export interface IRadioChoiceFrame extends IBaseFrameData<ICta[]> {
  type: "radio-choice";
}

export type IFrameData = IStartFrame | IBackAndNextFrame | IRadioChoiceFrame;

export type IFrame = {
  id: string;
  type: "frame";
  data: IFrameData;
};

export type IFramesDict = {
  [key: string]: IFrame;
};

export const examples: IFrame[] = [
  {
    id: "frame-1",
    type: "frame",
    data: {
      type: "start",
      data: {
        content: {
          text: "Hola, soy un frame de inicio",
        },
        cta: {
          text: "Empezar",
          action: {
            type: "frame-change",
            data: "frame-2",
          },
        },
      },
    },
  },
  {
    id: "frame-2",
    type: "frame",
    data: {
      type: "back-and-next",
      data: {
        content: {
          text: "Hola, soy un frame de back-and-next",
        },
        cta: {
          back: {
            text: "Atrás",
            action: {
              type: "frame-change",
              data: "frame-1",
            },
          },
          next: {
            text: "Continuar",
            action: {
              type: "frame-change",
              data: "frame-3",
            },
          },
        },
      },
    },
  },
  {
    id: "frame-3",
    type: "frame",
    data: {
      type: "radio-choice",
      data: {
        content: {
          text: "Hola, soy un frame de radio-choice",
        },
        cta: [
          {
            text: "Opción 1",
            action: {
              type: "frame-change",
              data: "frame-1",
            },
          },
          {
            text: "Opción 2",
            action: {
              type: "frame-change",
              data: "frame-2",
            },
          },
        ],
      },
    },
  },
];
