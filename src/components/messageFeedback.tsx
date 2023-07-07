import React from 'react'
import { MessageType } from '../types/messages'
import { FeedbackType } from '../types/feedback'

export const MessageFeedback = ({ openFeedbackModel, message, feedbackDisplayed }: {
	openFeedbackModel: (feedback: FeedbackType) => void,
	message: MessageType,
	feedbackDisplayed: boolean
}): JSX.Element => {
	const positiveFeedback = message.positiveFeedback
	const feedbackUpSelected = positiveFeedback === true
	const feedbackDownSelected = positiveFeedback === false
	const feedbackEnabled = !feedbackUpSelected && !feedbackDownSelected && feedbackDisplayed
	const feedbackUpClassName = feedbackUpSelected ? 'swril-feedback-up-button-selected' : feedbackEnabled ? 'swril-feedback-up-button-selectable' : ''
	const feedbackDownClassName = feedbackDownSelected ? 'swril-feedback-down-button-selected' : feedbackEnabled ? 'swril-feedback-down-button-selectable' : ''
	return (
		<div className="swril-message-feedback" style={{ visibility: feedbackDisplayed ? 'visible' : 'hidden' }}>
			<span 
				className={`material-symbols-outlined ${feedbackUpClassName}`}
				onClick={feedbackEnabled ? () => openFeedbackModel({ approve: true, message }):undefined}>thumb_up</span>
			<span 
				className={`material-symbols-outlined ${feedbackDownClassName}`} 
				onClick={feedbackEnabled ? () => openFeedbackModel({ approve: false, message }):undefined}>thumb_down</span>
		</div>
	)
}
