import React, { Component } from "react";
import PropTypes from "prop-types";
import ShelfSelect from "./shelfSelect";

class Book extends Component {
  state = {
    authorsNames: "",
    authors: [],
    imageLink: "",
  };

  componentDidMount() {
    console.log("this is it", this.props.data);
    console.log(Object.keys(this.props.data));
    if (this.props.data.shelf)
      console.log(
        "this is awesomeeeeee\n\n\n\n\n\n\n\n\n\n\n",
        this.props.data.shelf
      );
    let authorsNames = this.generateAuthorNames();
    let imageLink = this.generateImageLink();
    this.setState({ ...this.props.data, authorsNames, imageLink });
  }

  generateAuthorNames() {
    let authorsNames = "";
    if (this.props.data) {
      try {
        this.props.data.authors.forEach((element) => {
          authorsNames += element + " ";
        });
      } catch {
        authorsNames = "";
      }
    }

    return authorsNames;
  }

  generateImageLink() {
    try {
      return `url("${this.props.data.imageLinks.smallThumbnail}")`;
    } catch {
      return "url()";
    }
  }
  //handleChangeCurrentBookState;
  render() {
    console.log("this is the received book", this.props, this.state);
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: this.state.imageLink,
            }}
          ></div>
          <ShelfSelect
            handleChangeCurrentBookState={
              this.props.handleChangeCurrentBookState
            }
            book={this.state}
          />
          {/* <div className="book-shelf-changer">
            <select>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div> */}
        </div>
        <div className="book-title">{this.state.title}</div>
        <div className="book-authors">{this.state.authorsNames}</div>
      </div>
    );
  }
}

export default Book;
