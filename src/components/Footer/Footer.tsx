import { type ReactNode } from "react";

import styles from "./Footer.module.css";

export default function Footer(): ReactNode {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span>Copyright &copy; {year}</span>
      <span>All rights reserved</span>
    </footer>
  );
}
