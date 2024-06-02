import React from 'react';
import PropTypes from 'prop-types';
import BookShelfChange from './BookShelfChange';

const Book = ({ book, shelf, onMove }) => (
    <li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks
                                ? book.imageLinks.thumbnail
                                : 'icons/book-placeholder.svg'
                            })`
                    }}
                />
                <BookShelfChange book={book} shelf={shelf} onMove={onMove} />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">
                {book.authors ? book.authors.join(', ') : 'Unknown Author'}
            </div>
        </div>
    </li>
);

Book.propTypes = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired,
    onMove: PropTypes.func.isRequired
};

export default Book;
