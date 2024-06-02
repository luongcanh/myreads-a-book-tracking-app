import React, { useState } from 'react';

const shelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Read' },
    { key: 'none', name: 'None' }
];

const BookShelfChange = ({ shelf, onMove, book }) => {
    const [value, setValue] = useState(shelf);

    const handleOnChange = (event) => {
        const value = event.target.value;
        setValue(value);
        onMove(book, value);
    };

    return (
        <div className="book-shelf-changer">
            <select value={value} onChange={handleOnChange}>
                <option value="moveTo" disabled>
                    Move to...
                </option>
                {shelves.map(shelf => (
                    <option key={shelf.key} value={shelf.key}>{shelf.name}</option>
                ))}
            </select>
        </div>
    );
};

export default BookShelfChange;
