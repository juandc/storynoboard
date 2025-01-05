import { type FC, type PropsWithChildren } from "react";
import styles from "./Text.module.css";

export const Text: FC<PropsWithChildren> = ({ children }) => {
  return <p className={styles.Text}>{children}</p>;
}
