import React, { Component } from "react";
class ShelfSelect extends Component {
  state = {
    value: "",
  };
  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    console.log("That is the final book place", this.props);
    if (this.props.book.data.shelf)
      console.log("found ittttttttt\n\n\n\n\n\n\n\n");
    return (
      <div className="book-shelf-changer">
        <select
          onChange={async (e) => {
            this.handleChange(e);
            await this.props.handleChangeCurrentBookState(
              this.props.book.data,
              e
            );
          }}
          value={
            this.props.book.data.shelf ? this.props.book.data.shelf : "none"
          }
        >
          <option value="move" disabled>
            Move to...
          </option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

export default ShelfSelect;
