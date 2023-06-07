import { ServiceType } from './chatResponse'

// type MessageContentType = 'Text' | 'Service'

export type MessageType = {
	text?: string;
	service?: ServiceType;
	bot?: boolean;
	id: number;
	loading?: boolean;
}

export const defaultMessage: MessageType = {
	text: 'My name is swrilie. \n How may I help you?',
	bot: true,
	id: 0,
}
