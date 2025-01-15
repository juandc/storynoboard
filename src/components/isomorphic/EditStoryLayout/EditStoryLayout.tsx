import {
  type FC,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  type MouseEventHandler,
  type ForwardedRef,
  forwardRef,
} from "react";
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
      <button onClick={onCloseClick}><span>+</span></button>
      {children}
    </div>
  );
};

type DroppableStoryAreaLayoutProps = {
  isOver?: boolean;
  canDrop?: boolean;
  isFirst?: boolean;
  isOnly?: boolean;
};

export const DroppableStoryAreaLayout = forwardRef(
  ({
    isOver,
    canDrop,
    isFirst,
    isOnly,
  }: DroppableStoryAreaLayoutProps, ref: ForwardedRef<HTMLDivElement>) => (
    <div
      ref={ref}
      className={`
        ${styles.droppableStory}
        ${isOver && styles.droppableStory__over}
        ${canDrop && styles.droppableStory__allowed}
        ${isFirst && styles.droppableStory__first}
        ${isOnly && styles.droppableStory__only}
      `}
    />
  )
);

DroppableStoryAreaLayout.displayName = "DroppableStoryAreaLayout";

type DroppableContentAreaLayoutProps = PropsWithChildren<{
  isOver?: boolean;
  canDrop?: boolean;
}>;

export const DroppableContentAreaLayout = forwardRef(
  ({
    children,
    isOver,
    canDrop,
  }: DroppableContentAreaLayoutProps, ref: ForwardedRef<HTMLDivElement>) => (
    <div
      ref={ref}
      className={`
        ${styles.droppableContent}
        ${isOver && styles.droppableContent__over}
        ${canDrop && styles.droppableContent__allowed}
      `}
    >{children}</div>
  )
);

DroppableContentAreaLayout.displayName = "DroppableContentAreaLayout";
