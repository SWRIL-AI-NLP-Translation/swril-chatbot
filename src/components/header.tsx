import React from 'react'
import { SWRILh1 } from './text'

export const ChatbotHeader = ({ close, openSettings }: {
	close: () => void;
	openSettings: () => void;
}): JSX.Element => {
	return (
		<header className="swril-chatbot-header">
			<span 
				className="material-symbols-outlined swril-settings-button"
				onClick={openSettings}>settings</span>
			<span 
				className="material-symbols-outlined swril-close-button" 
				onClick={close}>remove</span>
		</header>
	)
}
