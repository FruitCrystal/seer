import {createContext} from "react";

export const filterContext = createContext<FilterContextProps|undefined>({keyword: 1, gender: undefined, IDAsce: true, type: 0,canCatch: false});

export interface FilterContextProps {
	keyword: string|number|undefined;
	gender:number|undefined;
	IDAsce:boolean;
	type:number;
	canCatch:boolean;
}