import { type ComponentProps, type ReactNode } from "react";

import styles from "./Button.module.css";

import clsx from "clsx";

type Color = "primary" | "danger" | "secondary";

type Props = ComponentProps<"button"> & {
  color?: Color;
};

export default function Button({
  children,
  color = "primary",
  className,
  ...otherProps
}: Props): ReactNode {
  return (
    <button
      className={clsx(styles.button, styles[color], className)}
      {...otherProps}
    >
      {children}
    </button>
  );
}
