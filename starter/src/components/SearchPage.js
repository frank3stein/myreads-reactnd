import React, { useState } from "react";
import { Link } from "react-router-dom";
import { search as searchAPI } from "../BooksAPI.js";
import Book from "./Book";

// const debounce = (func, wait) => {
//   let debounceTimer;
//   return function () {
//     const context = this,
//       args = arguments;
//     console.log("debounce: ", args);
//     clearTimeout(debounceTimer);
//     debounceTimer = setTimeout(() => func.apply(context, args), wait);
//   };
// };

const SearchPage = ({ updateBooks, books: localBooks }) => {
  const [search, setSearch] = useState("");
  const [searchBooks, setSearchBooks] = useState([]);
  const [error, setError] = useState(false);
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={search}
            onChange={async (event) => {
              if (event.target.value !== "") {
                setSearch(event.target.value);
              } else {
                setError("Please enter a search term");
                setSearch("");
                return;
              }
              const result = await searchAPI(event.target.value, 20);
              if (Array.isArray(result)) {
                setSearchBooks(result);
                setError(false);
              } else {
                setError(result.error);
              }
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        {error ? (
          <div style={{ color: "red" }}>{error.toUpperCase()}</div>
        ) : (
          <ol className="books-grid">
            {searchBooks !== []
              ? searchBooks.map((book) => {
                  const bookInLocalBooks = localBooks.find(
                    (localBook) => localBook.id === book.id
                  );
                  return (
                    <Book
                      {...book}
                      key={book.id}
                      shelf={
                        bookInLocalBooks
                          ? bookInLocalBooks.shelf
                          : // changed to notSelected from none, as none sets the select to no option selected
                            "notSelected"
                      }
                      updateBooks={updateBooks}
                      book={book}
                    />
                  );
                })
              : null}
          </ol>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
