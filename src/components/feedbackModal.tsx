import React from 'react'
import { FeedbackType } from '../types/feedback'
import { GenericModal } from './genericModal'
import { SWRILp } from './text'
import { DataContext } from '../contexts/data'
import { sendFeedback } from '../data/queries/feedbackResponse'
import { ChatResponseType } from '../types/chatResponse'

export const FeedbackModal = ({ feedback, close }: {
	feedback: FeedbackType,
	close: () => void
}): JSX.Element => {
	const { addData, getData } = React.useContext(DataContext)
	const emoji = feedback.approve ? '👍' : '👎'
	const trySendFeedback = async (): Promise<void> => {
		const messages = getData().messages
		const messageIndex = messages.findIndex((message) => {
			return message.id === feedback.message.id
		})
		if (messageIndex === -1) throw new Error('Message not found')
		let prompt = ''
		for (let i=messageIndex; i>0; i--) {
			const userMsg = messages[i]
			if (!userMsg.bot) {
				prompt = userMsg.text ?? ''
				break
			}
		}
		const botMessage = messages[messageIndex]
		const response: ChatResponseType = {
			message: botMessage.text,
			service: botMessage.service,
			id: botMessage.id
		}

		const res = await sendFeedback(response, prompt, feedback.approve)
		if (res.error) {
			alert(res.error.message)
			return
		}
		alert('Feedback sent')

		const newMessages = [...messages]
		newMessages[messageIndex] = {
			...feedback.message,
			positiveFeedback: feedback.approve
		}
		addData({ messages: newMessages })
		close()
	}
	return (
		<GenericModal close={close}>
			<SWRILp>Confirm {emoji} feedback for this message?</SWRILp>
			<div className="swril-feedback-confirmation">
				<button onClick={close}>Cancel</button>
				<button onClick={trySendFeedback}>Confirm</button>
			</div>
		</GenericModal>
	)
}
