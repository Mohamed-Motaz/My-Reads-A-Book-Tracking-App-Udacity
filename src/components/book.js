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
    let authorsNames = this.generateAuthorNames();
    let imageLink = this.generateImageLink();
    this.setState({ ...this.props.data, authorsNames, imageLink });
  }

  generateAuthorNames() {
    let authorsNames = "";
    if (this.props.data)
      this.props.data.authors.forEach((element) => {
        authorsNames += element + " ";
      });
    return authorsNames;
  }

  generateImageLink() {
    return `url("${this.props.data.imageLinks.smallThumbnail}")`;
  }
  //handleChangeCurrentBookState;
  render() {
    console.log(this.props);
    console.log(this.state);
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
