import React from 'react'

export const LoadingDots = () => {
	const [dots, setDots] = React.useState('.')

	React.useEffect(() => {
		const interval = setInterval(() => {
			setDots((prevDots) => {
				if (prevDots === '...') {
					return '.'
				} else {
					return prevDots + '.'
				}
			})
		}, 500)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return <p style={{width: '2rem', fontSize: '2rem'}}>{dots}</p>
}
