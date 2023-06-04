import React from "react";
import { DataContextType } from "../types/context";
import { Cookies } from "../modules/cookies";
import { getPostalCode } from "../modules/postalCode";
import { MessageType, defaultMessage } from "../types/messages";
import { getLanguage } from "../modules/language";

export const getDataContextValue = (): DataContextType => {
	return {
		postalCode: getPostalCode(),
		language: getLanguage() ?? 'English',
		searchRadius: parseInt(Cookies.get('swril-search-radius') ?? '50'),
		messages: [defaultMessage],
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
	setData: (newData: DataContextType) => { },
	addData: (newData: Partial<DataContextType>) => { },
	addMessage: (message: MessageType) => { },
})

export const generateDataValue = (
	getData: () => DataContextType,
	setData: (newData: DataContextType) => void,
): DataValueType => ({
	getData,
	setData,
	addData: (newData: Partial<DataContextType>) => {
		setData({ ...getData(), ...newData })
	},
	addMessage: (message: MessageType) => {
		const newMessages = [...getData().messages]
		if (newMessages[newMessages.length -1]?.loading) newMessages.pop()
		newMessages.push(message)
		setData({ ...getData(), messages: newMessages })
	},
})

