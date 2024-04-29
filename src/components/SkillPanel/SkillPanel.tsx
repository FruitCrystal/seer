import {Link} from 'react-router-dom';
import { DescriptionMapping } from '../../interface/iData';
import { iEffectInfo } from '../../interface/iEffect';
import { MoveDetail, iMove } from '../../interface/iMove';
import { dataContext } from '../../utils/context';
import styles from './SkillPanel.module.css';
import { useContext, useMemo } from 'react';
const SkillPanel = ({ moveID, learningLv }: { moveID: number; learningLv?: number; extraMoveID?: (number | undefined)[] }) => {
	const data = useContext(dataContext);
	function genDesc(text: string, params: any[]) {
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

	const movesData: iMove = data.get('moves');
	/**
	 * @param move 根据props传来的技能ID，获取到该技能的详细的数据
	 */
	const move: MoveDetail = movesData.MovesTbl.Moves.Move.find((item: MoveDetail) => item.ID === moveID) as MoveDetail;
	/**
	 * @param moveEffect 从数据库中获取的技能效果数据
	 */
	let moveEffect: iEffectInfo = data.get('effectInfo');
	moveEffect.root.Effect.push({id: 31, info: '1回合做{0}~{1}次攻击。', argsNum: 2})
	/**
	 * @param EffectID 单个技能所持有的效果ID
	 */
	const EffectID = typeof move.SideEffect === 'string' ? move.SideEffect.split(' ').map(Number) : [move.SideEffect];
	//console.log(move);
	//const EffectTypeParam = moveEffect.root.Effect.find((item) => item.id === EffectID[0])?.param;
	/**
	 * @param EffectArg 单个技能所持有的**所有**效果参数
	 */
	const EffectArg = typeof move.SideEffectArg === 'string' ? move.SideEffectArg.split(' ') : [move.SideEffectArg as number];
	const MemogenerateSkillDesPlus = useMemo(generateSkillDesPlus, [moveID]);
	function generateSkillDesPlus() {
		//console.log("generateSkillDesPlus执行一次");
		let finalResult = ''; //最终结果
		if (localStorage.getItem(moveID.toString())) {
			return localStorage.getItem(moveID.toString()) as string;
		}
		let EffectTypeParam: string = '';
		type TYPE_SKILL_INFO = {
			技能ID: number;
			技能名: string;
			技能描述及参数: [
				{
					效果描述: string | undefined;
					参数: string[] | number[];
					技能效果ID: any;
					该描述所需参数数量: number | undefined;
					特殊描述标记: boolean;
				}
			];
		};
		let SKILL_INFO: TYPE_SKILL_INFO = {
			技能ID: move.ID,
			技能名: move.Name,
			技能描述及参数: [
				{
					效果描述: '',
					参数: [],
					技能效果ID: EffectID,
					该描述所需参数数量: 0,
					/**
					 * @param {boolean} 特殊描述标记
					 *
					 */
					特殊描述标记: false,
				},
			],
		};
		/**
		 *根据技能效果ID，从effectInfo中获取技能效果描述，并将其添加到SKILL_INFO的技能描述列表中
		 */
		EffectID.forEach((item, index) => {
			let skill = moveEffect.root.Effect.find((i) => i.id == item);
			EffectTypeParam += skill?.param ? skill.param : '';
			console.log(EffectTypeParam);
			SKILL_INFO.技能描述及参数[index] = {
				效果描述: skill?.info,
				参数: EffectArg?.splice(0, skill?.argsNum),
				技能效果ID: item,
				该描述所需参数数量: skill?.argsNum,
				特殊描述标记: skill?.info?(skill?.info.match(/{/g)?.length as number) < (skill?.argsNum as number) && item != 201: false,
			};
		});
		
		//console.log(SKILL_INFO);
		/**
		 * 逐个描述进行数据对齐
		 */
		SKILL_INFO.技能描述及参数.forEach((item) => {
			if(item.技能效果ID==31){
				finalResult+=`1回合做${item.参数[0]}~${item.参数[1]}次攻击。`
				return
			}
			if (item.效果描述) {
				if (item.特殊描述标记) {
					if (item.该描述所需参数数量 === 6) {
						let insert = '';
						item.参数.forEach((param, index) => {
							let isNegative = parseInt(param as string) > 0 ? false : true;
							let value: string = isNegative ? '' + parseInt(param as string) : '+' + parseInt(param as string);
							param != 0 ? (insert += DescriptionMapping.AbilityMapping[index] + value) : (insert += '');
							if (index <= 4 && param != 0) {
								insert += '，';
							}
						});
						finalResult += item.效果描述.replace('{0}', insert);
					} else {
						//这里处理那些技能参数位与参数个数对不上的技能，多见于能力提升类技能
						//console.log(SKILL_INFO.技能名);
						//一、数组切片，划分每个参数位所需的参数个数，通常来说，一个参数位只容纳一个参数，但这类技能有一个参数为会容纳6个参数（攻击、特攻、防御、特防、速度、命中各对应一个参数），所以需要特殊处理
						//finalResult += item.效果描述 + '。';
						let paramIndex = [];
						let chunck: any[][] = [];
						let length = item.效果描述.length;
						let desList = item.效果描述.split('');
						for (let i = 0; i < length; i++) {
							if (desList[i] === '{') {
								paramIndex.push(desList[i + 1]);
							}
						}
						//分块:如果技能所需参数的空位是{0}，{1}，{2}，{3}则说明3号位置需接受6个参数，如果技能所需参数的空位是{0}，{7}，则0号位需要接受6个参数
						paramIndex.map((_item, index) => {
							if (parseInt(_item) - parseInt(paramIndex[index + 1]) === -1) {
								chunck.push(item.参数.slice(parseInt(_item), parseInt(_item) + 1));
								if(index === paramIndex.length - 1){
									chunck.push(item.参数.slice(parseInt(_item), parseInt(_item) + 6));
								}
							} else {
								chunck.push(item.参数.slice(parseInt(_item), parseInt(_item) + 6));
							}
						});
						chunck.map((item, index) => {
							if (item.length != 6) {
							} else {
								let specialChunck = chunck[index];
								specialChunck.map((param, index) => {
									param != 0
										? (specialChunck[index] = DescriptionMapping.AbilityMapping[index] + (param > 0 ? '+' + param : '-' + param))
										: delete specialChunck[index];
								});
								chunck[index] = specialChunck.filter((i) => i != undefined);
							}
						});

						finalResult += genDesc(item.效果描述, chunck);
						if (item.技能效果ID == '1823') {
							finalResult = finalResult.replace('则令1', '则令对手');
						}
					}
				} else {//处理没有特殊标记的技能
					//let desList = item.效果描述?.split('');
					//let length = item.效果描述?.length;
					//console.log(item.效果描述.length===desList.length);
					let isAbilityAdvance = item.效果描述.match(/\d/g)?.join('').includes('102');
					if(item.技能效果ID==492){
						let des = item.效果描述;
						finalResult +=
							des
								.replace('{0}', item.参数[0] + '')
								.replace('{1}', item.参数[1] + '')
								.replace('{2}', DescriptionMapping.AbilityMapping[parseInt(item.参数[2] as string)])
								.replace('{3}', item.参数[3] + '')
								.replace('{4}', DescriptionMapping.AbilityMapping[parseInt(item.参数[4] as string)])
								.replace('{5}', item.参数[5] + '')+'。'
								return;
					}
					if(item.技能效果ID==493){
						let des = item.效果描述;
						finalResult +=
							des
								.replace('{0}', item.参数[0] + '')
								.replace('{1}', '1')
							return;
					}
					if (item.技能效果ID == 588 || item.技能效果ID == 678) {
						let abilityID = item.参数[1];
						let des = item.效果描述;
						finalResult +=
							des
								.replace('{0}', item.参数[0] + '')
								.replace('{1}', DescriptionMapping.AbilityMapping[parseInt(abilityID as string)])
								.replace('{2}', item.参数[2] + '') + '。';
								return;
					}
					if (item.技能效果ID == 501) {
						let abilityID = item.参数[1];
						let des = item.效果描述;
						finalResult +=
							des
								.replace('{0}', item.参数[0] + '')
								.replace('{1}', DescriptionMapping.AbilityMapping[parseInt(abilityID as string)])
								.replace('{2}', item.参数[2] + '') + '。';
								return;
					}
					if(item.技能效果ID == 631){
						let des = item.效果描述;
						finalResult +=
							des
								.replace('{0}', item.参数[0]==0?"对手能力提升":"自身能力提升")
								.replace('{1}', item.参数[1] + '')+'。';
								return;
					}
					if (item.技能效果ID == 407) {
						let abilityID = item.参数[0]; //能力提升效果的id:0=攻击/1=特攻
						let des = item.效果描述;
						finalResult +=
							des
								.replace('{0}', DescriptionMapping.AbilityMapping[parseInt(abilityID as string)])
								.replace('{1}', item.参数[1] + '')
								.replace('{2}', item.参数[2] + '') + '。';
								return;
					}
					if (isAbilityAdvance) {
						let abilityID = item.参数[0];
						let ability = DescriptionMapping.AbilityMapping[parseInt(abilityID as string)];
						let des = item.效果描述;
						let isNegative = parseInt(item.参数[2] as string) > 0 ? false : true;
						finalResult += des
							.replace('{0}', ability)
							.replace('{1}', item.参数[1] + '')
							.replace('{2}', !isNegative ? '+' + item.参数[2] + '' : '' + item.参数[2] + '');
						finalResult += '。';
					} else {
						finalResult += genDesc(item.效果描述, item.参数);
						//finalResult += replaceNumbersWithValues(item.效果描述, item.参数);
						//for (let i = 0; i < length; i++) {
						//	if (desList[i] === '{') {
						//		finalResult += '';
						//		finalResult += item.参数[parseInt(desList[i + 1])];
						//		i++;
						//		i++;
						//	} else {
						//		finalResult += desList[i];
						//	}
						//}
					}
				}
			}
			if (finalResult.length > 0) {
				finalResult += '。';
			} else {
				finalResult = '该技能无效果。';
			}
			if (EffectTypeParam) {
				if(item.技能效果ID==849){
					finalResult=finalResult.replace("对手", "对手"+item.参数[1])//在这里不能替换undefined，因为undefined可能是因为参数缺失造成的
				}
				if (
					EffectTypeParam.includes('1,1,1') ||
					EffectTypeParam.includes('1,0,0') ||
					EffectTypeParam.includes('1,2,2') ||
					EffectTypeParam.includes('1,2,1') ||
					EffectTypeParam.includes('1,3,3|1,6,6')
				) {
					while (RegExp(/使对手\d{1,2}/).test(finalResult)||RegExp(/令对手\d{1,2}/).test(finalResult)) {
						let index = finalResult.search(/对手\d{1,2}/);
						let status = finalResult[index + 2].concat(Number.isNaN(parseInt(finalResult[index + 3])) ? '' : finalResult[index + 3]);
						let correctStatus =''
						if(~~status>32){
							correctStatus = status[0]
							finalResult = finalResult.replace(/对手\d{1,2}/, '对手*').replace('*', DescriptionMapping.YiChang[parseInt(correctStatus)]+status[1]);
						}else{
							finalResult = finalResult.replace(/对手\d{1,2}/, '对手*').replace('*', DescriptionMapping.YiChang[parseInt(status)]);
						}
						//console.log(status);
					 //替换*号为对应的异常状态汉语名称
					}
					while (RegExp(/\d{1,2}状态/).test(finalResult)) {
						//第二种情况：‘若对手处于XX状态’
						let _index = finalResult.search(/\d{1,2}状态/);
						let _status = finalResult[_index];
						finalResult = finalResult.replace(/\d{1,2}状态/, '*状态').replace('*', DescriptionMapping.YiChang[parseInt(_status)]); //替换*号为对应的异常状态汉语名称
					}
				}
				
			}
		});
		
		finalResult = finalResult.replace('++', '+').replace('。。', '。').replace('222', '混沌').replace('--', '-').replace('undefined','');
		try {
			localStorage.setItem(move.ID + '', finalResult);
		} catch (error) {
			return finalResult;
		}
		return finalResult;
	}

	return (
		<div className={styles.panel}>
			<img
				className={styles.shuxinglogo}
				alt="属性"
				width={30}
				height={30}
				src={`http://seerh5.61.com/resource/assets/PetType/${move.Category == 4 ? 'prop' : move.Type}.png`}
			/>
			<div className={styles.info}>
				<p style={{ color: 'rgb(153, 255, 255)' }}>{move.Name}</p>
				{/*技能威力假定为150*/}
				<p style={{ color: 'rgb(255, 255, 0)' }}>{move.Power ? '威力:' + move.Power : '威力:0'}</p>
				<p style={{ color: 'white' }}>
					{'PP：' + move.MaxPP}/{move.MaxPP}
				</p>
			</div>
			<div id="desc" className={styles.desc} style={{}}>
				<div style={{ fontSize: 10 ,color: 'rgb(165,220,255)' }}>
					<p>技能ID：{move.ID}</p>
					效果ID:{move.SideEffect?move.SideEffect.toString().split(' ').map((item, index) => <Link to={`/skill/${item}`} className={styles.effectID} key={index}>{item}</Link>):'无'}
				</div>
				<h3
					//三目运算符匹配三个条件以上
					style={move.Category == 1 ? { color: 'red' } : move.Category == 2 ? { color: 'rgb(255,153,255)' } : { color: 'rgb(13,255,0)' }}
				>
					{move.Category == 1 ? '物理攻击' : move.Category == 2 ? '特殊攻击' : '属性攻击'}
				</h3>
				<h4 style={move.Priority == 0 ? { display: 'none' } : { display: 'block' }}>
					{move.Priority ? '先制:' + (move.Priority > 0 ? '+' + move.Priority : move.Priority) : null}
				</h4>
				{move.MustHit == 1 ? <p style={{ fontSize: 18, color: 'rgb(100,225,249)' }}>必中</p> : null}
				{learningLv&&<div>学习等级:{learningLv}</div>}
				<div style={{ display: move.MustHit == 1 ? 'none' : 'block',color:'goldenrod'}}>精准度:{move.Accuracy}</div>
				<div style={{ display: move.Category == 4 && move.ID >= 20000 ? 'none' : 'block' ,color: 'red' }}>
					暴击率:{typeof move.CritRate === 'undefined' ? '1' : move.CritRate}/16
				</div>
				<div style={{ color: 'rgb(183,178,178)' }}>{move.info}</div>
				<div style={{ color: 'rgb(80,216,253)' }}>
					<div style={{ marginBottom: 3, fontSize: 11 }}>
						{MemogenerateSkillDesPlus.split('。').map((item, index) =>
							item ? (
								<p key={index}>
									{item}
									<br></br>
								</p>
							) : (
								''
							)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
SkillPanel.displayName = 'SkillPanel';
export default SkillPanel;
