import React, { useState } from "react";
import Book from "./Book";

const Bookshelf = ({ shelf, books, setBooks }) => {
  console.log(`${shelf} : `, books);
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            {
              /* console.log("Book inside bookshelf ", book); */
            }
            return (
              <Book {...book} key={book.id} setBooks={setBooks} book={book} />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;
