"use client";

import { type FC, type MouseEvent } from "react";
import type { ICta } from "@/types";
import { useSwipe } from "@/hooks/useSwipe";
import { Button } from "@/components/isomorphic";

type Props = {
  cta: ICta;
  onBtnClick: (cta: ICta) => (e?: MouseEvent<HTMLButtonElement>) => void;
};

export const StartCta: FC<Props> = ({ cta, onBtnClick }) => {
  useSwipe({
    onSwipeLeft: () => {
      onBtnClick(cta)();
    },
    deps: [cta.id],
  });

  return (
    <Button
      onClick={onBtnClick(cta)}
      variant="primary"
    >
      {cta.text}
    </Button>
  );
};