import type { FC, ReactNode, PropsWithChildren, HTMLAttributes } from "react";
import styles from "./EditPanelLayout.module.css";

type EditPanelModuleLayoutProps = PropsWithChildren<{ label: string; }>;

export const EditPanelModuleLayout: FC<EditPanelModuleLayoutProps> = ({
  children,
  label,
}) => (
  <div className={styles.editPanelModule}>
    <p>{label}</p>
    {children}
  </div>
);

type EditPanelElementLayoutProps = {
  label: string;
  labelIsDraggable?: boolean;
  labelWrapper?: (children: ReactNode) => ReactNode;
  btnDisabled?: boolean;
  btnOnClick?: () => void;
};

export const EditPanelElementLayout: FC<EditPanelElementLayoutProps> = ({
  label,
  labelIsDraggable = true,
  labelWrapper = (c: ReactNode) => c,
  btnDisabled = false,
  btnOnClick,
}) => (
  <div
    className={`
      ${styles.editPanelElement}
      ${btnDisabled ? styles.editPanelElement__disabled : ""}
      ${labelIsDraggable ? styles.editPanelElement__draggable : ""}
    `}
  >
    {labelWrapper(<p>{label}</p>)}
    <button onClick={btnOnClick} disabled={btnDisabled}>+</button>
  </div>
);

type EditPanelTextAreaLayoutProps = {
  value: string | undefined;
} & HTMLAttributes<HTMLTextAreaElement>;

export const EditPanelTextAreaLayout: FC<EditPanelTextAreaLayoutProps> = ({
  value,
  className,
  ...props
}) => (
  <textarea
    {...props}
    value={value}
    className={`${styles.editPanelTextArea} ${className}`}
  />
);
