import { useEffect } from "react";

type Callbacks = {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
};

type Reqs = {
  deps: unknown[];
};

export const useSwipe = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  deps,
}: Callbacks & Reqs) => {
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    const checkHorizontal = () => {
      if (touchEndX < touchStartX) onSwipeLeft?.();
      else onSwipeRight?.();
    };
    const checkVertical = () => {
      if (touchEndY < touchStartY) onSwipeUp?.();
      else onSwipeDown?.();
    };
    const checkDirection = () => {
      const xDiff = touchEndX - touchStartX;
      const yDiff = touchEndY - touchStartY;
      if (Math.abs(xDiff) > Math.abs(yDiff)) checkHorizontal();
      else checkVertical();
    };

    const touchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    };
    const touchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      checkDirection();
    };

    document.addEventListener("touchstart", touchStart, { passive: false });
    document.addEventListener("touchend", touchEnd, { passive: false });

    return () => {
      document.removeEventListener("touchstart", touchStart);
      document.removeEventListener("touchend", touchEnd);
    };
  }, [...deps]); // eslint-disable-line react-hooks/exhaustive-deps
};
