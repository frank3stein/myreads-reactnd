import { update } from "../BooksAPI";

const Book = ({
  imageLinks = "",
  updateBooks,
  shelf,
  id,
  title,
  authors,
  book,
}) => {
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
            value={shelf ? shelf : "none"}
            // defaultValue={"none"}
            // if the default value is set, then select does not show the shelfs of the books in local library
            onChange={async (event) => {
              updateBooks({ ...book, shelf: event.target.value }, id);
              update(book, event.target.value);
            }}
          >
            <option value="notSelected" disabled>
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
