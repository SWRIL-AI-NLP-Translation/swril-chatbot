import { Cookies } from './cookies'

export const validatePostalCode = (postalCode: string): boolean => {
	const regex = /^[a-zA-Z]\d[a-zA-Z]$/
	return regex.test(postalCode)
}

export const getPostalCode = (): string | undefined => {
	const postalCode = Cookies.get('swril-postal-code')
	return (postalCode && validatePostalCode(postalCode)) ? postalCode : undefined
}
