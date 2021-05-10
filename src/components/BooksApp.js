import React, { Children } from "react";
import { Link } from "react-router-dom";
// import * as BooksAPI from './BooksAPI'
import { get, getAll, update } from "../BooksAPI";
import Shelf from "./shelf";

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  async componentDidMount() {
    const books = await getAll();
    const { currentlyReading, wantToRead, read } = this.prepareBooks(books);
    this.setState({ currentlyReading, books, wantToRead, read });
  }

  prepareBooks(books) {
    const currentlyReading = books.filter(
      (b) => b.shelf === "currentlyReading"
    );
    const wantToRead = books.filter((b) => b.shelf === "wantToRead");
    const read = books.filter((b) => b.shelf === "read");
    return { currentlyReading, wantToRead, read };
  }

  handleChangeCurrentBookState = async (book, event) => {
    console.log("in handle change current book state");
    book.shelf = event.target.value; //edit book in state
    const index = this.state.books.findIndex((b) => b.id === book.id);
    let newBooks = [...this.state.books];
    // console.log(index, newBooks, book);

    newBooks[index].shelf = event.target.value;
    this.setState({ books: newBooks });
    await update(book, event.target.value); //edit book in db
    window.location.reload();
  };

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf
                title="Currently Reading"
                books={this.state.currentlyReading}
                handleChangeCurrentBookState={this.handleChangeCurrentBookState}
              />
              <Shelf
                title="Want To Read"
                books={this.state.wantToRead}
                handleChangeCurrentBookState={this.handleChangeCurrentBookState}
              />
              <Shelf
                title="Read"
                books={this.state.read}
                handleChangeCurrentBookState={this.handleChangeCurrentBookState}
              />
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">
              <button>Add a book</button>
            </Link>
          </div>
        </div>
        )
      </div>
    );
  }
}

export default BooksApp;
