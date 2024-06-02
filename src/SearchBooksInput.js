import React, { Component } from 'react';

class SearchBooksInput extends Component {
	state = { value: '', };

	handleOnChange = event => {
		const val = event.target.value;
		this.setState({ value: val }, () => {
			this.props.onSearch(val);
		});
	};

	render() {
		return (
			<div className="search-books-input-wrapper">
				<input
					type="text"
					value={this.state.value}
					placeholder="Search by title, author, or ISBN"
					onChange={this.handleOnChange}
					autoFocus
				/>
			</div>
		);
	}
}

export default SearchBooksInput;
