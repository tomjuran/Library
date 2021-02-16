import React, {Component} from 'react'
import EditableBook from './EditableBook';



class BookList extends Component {
  render() {
    const books = this.props.books.map(book => (
      <EditableBook
        key={book.id}
        id={book.id}
        title={book.title}
        author={book.author}
        description={book.description}
        onDeleteClick={this.props.onDeleteClick}
        onUpdateClick={this.props.onUpdateClick}
      ></EditableBook>
    ));
    return (
      <div>
        {books}
      </div>
    );
  }
}


export default BookList