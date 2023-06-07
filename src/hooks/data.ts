import React from 'react'

export const useData = <T>(initialValue: T): readonly [
	() => T,
	(newValue: T) => void,
] => {
	const [, internalSetData] = React.useState<T>(initialValue)
	const dataRef = React.useRef(initialValue)
  
	const getData = (): T => {
		return dataRef.current
	}

	const setData = (newValue: T): void => {
		internalSetData(newValue)
		dataRef.current = newValue
	}
  
	return [getData, setData] as const
}
