/**
 * 技能效果ID
 */
export interface iEffectInfo{
	root:{
		Effect:Effect[]
		ParamType:ParamType[]
	}
}
export interface ParamType{
	id: number;
	params: string;
	desc: string;
}
export interface Effect{
	id: number;
	argsNum: number;
	info: string;
}