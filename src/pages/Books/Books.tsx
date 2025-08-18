import { type ReactNode, useEffect, useState } from "react";

import BookItem from "../../components/BookItem/BookItem.tsx";

import type { Book } from "../../types/book.ts";

import axios from "axios";

import styles from "./Books.module.css";

export default function Books(): ReactNode {
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    const fetchAllBooks = async (): Promise<void> => {
      try {
        const res = await axios.get("http://localhost:5000/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllBooks().then();
  }, []);

  return (
    <div className={styles.books}>
      <h1>
        {books.length !== 0 && "All Books Are Here !"}
        {books.length === 0 && "There are no Books !"}
      </h1>
      <ul>
        {books.map((book) => (
          <BookItem book={book} key={book.id} />
        ))}
      </ul>
    </div>
  );
}
