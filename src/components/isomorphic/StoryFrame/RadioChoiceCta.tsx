"use client";

import { useState, type FC, type MouseEvent } from "react";
import type { ICta } from "@/types";
import { useSwipe } from "@/hooks/useSwipe";
import { Button } from "@/components/isomorphic";
import styles from "./StoryFrame.module.css";

type Props = {
  cta: ICta[];
  onBtnClick: (cta: ICta) => (e?: MouseEvent<HTMLButtonElement>) => void;
};

export const RadioChoiceCta: FC<Props> = ({ cta: ctas, onBtnClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  useSwipe({
    onSwipeLeft: () => {
      setIsOpen(true);
    },
    onSwipeRight: () => {
      setIsOpen(false);
    },
    deps: [],
  });

  return (
    <div className={styles.ctas_radioChoice}>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          variant="secondary"
        >
          Ver opciones {/* TODO: should copy come from user / JSON ? */}
        </Button>
      )}

      {isOpen && ctas.map((cta) => (
        <Button
          key={cta.id}
          onClick={onBtnClick(cta)}
          variant="secondary"
        >
          {cta.text}
        </Button>
      ))}
    </div>
  );
};