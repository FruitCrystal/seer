/**
 * 技能效果ID
 */
export interface iEffectInfo{
	ParamType:ParamType
	Effect:Effect
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