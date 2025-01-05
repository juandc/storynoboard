import { type FC, type HTMLAttributes, type PropsWithChildren } from "react";
import styles from "./Button.module.css";

type Props = HTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  variant = "primary",
  className,
  ...props
}) => {
  let btnVariant;
  if (variant === "primary") btnVariant = styles.Button__primary;
  if (variant === "secondary") btnVariant = styles.Button__secondary;
  const btnClasses = `${styles.Button} ${btnVariant} ${className}`;
  return (
    <button
      {...props}
      className={btnClasses}
    >
      {children}
    </button>
  );
};
