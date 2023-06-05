import React from 'react';
import { MessageType } from '../types/messages';
import { LoadingDots } from './loading';
import { SWRILp } from './text';

export const ChatbotMessage = (props: {
	message: MessageType,
	// is_responding: boolean
}) => {
	const { message } = props;

	const messageClass = message.bot ? 'swril-message-bot' : 'swril-message-user';

	return (
		<div className={`swril-message ${messageClass}`}>
			{message.bot ? <img className="swril-bot-icon" src={`${process.env.CDN_URL}/static/swrilie.png`} alt="swrilie" /> :
			<span className="material-symbols-outlined swril-account-icon">account_circle</span>	}
			<div>
				{message.service && (<>
					<SWRILp>{message.service.title}</SWRILp>
					<SWRILp>Address: {message.service.address}</SWRILp>
					<SWRILp>Phone: {message.service.number}</SWRILp>
					<SWRILp>Website: <a target='_blank' href={message.service.link}>{message.service.link}</a></SWRILp>
				</>)}
				{message.text && (
					message.text.split('\n').map((paragraph, i) => {
						return (
							<SWRILp key={i}>{paragraph}</SWRILp>
						)
					})
				)}
				{message.loading && (
					<LoadingDots />
				)}
			</div>
		</div>
	)
}