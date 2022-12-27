import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { ContactsEditor } from "../ContactsEditor/ContactsEditor";
import { ContactsRendering } from "../ContactsRendering/ContactsRendering";
import ContactsFilter from "../ContactsFilter/ContactsFilter";
import "./ContactsList.css";

export class ContactsList extends Component {
	state = {
		contacts: [
			{ id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
			{ id: "id-2", name: "Hermione Kline", number: "443-89-12" },
			{ id: "id-3", name: "Eden Clements", number: "645-17-79" },
			{ id: "id-4", name: "Annie Copeland", number: "227-91-26" },
		],
		filter: "",
	};

	PropTypes = {
		filter: PropTypes.string,
		contacts: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
				number: PropTypes.string.isRequired,
			})
		),
	};

	componentDidUpdate(prevProps, prevState) {
		const currentContacts = this.state.contacts;
		const previousContacts = prevState.contacts;
		if (previousContacts !== currentContacts) {
			localStorage.setItem("contacts", JSON.stringify(currentContacts));
		}
	}

	componentDidMount() {
		const savedContacts = JSON.parse(localStorage.getItem("contacts"));
		if (savedContacts) {
			return this.setState({ contacts: savedContacts });
		}
	}

	addContact = ({ name, number }) => {
		const contact = {
			name,
			number,
			id: uuidv4(),
		};

		const isCreated = this.state.contacts.find(
			(contact) => contact.number === number
		);

		if (!isCreated) {
			return this.setState(({ contacts }) => ({
				contacts: [contact, ...contacts],
			}));
		}
		alert("Contact has already been created");
	};

	deleteContact = (id) => {
		this.setState((prevState) => ({
			contacts: prevState.contacts.filter((contact) => contact.id !== id),
		}));
	};

	changeFilter = (event) => {
		this.setState({ filter: event.currentTarget.value });
	};

	getFilteredContacts = () => {
		const { filter, contacts } = this.state;
		const normalizedFilter = filter.toLowerCase();
		return contacts.filter((contact) =>
			contact.name.toLowerCase().includes(normalizedFilter)
		);
	};

	render() {
		const filteredContacts = this.getFilteredContacts();
		return (
			<>
				<div className="phonebook-container">
					<div className="login-box">
						<h2>PhoneBook</h2>
						<ContactsEditor onSubmit={this.addContact} />
					</div>
					<div className="phonebook-box">
						<ContactsFilter
							value={this.state.filter}
							onChange={this.changeFilter}
						/>
						<ContactsRendering
							filterList={filteredContacts}
							deleteContact={this.deleteContact}
						/>
					</div>
				</div>
			</>
		);
	}
}
