import { type ReactNode } from "react";

import type { Book } from "../../types/book.ts";

import { Link } from "react-router";

import MingcuteRightFill from "../../icons/MingcuteRightFill.tsx";

import styles from "./BookItem.module.css";

type Props = {
  book: Book;
};

export default function BookItem({ book }: Props): ReactNode {
  return (
    <Link to={`/book/${book.id}`}>
      <li className={styles["book-item"]}>
        {book.cover && (
          <img
            src={book.cover}
            alt={`the picture of the book - ${book.title}`}
          />
        )}
        <div className={styles.data}>
          <div className={styles.title}>Title : {book.title}</div>
          <p>Description : {book.desc}</p>
          <div>
            <span>Price : {book.price}$</span>
            <span>
              more details <MingcuteRightFill />
            </span>
          </div>
        </div>
      </li>
    </Link>
  );
}
