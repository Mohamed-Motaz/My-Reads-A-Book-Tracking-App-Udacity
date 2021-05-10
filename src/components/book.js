import React, { Component } from "react";
import ShelfSelect from "./shelfSelect";

class Book extends Component {
  state = {};

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
    console.log("this is the received book", this.props);
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: this.generateImageLink(),
            }}
          ></div>
          <ShelfSelect
            handleChangeCurrentBookState={
              this.props.handleChangeCurrentBookState
            }
            book={this.props}
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
        <div className="book-title">{this.props.data.title}</div>
        <div className="book-authors">{this.generateAuthorNames()}</div>
      </div>
    );
  }
}

export default Book;
