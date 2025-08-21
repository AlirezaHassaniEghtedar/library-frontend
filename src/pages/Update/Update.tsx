import { type FormEvent, type ReactNode, useEffect, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router";

import { toast } from "react-toastify";

import axios from "axios";

import type { Book } from "../../types/book.ts";

import Button from "../../components/Button/Button.tsx";

import MingcuteRightFill from "../../icons/MingcuteRightFill.tsx";

import styles from "./Update.module.css";

export default function Update(): ReactNode {
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  const [book, setBook] = useState<Book>();

  useEffect(() => {
    const handleFetchBook = async (): Promise<void> => {
      try {
        const res = await axios.get(`http://localhost:5000/books/${bookId}`);
        setBook(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    handleFetchBook().then();
  }, [bookId]);

  const navigate = useNavigate();

  const handleSubmitForm = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (!book) {
      return;
    }

    if (
      !book.title ||
      !book.desc ||
      !book.price ||
      !book.cover ||
      !book.releaseDate ||
      !book.pages
    ) {
      toast.error("Fill In The Fields");
      return;
    }

    try {
      handleUpdateBook(book).then();
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  const handleUpdateBook = async (book: Book): Promise<void> => {
    try {
      await axios.put(`http://localhost:5000/books/${bookId}`, book);
      toast.success("Book has been updated successfully !");
      navigate(`/book/${bookId}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (!book) {
    return (
      <div className={styles["book-not-found"]}>
        Not found the book
        <Button>
          <Link to="/">
            Go to home page
            <MingcuteRightFill />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.update}>
      <h2>Update the Book : {book.title}</h2>

      <img src={book.cover} alt={`picture of the book : ${book.title}`} />

      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={book?.title ?? ""}
          onChange={(e) =>
            setBook((old) => ({ ...old!, title: e.target.value }))
          }
          required
        />
        <input
          type="text"
          name="releaseDate"
          placeholder="releaseDate"
          value={book?.releaseDate ?? ""}
          onChange={(e) =>
            setBook((old) => ({ ...old!, releaseDate: e.target.value }))
          }
          required
        />
        <input
          type="text"
          name="cover"
          placeholder="cover"
          value={book?.cover ?? ""}
          onChange={(e) =>
            setBook((old) => ({ ...old!, cover: e.target.value }))
          }
          required
        />
        <input
          type="text"
          name="pages"
          placeholder="number of pages"
          value={book?.pages ?? ""}
          onChange={(e) =>
            setBook((old) => ({ ...old!, pages: e.target.value }))
          }
          required
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          value={book?.price ?? ""}
          onChange={(e) =>
            setBook((old) => ({ ...old!, price: e.target.valueAsNumber }))
          }
          required
        />
        <textarea
          rows={3}
          name="desc"
          placeholder="desc"
          value={book?.desc ?? ""}
          onChange={(e) =>
            setBook((old) => ({ ...old!, desc: e.target.value }))
          }
          required
        />

        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}
