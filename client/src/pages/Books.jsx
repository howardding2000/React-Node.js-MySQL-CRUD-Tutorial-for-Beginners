import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useHttp from "../api/use-http";

const Books = () => {
  const [books, setBooks] = useState([]);
  const { isLoading, error, sendRequest } = useHttp();

  useEffect(() => {
    sendRequest({ url: "http://localhost:8800/books" }, setBooks);
  }, []);

  const deleteHandler = (id) => {
    sendRequest(
      {
        url: "http://localhost:8800/books/" + id,
        method: "DELETE",
      },
      console.log
    );
    window.location.reload();
  };

  return (
    <div>
      <h1>Book Shop</h1>
      <div className='books'>
        {isLoading && "Books Loading..."}
        {!isLoading && error}
        {!isLoading &&
          !error &&
          books.map((book) => (
            <div className='book' key={book.id}>
              {book.cover && <img src={book.cover} alt='' />}
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span>{book.price}</span>
              <button className='delete' onClick={() => deleteHandler(book.id)}>
                Delete
              </button>
              <button className='update'>
                <Link to={`/update/${book.id}`} state={{ book }}>
                  Update
                </Link>
              </button>
            </div>
          ))}
      </div>
      <button>
        <Link to='/add'>Add new book</Link>
      </button>
    </div>
  );
};

export default Books;
