import React, { ReactNode } from 'react'
import { SWRILh2 } from './text'

export const GenericModal = ({ children, title, close }: {
	children: ReactNode,
	title: string,
	close: () => void
}): JSX.Element => {
	return (
		<div className='swril-modal-background'>
			<div className="swril-modal">
				<div className='swril-settings-header'>
					<SWRILh2>{title}</SWRILh2>
					<span 
						className='material-symbols-outlined swril-settings-close-button'
						onClick={close}	
					>close</span>
				</div>
				<>{children}</>
			</div>
		</div>
	)
}
