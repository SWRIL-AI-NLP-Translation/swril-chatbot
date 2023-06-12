import React from 'react'
import { MessageType } from '../types/messages'
import { LoadingDots } from './loading'
import { SWRILp } from './text'
import { MessageFeedback } from './messageFeedback'
import { FeedbackType } from '../types/feedback'

export const ChatbotMessage = (props: {
	message: MessageType,
	openFeedbackModel: (feedback: FeedbackType) => void	
	// is_responding: boolean
}): JSX.Element => {
	const { message } = props
	const messageClass = message.bot ? 'swril-message-bot' : 'swril-message-user'
	const link = message.service ? message.service.link.includes('http') ? message.service.link : `http://${message.service.link}` : ''

	return (
		<div className={`swril-message ${messageClass}`}>
			{message.bot ? 
				<img className="swril-bot-icon" src={`${process.env.CDN_URL}/static/swrilie.png`} alt="swrilie" /> :
				<span className="material-symbols-outlined swril-account-icon">account_circle</span>
			}
			<div className={'swril-message-box'}>
				{message.service && (<>
					<SWRILp>{message.service.title}</SWRILp>
					<SWRILp>Address: {message.service.address}</SWRILp>
					<SWRILp>Phone: {message.service.number}</SWRILp>
					<SWRILp>Website: <a target='_blank' rel="noreferrer" href={link}>{message.service.link}</a></SWRILp>
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

				{!message.loading && message.bot && !(message.id === 'Initial') && (
					<MessageFeedback message={message} openFeedbackModel={props.openFeedbackModel}/>
				)}
			</div>
		</div>
	)
}
