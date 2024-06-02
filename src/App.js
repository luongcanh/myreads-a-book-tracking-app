import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import * as BooksAPI from './BookAPI';
import ListBooks from './ListBooks';
import './App.css';
import SearchBooks from './SearchBooks';

const bookshelves = [
	{ key: 'currentlyReading', name: 'Currently Reading' },
	{ key: 'wantToRead', name: 'Want to Read' },
	{ key: 'read', name: 'Read' }
];

class App extends Component {
	state = { myBooks: [], searchBooks: [], error: false };

	componentDidMount = () => {
		BooksAPI.getAll()
			.then(books => {
				this.setState({ myBooks: books });
			})
			.catch(err => {
				console.log(err);
				this.setState({ error: true });
			});
	};

	/***
	 * @description Move books between shelves
	 */
	handleOnMoveBook = (book, shelf) => {
		BooksAPI.update(book, shelf).catch(err => {
			console.log(err);
			this.setState({ error: true });
		});
		if (shelf === 'none') {
			this.setState(prevState => ({
				myBooks: prevState.myBooks.filter(b => b.id !== book.id)
			}));
		} else {
			book.shelf = shelf;
			this.setState(prevState => ({
				myBooks: prevState.myBooks.filter(b => b.id !== book.id).concat(book)
			}));
		}
	};

	/**
	 * @description Search for books
	 */
	handleOnSearchBook = (value) => {
		const searchQuery = value;
        if (searchQuery) {
            BooksAPI.search(searchQuery, 300).then((books)=>{
                if (books.error) {
					// Handle invalid results
					this.setState({ searchBooks: [] });
				} else {
					// Handle valid results
					this.setState({ searchBooks: books }, () => {
						this.syncBookShelf()
					});
                }
            });
        } else {
            this.setState({ searchBooks: [] });
        }
	}

	syncBookShelf = () => {
        const myBooks= this.state.myBooks;
        const searchBooks = this.state.searchBooks;
        if (searchBooks.length > 0) {
			myBooks.forEach((book) => {
				searchBooks.forEach((results) =>{
                        if (book.id === results.id) {
                            results.shelf = book.shelf
                        }
                    })
                })
        }
        this.setState({ searchBooks: searchBooks });
    }

	/**
	 * @description Page refreshes
	 */
	handleOnResetSearch = () => {
		this.setState({ searchBooks: [] });
	};

	render() {
		const { myBooks, searchBooks, error } = this.state;
		if (error) {
			return <div>Network error. Please try again later.</div>;
		}
		return (
			<div className="app">
				<Routes>
					<Route
						exact
						path="/"
						element={
							<ListBooks
								bookshelves={bookshelves}
								books={myBooks}
								onMove={this.handleOnMoveBook}
							/>
						}
					/>
					<Route
						path="/search"
						element={
							<SearchBooks
								searchBooks={searchBooks}
								myBooks={myBooks}
								onSearch={this.handleOnSearchBook}
								onMove={this.handleOnMoveBook}
								onResetSearch={this.handleOnResetSearch}
							/>
						}
					/>
				</Routes>
			</div>
		);
	}
}

export default App;
