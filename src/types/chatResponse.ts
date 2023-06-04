export interface ChatResponseType {
	message: string;
	services: ServiceType[];
}

export interface ServiceType {
	title: string;
	number: string;
	link: string;
	address: string;
	distance: string;
}