import { DataContextType } from '../../types/context';
import { DataResponse, DataResponseType } from '../../types/data';
import { ChatResponseType } from '../../types/chatResponse';
import { validatePostalCode } from '../../modules/postalCode';
import { MessageType } from '../../types/messages';
import { graphql } from '../graphql';

const CHAT_RESPONSE = `
	query GetChatResponse($data: ChatInput!) {
		getChatResponse(data: $data) {
			response {
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
	}
`;

export const sendMessage = async (
	input: string,
	data: DataContextType,
	addMessage: (message: MessageType) => void,
): Promise<DataResponseType<null>> => {
	addMessage({
		text: input,
		id: data.messages.length,
	});

	if (!data.postalCode) {
		return DataResponse.fatal('No postal code');
	}
	if (!validatePostalCode(data.postalCode)) {
		return DataResponse.fatal('Invalid postal code');
	}
	if (input.length === 0) {
		return DataResponse.fatal('Empty message');
	}

	addMessage({
		loading: true,
		bot: true,
		id: -1,
	})

	try {
		const res = await graphql.request<{data:{getChatResponse:{response:ChatResponseType}}}>(CHAT_RESPONSE, {
			data: {
				message: input,
				previousMessages: data.messages,
				language: data.language,
				// TODO: USE INT WHEN CHANGED
				searchRadius: data.searchRadius.toString(),
				postal: data.postalCode,
			},
		});
		if (res.error) {
			return res
		}
		if (!res.data.data.getChatResponse) {
			return DataResponse.fatal('No response');
		}
		const chatResponse = res.data.data.getChatResponse.response;

		console.log(chatResponse);

		addMessage({
			text: chatResponse.message,
			bot: true,
			id: data.messages.length,
		});
		chatResponse.services.forEach((service) => {
			addMessage({
				service: service,
				bot: true,
				id: data.messages.length,
			});
		});
		return DataResponse.success(null);
	} catch (e) {
		console.error(e);
		return DataResponse.fatal('Error');
	}
}
