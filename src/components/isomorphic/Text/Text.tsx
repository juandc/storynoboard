import type { HTMLAttributes, FC, PropsWithChildren } from "react";
import styles from "./Text.module.css";

type Props = PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>;

export const Text: FC<Props> = ({ children, ...props }) => {
  return <p className={styles.Text} {...props}>{children}</p>;
}
