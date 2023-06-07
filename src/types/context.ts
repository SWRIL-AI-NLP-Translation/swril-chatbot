import { LanguageType } from './languages'
import { MessageType } from './messages'

export interface DataContextType {
	language: LanguageType
	postalCode?: string
	searchRadius: number
	messages: MessageType[]
}
