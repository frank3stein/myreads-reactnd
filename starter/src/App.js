import "./App.css";
import { useEffect, useState, useCallback } from "react";
import { get, getAll, update, search } from "./BooksAPI";
import SearchPage from "./components/SearchPage";
import BookShelf from "./components/Bookshelf";
import { Link, Route, Routes } from "react-router-dom";

const sentenceToSnakeCase = (str) => {
  return str
    .split(" ")
    .map((element, index) => {
      element = element.toLowerCase();
      if (index === 0) {
        return element;
      }
      const letters = element.split("");
      letters[0] = letters[0].toUpperCase();
      return letters.join("");
    })
    .join("");
};

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [token, setToken] = useState(localStorage.token);
  const [categories, setCategories] = useState([
    "Currently Reading",
    "Want to read",
    "Read",
    "None",
  ]);

  // To update the App books state, I used useCallback in order only update the function if the books change.
  // Otherwise this function would be defined in each render. A small optimization.
  const updateBooks = useCallback(
    (book, id) => {
      const newBooks = books.filter((book) => id !== book.id);
      newBooks.push(book);
      window.localStorage.setItem("books", JSON.stringify(newBooks));
      setBooks(newBooks);
    },
    [books]
  );
  useEffect(() => {
    async function getAllBooks() {
      window.localStorage.getItem("books")
        ? setBooks(JSON.parse(window.localStorage.getItem("books")))
        : setBooks(await getAll());
    }
    getAllBooks();
  }, [token]);

  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {categories.map((shelf) => {
                    const filteredBooks = books.filter(
                      (book) => book.shelf === sentenceToSnakeCase(shelf)
                    );
                    return (
                      <BookShelf
                        shelf={shelf}
                        key={shelf}
                        books={filteredBooks}
                        updateBooks={updateBooks}
                      />
                    );
                  })}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <SearchPage
              showSearchPage={showSearchPage}
              setShowSearchpage={setShowSearchpage}
              updateBooks={updateBooks}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
