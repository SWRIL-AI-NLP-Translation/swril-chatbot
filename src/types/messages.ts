import { ServiceType } from './chatResponse'

// type MessageContentType = 'Text' | 'Service'

export type MessageType = {
	text?: string;
	service?: ServiceType;
	bot?: boolean;
	id: number | 'Initial' | 'Loading';
	loading?: boolean;
	positiveFeedback?: boolean;
}

export const defaultMessage: MessageType = {
	text: 'My name is swrilie. \n How may I help you?',
	bot: true,
	id: 'Initial',
}
