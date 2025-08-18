import {type ReactNode, useEffect, useState,} from "react";

import {useParams} from "react-router";

import axios from "axios";

import type {Book} from "../../types/book.ts";

import styles from "./Book.module.css";

export default function Book(): ReactNode {
    const [book, setBook] = useState<Book | undefined>()
    
    const {id} = useParams()

    useEffect(() => {
        const fetchBook = async (): Promise<void> => {
            try {
                const res = await axios.get(`http://localhost:5000/books/${id}`);
                console.log(res.data)
                setBook(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchBook().then();
    }, [id]);

  return (
    <div className={styles.book}>
        <img src={book?.cover} alt=""/>
        <h3>Title : {book?.title}</h3>
        <p>Release date : {book?.releaseDate}</p>
        <p>Description : {book?.desc}</p>
        <p>Number of pages : {book?.pages}</p>
        <span>Price : {book?.price}$</span>
    </div>
  );
}
