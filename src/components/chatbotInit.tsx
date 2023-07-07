import { DataContext } from '../contexts/data'
import React from 'react'
import { validatePostalCode } from '../modules/postalCode'
import { SWRILh2 } from './text'

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
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
			<SWRILh2>To use this chatbot, enter the first 3 digits of your postal code:</SWRILh2>
			<div style={{ margin: '1rem' }}>
				<input 
					style={{ width: '4rem', textAlign: 'center' }} 
					type='text' 
					value={newPostalCode} 
					onChange={(npc) => setNewPostalCode(npc.target.value)} 
					placeholder='_ _ _'
				/>
				<button onClick={submitPostalCode}>Submit</button>
			</div>
		</div>
	)
}
