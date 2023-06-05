import React, { ReactNode, CSSProperties } from 'react';


interface MyTextProps {
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
}

// Component that renders child text inside it
export const SWRILp = ({children, className, style} : MyTextProps) => {
	return (
		<p className={`swril-text ${className}`} style={style}>
		  	{children}
		</p>
	);
}
	
export const SWRILh1 = ({children, className, style} : MyTextProps) => {
	return (
		<h1 className={`swril-text ${className}`} style={style}>
		  	{children}
		</h1>
	);
}