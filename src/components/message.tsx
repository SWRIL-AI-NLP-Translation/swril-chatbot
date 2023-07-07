import React from 'react'
import { MessageType } from '../types/messages'
import { LoadingDots } from './loading'
import { SWRILp } from './text'
import { MessageFeedback } from './messageFeedback'
import { FeedbackType } from '../types/feedback'

export const ChatbotMessage = (props: {
	message: MessageType,
	openFeedbackModel: (feedback: FeedbackType) => void	
}): JSX.Element => {
	const { message } = props
	const feedbackUsed = message.positiveFeedback !== undefined
	const [feedbackDisplayed, setFeedbackDisplayed] = React.useState(false)
	const feedbackEnabled = !message.loading && message.bot && !(message.id === 'Initial')
	const messageClass = message.bot ? 'swril-message-bot' : 'swril-message-user'
	const link = message.service ? message.service.link.includes('http') ? message.service.link : `http://${message.service.link}` : ''
	const onMouseEnter = (): void => {
		if (feedbackEnabled && !feedbackUsed) setFeedbackDisplayed(true)
	}
	const onMouseLeave = (): void => {
		if (feedbackEnabled && !feedbackUsed) setFeedbackDisplayed(false)
	}

	return (
		<div 
			className={`swril-message ${messageClass}`}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
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
			</div>
			{feedbackEnabled && (
				<MessageFeedback feedbackDisplayed={feedbackDisplayed || feedbackUsed} message={message} openFeedbackModel={props.openFeedbackModel}/>
			)}
		</div>
	)
}
