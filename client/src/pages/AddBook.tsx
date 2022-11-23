import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../api/use-http";

const AddBook = () => {
  const { isLoading, error, sendRequest } = useHttp();

  const titleRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const coverRef = useRef();

  const navigate = useNavigate();
  const addBookHandler = (e) => {
    e.preventDefault();

    const book = {
      title: titleRef.current.value,
      desc: descRef.current.value,
      price: priceRef.current.value,
      cover: coverRef.current.value,
    };

    console.log(`books: ${book}`);
    sendRequest({
      url: "http://localhost:8800/books",
      method: "POST",
      data: book,
    }, console.log);
    navigate("/");
  };

  return (
    <form className='bookform' onSubmit={addBookHandler}>
      <h1>Add New Book</h1>
      <input
        type='text'
        ref={titleRef}
        placeholder='title'
        name='title'
        required
      />
      <input
        type='text'
        ref={descRef}
        placeholder='desc'
        name='desc'
        required
      />
      <input
        type='number'
        ref={priceRef}
        placeholder='price'
        name='price'
        required
      />
      <input type='text' ref={coverRef} placeholder='cover' name='cover' />
      <input type='submit' value='Add New Book' />
    </form>
  );
};

export default AddBook;
