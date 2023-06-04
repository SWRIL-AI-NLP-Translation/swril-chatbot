export const FEEDBACK_RESPONSE = `
	query GetFeedbackResponse($data: FeedbackInput!) {
		getFeedbackResponse(data: $data) {
            response
		}
	}
`;
