import React from 'react'
import { FeedbackType } from '../types/feedback'
import { GenericModal } from './genericModal'
import { SWRILp } from './text'
import { DataContext } from '../contexts/data'

export const FeedbackModal = ({ feedback, close }: {
	feedback: FeedbackType,
	close: () => void
}): JSX.Element => {
	const { addData, getData } = React.useContext(DataContext)
	const emoji = feedback.approve ? '👍' : '👎'
	const trySendFeedback = (): void => {
		const messages = getData().messages
		const messageIndex = messages.findIndex((message) => {
			return message.id === feedback.message.id
		})
		if (messageIndex === -1) throw new Error('Message not found')
		const newMessages = [...messages]
		newMessages[messageIndex] = {
			...feedback.message,
			positiveFeedback: feedback.approve
		}
		addData({ messages: newMessages })
		alert('Feedback sent!')
		close()
	}
	return (
		<GenericModal title={'Feedback'} close={close}>
			<SWRILp>Confirm {emoji} feedback for this message?</SWRILp>
			<div className="swril-feedback-confirmation">
				<button onClick={close}>Cancel</button>
				<button onClick={trySendFeedback}>Confirm</button>
			</div>
		</GenericModal>
	)
}
