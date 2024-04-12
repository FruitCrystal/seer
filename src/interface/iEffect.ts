/**
import { iItem } from './iItem';
 * 特殊效果描述,如中毒等异常,蒂朵的场地特效等其他魂印中会高亮提示的字眼
 * eg.{
                "id": 1,
                "kind": 2,
                "kinddes": "中毒",
                "icon": 1,
                "tab": 2,
                "desc": "处于该状态的精灵一定回合内每回合于对手出手流程开始直接扣除自身最大体力的1/8，伤害结算时若本回合再次进入中毒，则扣除的体力值翻倍"
            },
						{
                "id": 82,
                "kind": 1,
                "kinddes": "人鬼灵阵",
                "desc": "使对手全属性-1",
                "monster": 3720
            },
 */
						export interface iEffectDes{
							root:{
								item:effect_des[]
							}
						
							
						}
						export interface effect_des{
							id: number;
							kind?: number;
							/**
							 * @param kinddes 名称
							 */
							kinddes: string;
							icon?: number;
							tab?: number;
							desc: string;
							/**
							 * @param monster 持有该效果的精灵,异常状态等效果没有该词条
							 */
							monster?:string
						}

						/**
 * 精灵的魂印
 * {
                "Id": 709,
                "petId": 3396,
                "iconId": 684,
                "effectId": 994,
                "args": "1 1 50 50 3 1",
                "kind": "1 5 12",
                "tips": "天生免疫能力下降状态；|回合开始时若对手不处于能力下降状态且当回合自身选择使用技能，则使对手全属性-1；|回合开始时，若自身体力高于对手则当回合自身所有技能先制+1且造成的伤害提高50%；|登场后首次回合结束时，若自身体力低于登场首回合开始时的50%，则恢复自身最大体力的1/3并造成等量百分比伤害；后续回合结束时，若自身体力低于上次回合结束时的50%，则恢复自身最大体力的1/3并造成等量百分比伤害（boss无效）"
            },
 */

export interface iEffectIcon{

	root:{
		effect:effect_icon[]
	}
	
}

export interface effect_icon{
	Id: number;
	petId: number;
	iconId: number;
	effectId: number;
	/**
	 * 魂印描述
	 */
	tips: string;
}

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
	param?: string;
}