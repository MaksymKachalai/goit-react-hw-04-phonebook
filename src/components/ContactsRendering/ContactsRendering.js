import React, { Component } from "react";

export class ContactsRendering extends Component {
	render() {
		const { filterList, deleteContact } = this.props;
		return (
			<>
				<ul className="contactList">
					{filterList.map((contact) => (
						<li
							key={contact.id}
							className="contactList__item">
							{contact.name} <span>{contact.number}</span>
							<button
								type="button"
								onClick={() => deleteContact(contact.id)}>
								Delete
							</button>
						</li>
					))}
				</ul>
			</>
		);
	}
}
