import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./book";

class Shelf extends Component {
  state = {
    title: "",
    books: [],
  };

  async componentDidMount() {
    this.setState({
      title: this.props.title,
      books: this.props.books,
    });
  }
  componentDidUpdate() {
    if (this.state.books !== this.props.books) {
      //data has arrived from server
      this.setState({ title: this.props.title, books: this.props.books });
    }
  }
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.state.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <Book
                  handleChangeCurrentBookState={
                    this.props.handleChangeCurrentBookState
                  }
                  data={book}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Shelf;

Shelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  handleChangeCurrentBookState: PropTypes.func.isRequired,
};
