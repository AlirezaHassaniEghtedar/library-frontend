import { type ReactNode, useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router";

import { toast } from "react-toastify";

import type { Book } from "../../types/book.ts";

import axios from "axios";

import Button from "../../components/Button/Button.tsx";

import MingcuteDelete2Line from "../../icons/MingcuteDelete2Line.tsx";

import styles from "./Book.module.css";
import MingcuteRightFill from "../../icons/MingcuteRightFill.tsx";

export default function Book(): ReactNode {
  const [book, setBook] = useState<Book | undefined>();

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async (): Promise<void> => {
      try {
        const res = await axios.get(`http://localhost:5000/books/${id}`);
        setBook(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBook().then();
  }, [id]);

  const handleDeleteBook = async (): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5000/books/${id}`);
      toast.success("The book has been deleted successfully");
      navigate("/");
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
    <div className={styles.book}>
      <img src={book?.cover} alt="" />
      <h3>Title : {book?.title}</h3>
      <p>Release date : {book?.releaseDate}</p>
      <p>Description : {book?.desc}</p>
      <p>Number of pages : {book?.pages}</p>
      <span>Price : {book?.price}$</span>
      <Button
        color="danger"
        onClick={handleDeleteBook}
        className={styles.delete}
      >
        Delete This Book <MingcuteDelete2Line />
      </Button>
      <Button className={styles.update}>
        <Link to={`/update/${id}`}>
          Update This Book
          <MingcuteRightFill />
        </Link>
      </Button>
    </div>
  );
}
