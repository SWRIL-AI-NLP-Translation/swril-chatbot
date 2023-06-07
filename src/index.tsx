import React from 'react'
import './styles/styles.scss'
import { Chatbot } from './chatbot'
import { Swrilie } from './components/swrilie'
import { DataContextType } from './types/context'
import { createRoot } from 'react-dom/client'
import { DataContext, generateDataValue, getDataContextValue } from './contexts/data'
import { useData } from './hooks/data'

const App = (): JSX.Element => {
	const [state, setState] = React.useState<'Open' | 'Closed' | 'Opening' | 'Closing'>('Open')
	const [getData, setData] = useData<DataContextType>(getDataContextValue())
	const containerOpenClass = state === 'Open' || state === 'Opening' ? 'swril-chatbot-container-open' : 'swril-chatbot-container-closed'

	const dataValue = generateDataValue(getData, setData)

	const close = (): void => {
		setState('Closing')
		setTimeout(() => {
			setState('Closed')
		}, 500)
	}

	const open = (): void => {
		setState('Opening')
		setTimeout(() => {
			setState('Open')
		}, 800)
	}

	return (
		<DataContext.Provider value={dataValue}>
			<div className={ `swril-chatbot-container ${ containerOpenClass }` } onClick={ state === 'Closed' ? open : undefined }>
				{state === 'Open' ? <Chatbot close={() => close()} /> : <Swrilie />}
			</div>
		</DataContext.Provider>
	)
}

const container = document.getElementById('swril-chatbot-div')
if (!container) {
	console.error('swril-chatbot-div not found, make sure to include it in your html like this: \n'
	+ '<div id="swril-chatbot-div"></div>')
} else {
	const root = createRoot(container) 
	root.render(<App />)
}
