import React from 'react'
import { SWRILh1 } from './text'

export const ChatbotHeader = ({ close }: {
	close: () => void;
}): JSX.Element => {
	return (
		<header className="swril-chatbot-header">
			<span className="material-symbols-outlined swril-close-button" onClick={close}>close_fullscreen</span>
			<SWRILh1 className="swril-chatbot-title">SWRIL Chatbot</SWRILh1>
			<span className="material-symbols-outlined swril-settings-button">settings</span>
		</header>
	)
}
