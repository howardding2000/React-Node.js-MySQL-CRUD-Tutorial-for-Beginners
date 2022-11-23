import axios from "axios";
import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UpdateBook = () => {
  const titleRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const coverRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const { book } = location.state;
  const bookId = location.pathname.split("/")[2];

  const updateBookHandler = async (e) => {
    e.preventDefault();
    try {
      const updatedBook = {
        title: titleRef.current.value,
        desc: descRef.current.value,
        price: priceRef.current.value,
        cover: coverRef.current.value,
      };

      console.log(`books: ${book}`);
      await axios.put("http://localhost:8800/books/" + bookId, updatedBook);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
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
