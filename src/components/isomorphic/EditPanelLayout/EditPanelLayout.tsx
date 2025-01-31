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
  btnChildren?: ReactNode;
  btnDisabled?: boolean;
  btnOnClick?: () => void;
};

export const EditPanelElementLayout: FC<EditPanelElementLayoutProps> = ({
  label,
  labelIsDraggable = true,
  labelWrapper = (c: ReactNode) => c,
  btnChildren = "+",
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
    <button
      className="gradient-primary-animated"
      onClick={btnOnClick}
      disabled={btnDisabled}
    >{btnChildren}</button>
  </div>
);

type EditPanelTextAreaLayoutProps = {
  value: string | undefined;
  placeholder?: string;
} & HTMLAttributes<HTMLTextAreaElement>;

export const EditPanelTextAreaLayout: FC<EditPanelTextAreaLayoutProps> = ({
  value,
  className,
  placeholder,
  ...props
}) => (
  <textarea
    onFocus={(e) => e.target.selectionStart = e.target.selectionEnd = e.target.value.length}
    autoFocus
    {...props}
    value={value}
    placeholder={placeholder}
    className={`${styles.editPanelTextArea} ${className}`}
  />
);

type EditPanelInputLayoutProps = {
  value: string | undefined;
  type?: "text" | "number" | "password";
} & HTMLAttributes<HTMLInputElement>;

export const EditPanelInputLayout: FC<EditPanelInputLayoutProps> = ({
  value,
  type = "text",
  className,
  ...props
}) => (
  <input
    onFocus={(e) => e.target.selectionStart = e.target.selectionEnd = e.target.value.length}
    autoFocus
    type={type}
    {...props}
    value={value}
    className={`${styles.editPanelInput} ${className}`}
  />
);

type EditPanelSelectLayoutProps = PropsWithChildren<{
  value: string | undefined;
}> & HTMLAttributes<HTMLSelectElement>;

export const EditPanelSelectLayout: FC<EditPanelSelectLayoutProps> = ({
  value,
  className,
  ...props
}) => (
  <select
    {...props}
    value={value}
    className={`${styles.editPanelSelect} ${className}`}
  />
);
