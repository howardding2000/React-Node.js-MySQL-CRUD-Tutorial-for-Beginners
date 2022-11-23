import axios from "axios";
import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useHttp from "../api/use-http";
const UpdateBook = () => {
  const { isLoading, error, sendRequest } = useHttp();

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state;
  const bookId = location.pathname.split("/")[2];

  const updateBookHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedBook = {
      title: titleRef.current?.value,
      desc: descRef.current?.value,
      price: priceRef.current?.value,
      cover: coverRef.current?.value,
    };

    console.log(`books: ${book}`);
    sendRequest(
      {
        url: "http://localhost:8800/books/" + bookId,
        method: "PUT",
        data: updatedBook,
      },
      console.log
    );
    navigate("/");
  };

  return (
    <form className='bookform' onSubmit={updateBookHandler}>
      <h1>Update Book</h1>
      <input
        type='text'
        ref={titleRef}
        placeholder='title'
        defaultValue={book.title}
        name='title'
        required
      />
      <input
        type='text'
        ref={descRef}
        placeholder='desc'
        defaultValue={book.desc}
        name='desc'
        required
      />
      <input
        type='number'
        ref={priceRef}
        placeholder='price'
        defaultValue={book.price}
        name='price'
        required
      />
      <input
        type='text'
        ref={coverRef}
        placeholder='cover'
        defaultValue={book.cover}
        name='cover'
      />
      <input type='submit' value='Update Book' />
    </form>
  );
};

export default UpdateBook;
