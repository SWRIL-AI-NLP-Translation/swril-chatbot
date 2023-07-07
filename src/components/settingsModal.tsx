import React from 'react'
import { DataContext } from '../contexts/data'
import { SWRILp } from './text'
import { validatePostalCode } from '../modules/postalCode'
import { LanguageType, languages } from '../types/languages'
import { GenericModal } from './genericModal'

export const SettingsModal = ({ close }: {close: () => void}): JSX.Element => {
	const { getData, addData } = React.useContext(DataContext)

	const { postalCode, searchRadius, language } = getData()
	const handleSearchRadiusChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		searchRadiusChange(parseInt(e.target.value))
	}
	const searchRadiusChange = (newRadius: number): void => {
		if (isNaN(newRadius)) newRadius = 0
		if (newRadius < 0) newRadius = 0
		if (newRadius > 30) newRadius = 30
		addData({ searchRadius: newRadius })
	}
	const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		addData({ postalCode: e.target.value })
	}
	const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		addData({ language: e.target.value as LanguageType })
	}

	const validPostalCode = (postalCode ? validatePostalCode(postalCode) : false)

	const tryClose = (): void => {
		if (validPostalCode) close()
		else alert('Invalid postal code')
	}


	return (
		<GenericModal close={tryClose}>
			<div className='swril-settings-radius'>
				<SWRILp>Search Radius:</SWRILp>
				<div className='swril-number-input-container'>
					<button onClick={() => searchRadiusChange(searchRadius - 1)}>-</button>
					<input type='text' min='1' max='30' value={searchRadius} onInput={handleSearchRadiusChange}/>
					<button onClick={() => searchRadiusChange(searchRadius + 1)}>+</button>
				</div>
				<SWRILp>km</SWRILp>
				{/* <input type='range' min='1' max='30' value={searchRadius} onInput={handleSearchRadiusChange}/> */}
			</div>
			<div className='swril-settings-postal-code'>
				<SWRILp className={'swril-postal-code-label'}>Postal code: </SWRILp>
				<input type='text' 
					value={postalCode} 
					onChange={handlePostalCodeChange}
					placeholder='_ _ _'
				/>
			</div>
			<div className='swril-settings-language'>
				<SWRILp className={'swril-language-label'}>Language: </SWRILp>
				<select onChange={handleLanguageChange}>
					{languages.map((lang) => (
						<option 
							key={lang} 
							value={lang}
							selected={lang === language}
						>{lang}</option>
					))}
				</select>
			</div>
		</GenericModal>
	)
}
