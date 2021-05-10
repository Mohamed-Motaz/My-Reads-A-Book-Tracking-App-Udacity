import React, { Component } from "react";
class ShelfSelect extends Component {
  state = {
    value: "",
    book: {},
  };
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  componentDidUpdate() {
    //console.log(this.props, this.state);
    if (!this.state.book.shelf && this.props.book.shelf) {
      //book arrived from api call
      //console.log("this is the updated call\n\n\n\n\n");
      this.setState({
        value: this.props.book.shelf,
        book: this.props.book,
      });
    }
  }
  componentDidMount() {
    //console.log("in component did mount", this.props);

    if (this.props.book) {
      //console.log("in component did mount");
      this.setState({
        value: this.props.book.shelf,
        book: this.props.book,
      });
    }
  }

  render() {
    console.log("That is the final book place", this.state);
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
