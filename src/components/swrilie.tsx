import React from 'react'

export const Swrilie = (): JSX.Element => {
	return (
		<img 
			src={`${process.env.CDN_URL}/static/swrilie.png`} 
			className="swril-closed-icon" 
			alt="swrilie" 
		/>
	)
}
