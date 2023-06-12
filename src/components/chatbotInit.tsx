import { DataContext } from '../contexts/data'
import React from 'react'
import { validatePostalCode } from '../modules/postalCode'

export const ChatbotInit = (): JSX.Element => {
	const { getData, addData } = React.useContext(DataContext)
	const [newPostalCode, setNewPostalCode] = React.useState<string>(getData().postalCode || '')
	const submitPostalCode = (): void => {
		if (validatePostalCode(newPostalCode)){
			addData({ postalCode: newPostalCode })
		} else {
			alert('Invalid postal code')
		}
	}

	return (
		<div>
			<h3>To use this chatbot, enter the first 3 digits of your postal code:</h3>
			<input type='text' value={newPostalCode} onChange={(npc) => setNewPostalCode(npc.target.value)} />
			<button onClick={submitPostalCode}>Submit</button>
		</div>
	)
}
