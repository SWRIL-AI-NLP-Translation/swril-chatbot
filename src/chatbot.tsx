import React from 'react'
import { ChatbotHeader } from './components/header'
import { ChatbotInput } from './components/input'
import { MessagesContainer } from './components/messages'
import { DataContext } from './contexts/data'
import { ChatbotInit } from './components/chatbotInit'
import { SettingsModal } from './components/settingsModal'
import { FeedbackType } from './types/feedback'
import { FeedbackModal } from './components/feedbackModal'

export const Chatbot = ({ close }: {close: () => void}): JSX.Element => {
	const { getData } = React.useContext(DataContext)
	const postalCodeSet = getData().postalCode !== undefined
	const [settingsOpen, setSettingsOpen] = React.useState(false)
	const [feedbackModalData, setFeedbackModalData] = React.useState<null|FeedbackType>(null)
	return (
		<>
			{settingsOpen && <SettingsModal 
				close={() => setSettingsOpen(false)} />}
			{feedbackModalData && <FeedbackModal 
				close={() => setFeedbackModalData(null)}
				feedback={feedbackModalData} />}
			<ChatbotHeader close={close} openSettings={() => setSettingsOpen(true)}/>
			{ postalCodeSet ?
				<div className={'swril-chatbot-body'}>
					<MessagesContainer openFeedbackModel={setFeedbackModalData}/>
					<ChatbotInput />
				</div>
				: <ChatbotInit />}
		</>
	)
}
