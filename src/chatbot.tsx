import React from 'react'
import { ChatbotHeader } from './components/header'
import { ChatbotInput } from './components/input'
import { MessagesContainer } from './components/messages'
import { DataContext } from './contexts/data'
import { ChatbotInit } from './components/chatbotInit'
import { SettingsModal } from './components/settingsModal'

export const Chatbot = ({ close }: {close: () => void}): JSX.Element => {
	const { getData } = React.useContext(DataContext)
	const postalCodeSet = getData().postalCode !== undefined
	const [settingsOpen, setSettingsOpen] = React.useState(true)
	return (
		<>
			{settingsOpen && <SettingsModal close={() => setSettingsOpen(false)} />}
			<ChatbotHeader close={close} openSettings={() => setSettingsOpen(true)}/>
			{ postalCodeSet ?
				<div className={'swril-chatbot-body'}>
					<MessagesContainer />
					<ChatbotInput />
				</div>
				: <ChatbotInit />}
		</>
	)
}
