import React from 'react'
import { DataContext } from '../contexts/data'
import { SWRILh2, SWRILp } from './text'
import { validatePostalCode } from '../modules/postalCode'
import { LanguageType, languages } from '../types/languages'

export const SettingsModal = ({ close }: {close: () => void}): JSX.Element => {
	const { getData, addData } = React.useContext(DataContext)

	const { postalCode, searchRadius, language } = getData()
	const handleSearchRadiusChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		addData({ searchRadius: parseInt(e.target.value) })
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
		<div className='swril-settings-modal-background'>
			<div className='swril-settings-modal'>
				<div className='swril-settings-header'>
					<SWRILh2>Settings</SWRILh2>
					<span 
						className='material-symbols-outlined swril-settings-close-button'
						onClick={tryClose}	
					>close</span>
				</div>
				<div className='swril-settings-radius-slider'>
					<div>
						<span className='material-symbols-outlined'>public</span>
						<SWRILp className={'swril-search-radius-label'}>Search Radius: {searchRadius} km</SWRILp>
					</div>
					<input type='range' min='1' max='30' value={searchRadius} onInput={handleSearchRadiusChange}/>
				</div>
				<div className='swril-settings-postal-code'>
					<span className='material-symbols-outlined swril-settings-close-button'>distance</span>
					<SWRILp className={'swril-postal-code-label'}>Postal: </SWRILp>
					<input type='text' value={postalCode} onChange={handlePostalCodeChange}/>
				</div>
				<div className='swril-settings-language'>
					<span className='material-symbols-outlined swril-settings-close-button'>translate</span>
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
			</div>
		</div>
	)
}
