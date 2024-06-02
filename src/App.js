import React, { useState, useEffect } from 'react';
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

const App = () => {
	const [myBooks, setMyBooks] = useState([]);
	const [searchBooks, setSearchBooks] = useState([]);
	const [, setError] = useState(false);

	/**
	 * @description This effect runs only once after the initial render
	 */
	useEffect(() => {
		BooksAPI.getAll()
			.then(books => {
				setMyBooks(books);
			})
			.catch(err => {
				console.log(err);
				setError(true);
			});
	}, []);

	/***
	 * @description Move books between shelves
	 */
	const handleOnMoveBook = (book, shelf) => {
		BooksAPI.update(book, shelf).catch(err => {
			console.log(err);
			setError(true);
		});
		if (shelf === 'none') {
			setMyBooks(prevState => prevState.filter(b => b.id !== book.id));
		} else {
			const updatedBook = { ...book, shelf };
			setMyBooks(prevState => {
				const filteredBooks = prevState.filter(b => b.id !== book.id);
				return [...filteredBooks, updatedBook];
			});
		}
	};

	/**
	 * @description Search for books
	 */
	const handleOnSearchBook = (value) => {
		const searchQuery = value;
		if (searchQuery) {
			BooksAPI.search(searchQuery, 300).then((books) => {
				if (books.error) {
					// Handle invalid results
					setSearchBooks([]);
				} else {
					// Handle valid results
					setSearchBooks(books);
					syncBookShelf();
				}
			});
		} else {
			setSearchBooks([]);
		}
	}

	const syncBookShelf = () => {
		if (searchBooks.length > 0) {
			const updatedSearchBooks = searchBooks.map(searchBook => {
                const matchedBook = myBooks.find(myBook => myBook.id === searchBook.id);
                if (matchedBook) {
                    return { ...searchBook, shelf: matchedBook.shelf };
                }
                return searchBook;
            });
            setSearchBooks(updatedSearchBooks);
		}
	}

	/**
	 * @description Page refreshes
	 */
	const handleOnResetSearch = () => {
		setSearchBooks([]);
	};

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
							onMove={handleOnMoveBook}
						/>
					}
				/>
				<Route
					path="/search"
					element={
						<SearchBooks
							searchBooks={searchBooks}
							myBooks={myBooks}
							onSearch={handleOnSearchBook}
							onMove={handleOnMoveBook}
							onResetSearch={handleOnResetSearch}
						/>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
