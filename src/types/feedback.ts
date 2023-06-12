import { MessageType } from './messages'

export interface FeedbackType {
	message: MessageType;
	approve: boolean;
}
