import { ServiceType } from './chatResponse'

export type MessageType = {
	text?: string;
	service?: ServiceType;
	bot?: boolean;
	id: string;
	loading?: boolean;
	positiveFeedback?: boolean;
}

export const defaultMessages: MessageType[] = [{
	text: 'Hi, my name is swrilie.',
	bot: true,
	id: 'Initial',
}, {
	text: 'How may I help you today?',
	bot: true,
	id: 'Initial',
}]
