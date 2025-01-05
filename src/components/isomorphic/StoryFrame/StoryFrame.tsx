import { MouseEventHandler, type FC } from "react";
import type { IFrame } from "@/types";
import { Button, Text } from "@/components/isomorphic";
import styles from "./StoryFrame.module.css";

type Props = {
  frame: IFrame;
  changeFrame: (frameId: string) => void;
};

export const StoryFrame: FC<Props> = ({
  frame: {
    id,
    data: {
      type,
      data,
    },
  },
  changeFrame,
}) => {
  const onClick = (nextFrameId: string): MouseEventHandler<HTMLButtonElement> => {
    return (e) => {
      e.preventDefault();
      changeFrame(nextFrameId);
    };
  };

  return (
    <div key={id} className={styles.story}>
      <div className={styles.content}>
        <div className={styles.content_bars} />
        <div className={styles.content_scroll}>
          <Text>
            {data.content.text}
          </Text>
        </div>
      </div>

      <div className={styles.ctas}>
        {type === "start" && (
          <Button
            onClick={onClick(data.cta.action.data)}
            variant="primary"
          >
            Empezar
          </Button>
        )}
        {type === "back-and-next" && (
          <>
            <Button
              onClick={onClick(data.cta.back.action.data)}
              variant="secondary"
            >
              Atrás
            </Button>
            <Button
              onClick={onClick(data.cta.next.action.data)}
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
