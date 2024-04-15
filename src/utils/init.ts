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
	['ogre', '宝石'],
	['movesLang', '精灵喊话'],
	['bossEffectIcon', 'BOSS特效'],
	['pvp_ban', 'pvp限制池']
]);
export type TData = ['monsters', 'moves', 'hide_moves', 'items', 'itemsTip', 'gems', 'equip', 'effectDes', 'effectInfo', 'effectIcon', 'effectbuff', 'petbook', 'skillTypes', 'suit', 'pet_skin', 'ogre','movesLang','bossEffectIcon']
/**
 * 
 * 	初始化数据,获取版本号,精灵,道具,魂印,技能数据
 */
export async function init(setProgress: Function) {
	const data = new Map();
	//获取版本号
	const resource = await (await fetch('http://seerh5.61.com/version/version.json?id=12345678')).json()
	const version = resource.version
	const xml = resource.files.resource.config.xml;
	const json = resource.files.resource.config.json;
	data.set('version', version)
	//console.log(resource)
	const essential = ['monsters', 'moves', 'hide_moves', 'items', 'itemsTip', 'gems', 'equip', 'effectDes', 'effectInfo', 'effectIcon', 'effectbuff', 'petbook', 'skillTypes', 'suit', 'pet_skin', 'ogre','movesLang','bossEffectIcon','pvp_ban']
	let index = 1;
	for (const item of essential) {
			if(item==='pvp_ban'){
				const result = await (await fetch(`https://seerh5.61.com/resource/config/json/${json[item+'.json']}`)).json()
				data.set(item, result)
			}else{
				const result = await (await fetch(`https://seerh5.61.com/resource/config/xml/${xml[item+'.json']}`)).json()
				data.set(item, result)
			}

			index++;
			setProgress({ item, index })
	}
	//处理数据,将精灵数据,技能数据整合
	return data;
}

