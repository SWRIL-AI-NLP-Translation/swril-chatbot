import React from 'react';
import { DataContext } from '../contexts/data';
import { ChatbotMessage } from './message';

export const MessagesContainer = () => {
	const { getData } = React.useContext(DataContext);
	const messages = getData().messages;
	const divRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		if (divRef.current) {
			divRef.current.scrollTop = divRef.current.scrollHeight;
		} 
	}, [messages]);
	return (
		<div 
			ref={divRef}
			className="swril-messages-container"
		>
			{messages.map((message, index) => {
				return (
					<ChatbotMessage key={index} message={message} />
				)
			})}
		</div>
	)
}