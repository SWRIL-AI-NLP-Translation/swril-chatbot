import React from "react"
import { ChatbotHeader } from "./components/header"
import { ChatbotInput } from "./components/input"
import { MessagesContainer } from "./components/messages"
import { DataContext } from "./contexts/data"
import { ChatbotInit } from "./components/chatbotInit"

export const Chatbot = ({close}: {close: () => void}) => {
	const { getData } = React.useContext(DataContext);
	const postalCodeSet = getData().postalCode !== undefined;
	return (
		<>
			<ChatbotHeader close={close}/>
			{ postalCodeSet ?
			<div className={'swril-chatbot-body'}>
				<MessagesContainer />
				<ChatbotInput />
			</div>
			: <ChatbotInit />}
		</>
	)
}