import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAll, search, update } from "../BooksAPI";
import Book from "./book";
class SearchPage extends Component {
  state = {
    searchInput: "",
    books: [],
    editedBooks: false,
  };

  handleInputChange = async (e) => {
    this.setState({ searchInput: e.target.value });
    let books = await search(e.target.value);
    // console.log("These are the books", books);
    if (!books || books.error) books = [];
    this.findBooksOnShelvesAndChangeTheirShelfInSearch();

    this.setState({ books });
  };
  handleChangeCurrentBookState = async (book, event) => {
    console.log("in handle change current book state");
    // console.log(book, event.target.value);
    book.shelf = event.target.value; //edit book in state
    const index = this.state.books.findIndex((b) => b.id === book.id);
    let newBooks = [...this.state.books];
    console.log(book, newBooks, index);
    newBooks[index].shelf = event.target.value;
    this.setState({ books: newBooks });
    console.log("About to await", book, event.target.value);
    await update(book, event.target.value); //edit book in db
    console.log(
      "DONE CALLINGGGGG UPDATEEEEEEEEEEEEEEE\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"
    );
  };

  findBooksOnShelvesAndChangeTheirShelfInSearch = async () => {
    let books = await getAll();
    let currentBooks = [...this.state.books];
    for (let i = 0; i < books.length; i++) {
      for (let j = 0; j < currentBooks.length; j++) {
        if (books[i].id === currentBooks[j].id) {
          console.log("innnnnn");
          currentBooks[j].shelf = books[i].shelf;
        }
      }
    }
    console.log("these are the updated ones");
    console.log(books, currentBooks);
    this.setState({ books: currentBooks, editedBooks: true });
  };
  componentDidUpdate() {
    console.log("in componentdidmount");
    if (!this.state.editedBooks && this.state.books.length > 0)
      this.findBooksOnShelvesAndChangeTheirShelfInSearch();
  }

  render() {
    // console.log("the state", this.state);
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search"></button>
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={this.state.searchInput}
              onChange={async (e) => {
                await this.handleInputChange(e);
              }}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => {
              console.log("this is the sent book", book);
              return (
                <li key={book.id}>
                  <Book
                    data={book}
                    handleChangeCurrentBookState={
                      this.handleChangeCurrentBookState
                    }
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;
