import React from "react";
import { DataContext } from "../contexts/data";
import { validatePostalCode } from "../modules/postalCode";
import { Cookies } from "../modules/cookies";

export const ChatbotInit = () => {
	const { getData, addData } = React.useContext(DataContext);
	const [newPostalCode, setNewPostalCode] = React.useState<string>(getData().postalCode || '');
	const submitPostalCode = () => {
		if (validatePostalCode(newPostalCode)){
			addData({postalCode: newPostalCode});
			Cookies.set('swril-postal-code', newPostalCode);
		} else {
			alert('Invalid postal code');
		}
	}

	return (
		<div>
			<h3>To use this chatbot, enter your postal code:</h3>
			<input type="text" value={newPostalCode} onChange={(npc) => setNewPostalCode(npc.target.value)} />
			<button onClick={submitPostalCode}>Submit</button>
		</div>
	)
}