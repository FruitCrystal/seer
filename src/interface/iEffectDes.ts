/**
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