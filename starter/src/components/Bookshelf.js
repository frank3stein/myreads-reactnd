import React from "react";
import Book from "./Book";

const Bookshelf = ({ shelf, books, updateBooks }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => {
            return (
              <Book
                {...book}
                key={book.id}
                updateBooks={updateBooks}
                book={book}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Bookshelf;
