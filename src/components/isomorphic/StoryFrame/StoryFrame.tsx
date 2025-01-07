import { type MouseEventHandler, type FC } from "react";
import type { ICta, IFrame, IFrameContent } from "@/types";
import { Button, Text } from "@/components/isomorphic";
import styles from "./StoryFrame.module.css";

type Props = {
  frame: IFrame;
  dispatchText?: (id: string, text: IFrameContent["text"]) => void;
  dispatchCta: (id: string, cta: ICta) => void;
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
}) => {
  const onTextClick: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    dispatchText?.(id, data.content.text);
  };

  const onBtnClick = (cta: ICta): MouseEventHandler<HTMLButtonElement> => {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatchCta(id, cta);
    };
  };

  return (
    <div key={id} className={styles.story}>
      <div className={styles.content}>
        <div className={styles.content_bars} />
        <div className={styles.content_scroll}>
          <Text onClick={onTextClick}>{data.content.text}</Text>
        </div>
      </div>

      <div className={styles.ctas}>
        {type === "start" && (
          <Button
            onClick={onBtnClick(data.cta)}
            variant="primary"
          >
            Empezar
          </Button>
        )}
        {type === "back-and-next" && (
          <>
            <Button
              onClick={onBtnClick(data.cta.back)}
              variant="secondary"
            >
              Atrás
            </Button>
            <Button
              onClick={onBtnClick(data.cta.next)}
              variant="secondary"
            >
              Continuar
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
