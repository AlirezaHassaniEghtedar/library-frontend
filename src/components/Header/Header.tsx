import { type ReactNode } from "react";

import { Link, NavLink } from "react-router";

import clsx from "clsx";

import styles from "./Header.module.css";

type NavItem = {
  title: string;
  href: string;
};

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Add a New Book", href: "/add" },
];

export default function Header(): ReactNode {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Library
      </Link>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.title}>
              <NavLink
                to={item.href}
                className={({ isActive }) => clsx(isActive && styles.active)}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
