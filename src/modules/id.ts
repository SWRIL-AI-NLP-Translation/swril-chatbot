export const generateId = (): string => {
	return Math.round(Math.random() * 1000000000).toString()
}
