export interface ChatResponseType {
	id: string;
	message?: string;
	service?: ServiceType;
}

export interface ServiceType {
	title: string;
	number: string;
	link: string;
	address: string;
	distance: string;
}
