import React from 'react';

export const useData = <T>(initialValue: T) => {
	const [_data, internalSetData] = React.useState<T>(initialValue);
	const dataRef = React.useRef(initialValue);
  
	const getData = () => {
		return dataRef.current;
	};

	const setData = (newValue: T) => {
		internalSetData(newValue);
	  	dataRef.current = newValue;
	};
  
	return [getData, setData] as const;
};