import { useState } from "react";
import { update } from "../BooksAPI";

const Book = ({ imageLinks, setBooks, shelf, id, title, authors, book }) => {
  // console.log("Book ", imageLinks);
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url("${imageLinks.thumbnail}")`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={shelf}
            onChange={(event) => {
              // console.log("event ", event.target.value);
              // setSelectedShelf(event.target.value);
              setBooks({ ...book, shelf: event.target.value }, book.id);
              update(id, event.target.value);
            }}
          >
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  );
};

export default Book;
