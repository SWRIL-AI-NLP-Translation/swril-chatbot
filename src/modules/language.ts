import { LanguageType, languages } from '../types/languages'
import { Cookies } from './cookies'

export const languageMap: {[K in LanguageType]: string} = {
	'Auto Detect': 'Auto Detect',
	Chinese: 'zh-cn',
	English: 'en',
	Afrikaans: 'af',
	Armenian: 'hy',
	Portuguese: 'pt',
	Urdu: 'ur',
	Spanish: 'es',
	French: 'fr',
	Arabic: 'ar',
	Polish: 'pl',
	Filipino: 'tl',
	Croatian: 'hr',
	Serbian: 'sr',
	Romanian: 'ro',
	German: 'de',
	Italian: 'it',
	Dutch: 'nl',
	Hindi: 'hi',
	Korean: 'ko',
	Japanese: 'ja',
	Persian: 'fa',
	Punjabi: 'pa',
	Gujarati: 'gu',
	Turkish: 'tr',
	Thai: 'th',
	Russian: 'ru',
	Amharic: 'am',
} as const

export const getLanguage = (): LanguageType => {
	const language = Cookies.get('swril-language')
	return (language && languages.includes(language as LanguageType)) ? language as LanguageType : 'Auto Detect'
}

