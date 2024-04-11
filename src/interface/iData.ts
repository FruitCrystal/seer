export let PROGRESS_MAP: Map<string, string> = new Map([
	['monsters', '宠物'],
	['moves', '技能'],
	['hide_moves', '隐藏技能'],
	['items', '物品'],
	['itemsTip', '物品提示'],
	['gems', '宝石'],
	['equip', '装备'],
	['effectDes', '特殊效果描述'],
	['effectInfo', '技能效果信息'],
	['effectIcon', '魂印信息'],
	['effectbuff', '场地buff'],
	['petbook', '精灵简单信息'],
	['skillTypes', '属性'],
	['suit', '套装效果'],
	['pet_skin', '精灵皮肤'],
	['ogre', '宝石']
]);

export const DescriptionMapping:{AbilityMapping:{[key:number]:string},[key:string]:{[key:number]:string}} = {
	AbilityMapping:{
		0:'攻击',
		1:'特攻',
		2:"防御",
		3:"特防",
		4:"速度",
		5:"命中"
	},
	YiChang:{

	}
}