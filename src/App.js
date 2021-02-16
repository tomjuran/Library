import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react'
import BookList from './components/BookList';
import ToggleableBookForm from './components/ToggleBookForm';


class App extends Component {
  state = {
      books: []
}
componentDidMount() {
        fetch('http://localhost:8000/api/books/')
            .then(response => response.json())
            .then(data => {
                this.setState({books: data});
            });
    }

    createNewBook = (book) => {
    fetch('http://localhost:8000/api/books/', {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
    })
    .then(response => response.json())
    .then(book => {
        this.setState({books: this.state.books.concat([book])});
    });
}
updateBook = (newBook) => {
    fetch(`http://localhost:8000/api/books/${newBook.id}/`, {
        method: 'PUT',
        headers: {
                'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
    }).then(response => response.json())
    .then(newBook => {
        const newBooks = this.state.books.map(book => {
            if(book.id === newBook.id) {
                return Object.assign({}, newBook)
            } else {
                return book;
            }
        });
        this.setState({books: newBooks});
    });
  }
    deleteBook = (bookId) => {
    fetch(`http://localhost:8000/api/books/${bookId}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(() => {
        this.setState({books: this.state.books.filter(book => book.id !== bookId)})
    });
  }
  
render() {
    return (
        <main className="d-flex justify-content-center my-4">
            <div  className="col-5">
                <BookList
                    books={this.state.books}
                    onDeleteClick={this.deleteBook}
                    onUpdateClick={this.updateBook}
                />
                <ToggleableBookForm
                    onBookCreate={this.createNewBook}
                />
            </div>
        </main>
    )
  }
}

export default App
