function genDesc(text,params) {
	let finalResult = '';
	let length = text.length;
	let desList = text.split('');
	for (let i = 0; i < length; i++) {
		if (desList[i] === '{') {
			finalResult += '';
			finalResult += params[parseInt(desList[i + 1])];
			i++;
			i++;
		} else {
			finalResult += desList[i];
		}
	}
	return finalResult;
}

genDesc("{0}回合内每回合使用技能则造成伤害前随机吸取对手{1}项能力值-1",['3', '3'])