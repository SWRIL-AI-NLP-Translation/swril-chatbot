import React from 'react'
import { DataContext } from '../contexts/data'
import { languageMap } from '../modules/language'
import { sendMessage } from '../data/queries/chatResponse'

export const ChatbotInput = (): JSX.Element => {
	const { getData, addMessage } = React.useContext(DataContext)

	const [input, setInput] = React.useState<string>('')
	const [isRecording, setIsRecording] = React.useState<boolean>(false)
	const [recognition, setRecognition] = React.useState<SpeechRecognition | null>(null)
	const trySendMessage = async (): Promise<void> => {
		if (input.length > 0) {
			setInput('')
			const res = await sendMessage(input, getData(), addMessage)
			if (res.error) alert(res.error.message)
		}
	}

	const startRecording = (): void => {
		const newRecognition = new webkitSpeechRecognition()
		newRecognition.interimResults = true
		newRecognition.lang = languageMap[getData().language]
		newRecognition.continuous = true
		
		newRecognition.start()

		// Records spoken words
		newRecognition.onresult = (event: any) => {
			let transcript = ''
			for (let i = event.resultIndex; i < event.results.length; i++) {
				const result = event.results[i]
				if (result.isFinal) {
					transcript += result[0].transcript
				}
				setInput(transcript)
			}
		}
		setRecognition(newRecognition)
	}

	// Wrapper for recognition stop
	const stopRecording = (): void => {
		if (recognition) {
			recognition.stop()
			setRecognition(null)
		}
	}

	const startStopRecognition = (): void => {
		const startStopBtn: HTMLImageElement | null = document.querySelector('#microphone')
		// Changes color of button and activates speech API
		if (!isRecording) {
			startRecording()
			if (startStopBtn) {
				startStopBtn.style.backgroundColor = 'aquamarine'
			}
		} else {
			stopRecording()
			if (startStopBtn) {
				startStopBtn.style.backgroundColor = ''
			}
		}
		setIsRecording(!isRecording)
	}

	return (
		<div className={'swril-input-container'}>
			{/* <span 
				className="material-symbols-outlined swril-mic-button" 
				onClick={startStopRecognition}
				style={{ color: isRecording ? 'red' : '' }}
			>mic</span> */}
			<input
				type="text"
				className="swril-input-field"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') trySendMessage()
				}}
				placeholder='type a message'
			/>
			<span 
				className="material-symbols-outlined swril-send-button" 
				onClick={trySendMessage}>send</span>
		</div>
	)
}
