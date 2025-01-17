import type { MouseEventHandler, MouseEvent, FC, ReactNode } from "react";
import type { ICta, IFrame, IFrameContent } from "@/types";
import { Text } from "@/components/isomorphic";
import { StartCta } from "./StartCta";
import { BackAndNextCta } from "./BackAndNextCta";
import { RadioChoiceCta } from "./RadioChoiceCta";
import styles from "./StoryFrame.module.css";

type Props = {
  frame: IFrame;
  dispatchText?: (id: string, text: IFrameContent["text"]) => void;
  dispatchCta: (id: string, cta: ICta) => void;
  textWrapper?: (children: ReactNode) => ReactNode;
};

export const StoryFrame: FC<Props> = ({
  frame: {
    id,
    data: {
      type,
      data,
    },
  },
  dispatchText,
  dispatchCta,
  textWrapper = (c: ReactNode) => c,
}) => {
  const onTextClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    dispatchText?.(id, data.content.text);
  };

  const onBtnClick = (cta: ICta) => {
    return (e?: MouseEvent) => {
      e?.preventDefault();
      e?.stopPropagation();
      dispatchCta(id, cta);
    };
  };

  const renderText = (
    <div className={styles.content}>
      <div className={styles.content_bars} />
      <div className={styles.content_scroll}>
        <Text onClick={onTextClick}>{data.content.text}</Text>
      </div>
    </div>
  );

  return (
    <div key={id} className={styles.story}>
      {textWrapper(renderText)}

      <div className={styles.ctas}>
        {type === "start" && (
          <StartCta cta={data.cta} onBtnClick={onBtnClick} />
        )}
        {type === "back-and-next" && (
          <BackAndNextCta cta={data.cta} onBtnClick={onBtnClick} />
        )}
        {type === "radio-choice" && (
          <RadioChoiceCta cta={data.cta} onBtnClick={onBtnClick} />
        )}
      </div>
    </div>
  );
};
