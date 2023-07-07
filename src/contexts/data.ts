import React from 'react'
import { DataContextType } from '../types/context'
import { Cookies } from '../modules/cookies'
import { getPostalCode } from '../modules/postalCode'
import { MessageType, defaultMessages } from '../types/messages'
import { getLanguage } from '../modules/language'

export const getDataContextValue = (): DataContextType => {
	return {
		postalCode: getPostalCode(),
		language: getLanguage() ?? 'Auto Detect',
		searchRadius: parseInt(Cookies.get('swril-search-radius') ?? '15'),
		messages: [...defaultMessages],
	}
}

interface DataValueType {
	getData: () => DataContextType,
	setData: (newData: DataContextType) => void;
	addData: (newData: Partial<DataContextType>) => void;
	addMessage: (message: MessageType) => void;
}

export const DataContext = React.createContext<DataValueType>({
	getData: () => getDataContextValue(),
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setData: (newData: DataContextType) => (void 0),
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	addData: (newData: Partial<DataContextType>) => (void 0),
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	addMessage: (message: MessageType) => (void 0),
})

export const generateDataValue = (
	getData: () => DataContextType,
	setData: (newData: DataContextType) => void,
): DataValueType => {
	const newSetData = (newData: DataContextType): void => {
		Cookies.set('swril-postal-code', newData.postalCode??'')
		Cookies.set('swril-language', newData.language??'')
		Cookies.set('swril-search-radius', newData.searchRadius?.toString()??'')
		setData(newData)
	}
	return {
		getData,
		setData: newSetData,
		addData: (newData: Partial<DataContextType>) => {
			newSetData({ ...getData(), ...newData })
		},
		addMessage: (message: MessageType) => {
			const newMessages = [...getData().messages]
			if (newMessages[newMessages.length -1]?.loading) newMessages.pop()
			newMessages.push(message)
			setData({ ...getData(), messages: newMessages })
		},
	}
}

