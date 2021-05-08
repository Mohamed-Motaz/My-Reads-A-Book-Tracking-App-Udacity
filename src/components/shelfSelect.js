import React, { Component } from "react";
class ShelfSelect extends Component {
  state = {
    value: "",
    book: {},
  };

  handleChange(event) {
    console.log(this.state.book);
    this.setState({ value: event.target.value });
  }
  componentDidUpdate() {
    if (this.props.book && this.state.value !== this.props.book.shelf) {
      //book arrived from api call
      this.setState({
        value: this.props.book.shelf,
        book: this.props.book,
      });
    }
  }

  componentDidMount() {
    if (this.props.book) {
      this.setState({
        value: this.props.book.shelf,
        book: this.props.book,
      });
    }
  }

  render() {
    console.log(this.state.book);
    return (
      <div className="book-shelf-changer">
        <select
          onChange={async (e) => {
            this.handleChange(e);
            await this.props.handleChangeCurrentBookState(this.state.book, e);
          }}
          value={this.state.value}
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
