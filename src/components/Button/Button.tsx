import { type PropsWithChildren, type ReactNode } from "react";

import styles from "./Button.module.css";

type Props = PropsWithChildren;

export default function Button({ children }: Props): ReactNode {
  return <button className={styles.button}>{children}</button>;
}
