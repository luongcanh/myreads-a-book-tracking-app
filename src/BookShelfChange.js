import React, { Component } from 'react';

class BookShelfChange extends Component {
    state = { value: this.props.shelf };

    handleOnChange = event => {
        const { value } = event.target;
        this.setState({ value });
        this.props.onMove(this.props.book, value);
    };

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.state.value} onChange={this.handleOnChange}>
                    <option value="moveTo" disabled>
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

export default BookShelfChange;
