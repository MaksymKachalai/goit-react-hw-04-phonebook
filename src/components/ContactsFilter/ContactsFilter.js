import React from "react";

const ContactsFilter = ({ value, onChange }) => (
	<label>
		<input
			type="text"
			placeholder="Search contacts"
			onChange={onChange}
			value={value}
		/>
	</label>
);

export default ContactsFilter;
