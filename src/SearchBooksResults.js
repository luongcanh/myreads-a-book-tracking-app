import React from 'react';
import Book from './Book';

const SearchBooksResults = props => {
	const { searchBooks, myBooks, onMove } = props;

	const updatedBooks = searchBooks.map(book => {
		myBooks.map(bookTemp => {
			if (bookTemp.id === book.id) {
				book.shelf = bookTemp.shelf;
			}
			return bookTemp;
		});
		return book;
	});

	return (
		<div className="search-books-results">
			<ol className="books-grid">
				{updatedBooks.map(book => (
					<Book key={book.id} book={book} shelf={book.shelf ? book.shelf : 'none'} onMove={onMove} />
				))}
			</ol>
		</div>
	);
};

export default SearchBooksResults;
