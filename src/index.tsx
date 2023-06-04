import React from 'react'
import { createRoot } from 'react-dom/client'
const App = () => {

	return (
		<div>
			<p>Hi, it's working</p>
		</div>
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
