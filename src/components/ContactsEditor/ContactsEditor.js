import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ContactsEditor.css";

export class ContactsEditor extends Component {
	state = { name: "", number: "" };

	PropTypes = {
		name: PropTypes.string,
		number: PropTypes.string,
	};

	onInputChange = (event) => {
		const { name, value } = event.currentTarget;
		this.setState({ [name]: value });
	};

	onFormSubmit = (event) => {
		event.preventDefault();
		this.props.onSubmit(this.state);
	};

	render() {
		const { name, number } = this.state;
		return (
			<>
				<form
					onSubmit={this.onFormSubmit}
					className="w-full max-w-sm">
					<div className="user-box">
						<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
							<input
								type="text"
								name="name"
								placeholder="Name"
								pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
								title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
								required
								value={name}
								onChange={this.onInputChange}
							/>
						</label>
					</div>
					<div className="user-box">
						<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
							<input
								placeholder="Number"
								type="tel"
								name="number"
								value={number}
								onChange={this.onInputChange}
								pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
								title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
								required
							/>
						</label>
					</div>
					<button type="submit">Add contact</button>
				</form>
			</>
		);
	}
}
