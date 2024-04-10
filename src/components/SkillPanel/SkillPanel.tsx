import { Effect, iEffectInfo } from '../../interface/iEffect';
import { MoveDetail, iMove } from '../../interface/iMove';
import { dataContext } from '../../utils/context';
import styles from './SkillPanel.module.css';
import { useContext } from 'react';
const SkillPanel = ({ moveID, learningLv }: { moveID: number; learningLv: number,extraMoveID?:(number |undefined)[] }) => {
	
	const data = useContext(dataContext);

	const movesData: iMove = data.get('moves');
	/**
	 * @param move 根据props传来的技能ID，获取到该技能的详细的数据
	 */
	const move: MoveDetail = movesData.MovesTbl.Moves.Move.find((item: MoveDetail) => item.ID === moveID) as MoveDetail;

	/**
	 * @param moveEffect 从数据库中获取的技能效果数据
	 */
	const moveEffect: iEffectInfo = data.get('effectInfo');

	/**
	 * @param EffectID 单个技能所持有的效果ID
	 */
	const EffectID = typeof move.SideEffect === 'string' ? move.SideEffect.split(' ') : [move.SideEffect];

	/**
	 * @param EffectArg 单个技能所持有的**所有**效果参数
	 */
	const EffectArg = typeof move.SideEffectArg === 'string' ? move.SideEffectArg.split(' ') : [move.SideEffectArg as number];

	function generateSkillDesPlus() {
		let desList: (string | undefined)[] = [];
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
			技能描述及参数: [{ 效果描述: '', 参数: [], 技能效果ID: EffectID, 该描述所需参数数量: 0, 
			/**
			 * @param {boolean} 特殊描述标记
			 * 
			 */
			特殊描述标记: false }],
		};

		/**
		 *根据技能效果ID，从effectInfo中获取技能效果描述，并将其添加到SKILL_INFO的技能描述列表中
		 */
		EffectID.forEach((item, index) => {
			let skill = moveEffect.root.Effect.find((i) => i.id == item);

			SKILL_INFO.技能描述及参数[index] = {
				效果描述: skill?.info,
				参数: EffectArg?.splice(0, skill?.argsNum),
				技能效果ID: item,
				该描述所需参数数量: skill?.argsNum,

				特殊描述标记: (skill?.info.match(/{/g)?.length as number) < (skill?.argsNum as number)
				|| skill?.info.match(/\d/g)?.join('').includes('102')? true : false
			};
			desList.push(skill?.info);
		});
		//console.log(SKILL_INFO);
		return desList;
	}
	console.log({type:move.Type,name:move.Name,power:move.Power,maxPP:move.MaxPP,category:move.Category,priority:move.Priority,mustHit:move.MustHit,accuracy:move.Accuracy,critRate:move.CritRate,info:move.info,sideEffect:move.SideEffect,sideEffectArg:move.SideEffectArg});
	return (
		<div className="">
			<div className={styles.panel}>
				<img
					className={styles.shuxinglogo}
					alt="属性"
					width={30}
					height={30}
					src={`http://seerh5.61.com/resource/assets/PetType/${move.AtkType==3?'prop':move.Type}.png`}
				/>
				<div className={styles.info}>
					<p style={{ color: 'rgb(153, 255, 255)' }}>{move.Name}</p>
					{/*技能威力假定为150*/}
					<p style={{ color: 'rgb(255, 255, 0)' }}>{move.Power ? '威力:' + move.Power : '威力:0'}</p>
					<p style={{ color: 'white' }}>{'PP：' + move.MaxPP}</p>
				</div>
				<div className={styles.desc}>
					<h3
						//三目运算符匹配三个条件以上
						style={
							move.Category == 1 ? { color: 'red' } : move.Category == 2 ? { color: 'rgb(255,153,255)' } : { color: 'rgb(13,255,0)' }
						}
					>
						{move.Category == 1 ? '物理攻击' : move.Category == 2 ? '特殊攻击' : '属性攻击'}
					</h3>
					<h4 style={move.Priority == 0 ? { display: 'none' } : { display: 'block' }}>{move.Priority ? '先制:' + move.Priority : null}</h4>
					{move.MustHit == 1 ? <p style={{ fontSize: 18, color: 'rgb(100,225,249)' }}>必中</p> : null}
					<div>学习等级:{learningLv}</div>
					<div style={{ display: move.MustHit == 1 ? 'none' : 'block' }}>精准度:{move.Accuracy}</div>
					<div style={{ display: move.Category == 4 && move.ID >= 20000 ? 'none' : 'block' }}>
						暴击率:{typeof move.CritRate === 'undefined' ? '1' : move.CritRate}/16
					</div>
					<div style={{ color: 'rgb(183,178,178)' }}>{move.info}</div>
					<div style={{ color: 'rgb(80,216,253)' }}>
						<div style={{ marginBottom: 3 }}>{generateSkillDesPlus()}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
SkillPanel.displayName = 'SkillPanel';
export default SkillPanel;
