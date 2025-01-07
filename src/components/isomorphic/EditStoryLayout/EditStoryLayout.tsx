import { type FC, type HTMLAttributes, type PropsWithChildren, type ReactNode, type MouseEventHandler, forwardRef, ForwardedRef } from "react";
import styles from "./EditStoryLayout.module.css";

type EditStoryLayoutProps = {
  top: ReactNode;
  left: ReactNode;
  board: ReactNode;
  boardOnClick?: MouseEventHandler<HTMLDivElement>;
};

export const EditStoryLayout: FC<EditStoryLayoutProps> = ({ top, left, board, boardOnClick }) => {
  return (
    <>
      <div className={styles.topbar}>
        {top}
      </div>
      <div className={styles.leftbar}>
        {left}
      </div>
      <div className={styles.board} onClick={boardOnClick}>
        {board}
      </div>
    </>
  );
};

type EditStoryFrameCardProps = PropsWithChildren<{
  active?: boolean;
  onClose?: () => void;
}> & HTMLAttributes<HTMLDivElement>;

export const EditStoryFrameCard: FC<EditStoryFrameCardProps> = ({
  children,
  active,
  onClick,
  onClose,
  ...props
}) => {
  const onCardClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClick?.(e);
  };
  const onCloseClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose?.();
  };
  const classes = `${styles.phonelikewrapper} ${active && styles.phonelikewrapper__active}`;
  return (
    <div className={classes} onClick={onCardClick} {...props}>
      <button onClick={onCloseClick}>X</button>
      {children}
    </div>
  );
};

type DroppableStoryAreaLayoutProps = {
  isOver?: boolean;
};

export const DroppableStoryAreaLayout = forwardRef(
  ({
    isOver,
  }: DroppableStoryAreaLayoutProps, ref: ForwardedRef<HTMLDivElement>) => (
    <div
      ref={ref}
      style={{
        border: isOver ? "1px solid yellow" : "none",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -56,
        height: 104,
      }}
    />
  )
);

DroppableStoryAreaLayout.displayName = "DroppableStoryAreaLayout";
