import { type FormEvent, type ReactNode } from "react";

import axios from "axios";

import Button from "../../components/Button/Button.tsx";

import type { Book } from "../../types/book.ts";

import { useNavigate } from "react-router";

import { toast } from "react-toastify";

import styles from "./Add.module.css";

export default function Add(): ReactNode {
  const navigate = useNavigate();

  const handleSubmitForm = async (
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title");
    const releaseDate = formData.get("releaseDate");
    const desc = formData.get("desc");
    const pages = formData.get("pages");
    const price = formData.get("price");
    const cover = formData.get("cover");

    if (!title || !desc || !price || !cover || !releaseDate || !pages) {
      toast.error("Fill In The Fields");
      return;
    }

    const newBook = {
      title: title.toString(),
      releaseDate: releaseDate.toString(),
      desc: desc.toString(),
      pages: pages.toString(),
      price: Number(price),
      cover: cover.toString(),
    };

    try {
      handleSubmitBook(newBook).then();
      e.currentTarget.reset();
    } catch (err) {
      console.log("Error : ", err);
    }
  };

  const handleSubmitBook = async (book: Book): Promise<void> => {
    try {
      await axios.post("http://localhost:5000/books", book);
      toast.success("Book has been added successfully !");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.add}>
      <h2>Add A New Book</h2>

      <form onSubmit={handleSubmitForm}>
        <input type="text" name="title" placeholder="title" required />
        <input
          type="text"
          name="releaseDate"
          placeholder="releaseDate"
          required
        />
        <input type="text" name="cover" placeholder="cover" required />
        <input
          type="text"
          name="pages"
          placeholder="number of pages"
          required
        />
        <input type="number" name="price" placeholder="price" required />
        <textarea rows={3} name="desc" placeholder="desc" required />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
