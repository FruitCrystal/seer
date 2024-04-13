//export async function init(setProgress:Function){
//	//初始化数据,获取版本号,精灵,道具,魂印,技能数据
//	const data = new Map();
//	//获取版本号
//	const resource = await (await fetch('http://seerh5.61.com/version/version.json?id=12345678')).json()
//	const version = resource.version
//	const xml = resource.files.resource.config.xml;
//	data.set('version',version)
//	//console.log(resource)
//	const essential = ['monsters','moves','hide_moves','items','itemsTip','gems','equip','effectDes','effectInfo','effectIcon','effectbuff','petbook','skillTypes','suit','pet_skin','ogre']
//	essential.map(async (item,index)=>{
//		const result = await (await fetch(`https://seerh5.61.com/resource/config/xml/${xml[item+'.json']}`)).json()
//		data.set(item,result)
//		setProgress({item,index})
//	})

//	//处理数据,将精灵数据,技能数据整合
//	return data;
//}
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
	data.set('version', version)
	//console.log(resource)
	const essential = ['monsters', 'moves', 'hide_moves', 'items', 'itemsTip', 'gems', 'equip', 'effectDes', 'effectInfo', 'effectIcon', 'effectbuff', 'petbook', 'skillTypes', 'suit', 'pet_skin', 'ogre']
	let index = 1;
	for (const item of essential) {
			const result = await (await fetch(`https://seerh5.61.com/resource/config/xml/${xml[item+'.json']}`)).json()
			data.set(item, result)
			index++;
			setProgress({ item, index })
	}
	//处理数据,将精灵数据,技能数据整合
	return data;
}

