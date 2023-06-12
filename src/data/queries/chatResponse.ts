import { DataContextType } from '../../types/context'
import { DataResponse, DataResponseType } from '../../types/data'
import { ChatResponseType } from '../../types/chatResponse'
import { validatePostalCode } from '../../modules/postalCode'
import { MessageType } from '../../types/messages'
import { graphql } from '../graphql'
import { generateId } from '../../modules/id'

const CHAT_RESPONSE = `
	query GetChatResponse($data: ChatInput!) {
		getChatResponse(data: $data) {
			message
			services {
				title
				number
				link
				address
				distance
			}
		}
	}
`

export const sendMessage = async (
	input: string,
	data: DataContextType,
	addMessage: (message: MessageType) => void,
): Promise<DataResponseType<null>> => {
	addMessage({
		text: input,
		id: generateId(),
	})

	if (!data.postalCode) {
		return DataResponse.fatal('No postal code')
	}
	if (!validatePostalCode(data.postalCode)) {
		return DataResponse.fatal('Invalid postal code')
	}
	if (input.length === 0) {
		return DataResponse.fatal('Empty message')
	}

	addMessage({
		loading: true,
		bot: true,
		id: 'Loading',
	})

	try {
		const res = await graphql.request<{ data: { getChatResponse: ChatResponseType }}>(CHAT_RESPONSE, {
			data: {
				message: input,
				previousMessages: data.messages.filter((message) => !message.service && !(message.id === 'Initial')).map((message) => ({
					text: message.text ?? '',
					bot: message.bot,
					id: message.id,
				})),
				language: data.language,
				searchRadius: data.searchRadius,
				postal: data.postalCode,
				chatbotVersion: 'MONKEY'
			},
		})
		if (res.error) {
			return res
		}
		if (!res.data.data.getChatResponse) {
			return DataResponse.fatal('No response')
		}
		const chatResponse = res.data.data.getChatResponse

		addMessage({
			text: chatResponse.message,
			bot: true,
			id: generateId()
		})
		chatResponse.services.forEach((service) => {
			addMessage({
				service: service,
				bot: true,
				id: generateId()
			})
		})
		return DataResponse.success(null)
	} catch (e) {
		console.error(e)
		return DataResponse.fatal('Error')
	}
}
