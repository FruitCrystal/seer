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
	id: number;
	petid: number;
	iconid: number;
	effectid: number;
	/**
	 * 魂印描述
	 */
	tips: string;
}