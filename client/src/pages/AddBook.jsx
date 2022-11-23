import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const titleRef = useRef();
  const descRef = useRef();
  const priceRef = useRef();
  const coverRef = useRef();

  const navigate = useNavigate();
  const addBookHandler = async (e) => {
    e.preventDefault();
    try {
      const book = {
        title: titleRef.current.value,
        desc: descRef.current.value,
        price: priceRef.current.value,
        cover: coverRef.current.value,
      };

      console.log(`books: ${book}`);
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
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
