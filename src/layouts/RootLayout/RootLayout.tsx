import { type ReactNode } from "react";

import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import Toaster from "../../components/Toaster/Toaster.tsx";

import { Outlet } from "react-router";

import styles from "./RootLayout.module.css";

export default function RootLayout(): ReactNode {
  return (
    <div className={styles["root-layout"]}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
