"use client";

import { useState, type FC, type MouseEventHandler } from "react";
import type { ICta } from "@/types";
import { Button } from "@/components/isomorphic";
import styles from "./StoryFrame.module.css";

type Props = {
  cta: ICta[];
  onBtnClick: (cta: ICta) => MouseEventHandler<HTMLButtonElement>;
};

export const RadioChoiceCta: FC<Props> = ({ cta: ctas, onBtnClick }) => {
  const [isOpen, setIsOpen] = useState(false);

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