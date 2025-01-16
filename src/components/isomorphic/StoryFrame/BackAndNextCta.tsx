"use client";

import { type FC, type MouseEvent } from "react";
import type { ICta } from "@/types";
import { useSwipe } from "@/hooks/useSwipe";
import { Button } from "@/components/isomorphic";

type Props = {
  cta: { back: ICta, next: ICta };
  onBtnClick: (cta: ICta) => (e?: MouseEvent<HTMLButtonElement>) => void;
};

export const BackAndNextCta: FC<Props> = ({ cta, onBtnClick }) => {
  useSwipe({
    onSwipeLeft: () => {
      onBtnClick(cta.next)();
    },
    onSwipeRight: () => {
      onBtnClick(cta.back)();
    },
    deps: [cta.back.id, cta.next.id],
  });

  return (
    <>
      <Button
        onClick={onBtnClick(cta.back)}
        variant="secondary"
      >
        {cta.back.text}
      </Button>
      <Button
        onClick={onBtnClick(cta.next)}
        variant="secondary"
      >
        {cta.next.text}
      </Button>
    </>
  );
};