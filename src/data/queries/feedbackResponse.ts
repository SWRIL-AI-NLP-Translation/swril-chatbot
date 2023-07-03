import { ChatResponseType } from '../../types/chatResponse'
import { DataResponse, DataResponseType } from '../../types/data'
import { graphql } from '../graphql'

export const FEEDBACK_RESPONSE = `
	mutation PostFeedback($data: FeedbackInput!) {
		postFeedback(data: $data)
	}
`


export const sendFeedback = async (
	response: ChatResponseType,
	prompt: string,
	positive: boolean,
): Promise<DataResponseType<null>> => {

	try {
		const res = await graphql.request<{ data: { postFeedback: boolean }}>(FEEDBACK_RESPONSE, {
			data: {
				response,
				prompt,
				positive,
				model: 'MONKEY'
			},
		})
		if (res.error) {
			return res
		}
		if (!res.data.data.postFeedback) {
			return DataResponse.fatal('Message too old to post feedback')
		}
		return DataResponse.success(null)
	} catch (e) {
		console.error(e)
		return DataResponse.fatal('Error')
	}
}
