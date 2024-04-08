import styles from './SkillPanel.module.css';
import {memo} from 'react';
const SkillPanel = memo(()=> {

	/**
	 * 一个对象,包括的技能名字,技能的效果ID,以及效果的参数
	 * {name:"诅咒",effectID:"4 4 4",effectArgs:"0 100 1 1 100 1 4 100 -1"}
	 * ...
	 */
	//const SKILL_EFFECTS_DETAIL: {
	//	name: string;
	//	effectID: string | undefined;
	//	effectArgs: string | undefined;
	//} = { name: move.Name, effectID: move?.SideEffect?.toString(), effectArgs: move.SideEffectArg?.toString() };


	//技能效果ID:数组:[4 4 4]
	//const SKILL_EFFECT_ID = typeof SKILL_EFFECTS_DETAIL.effectID != 'undefined' ? SKILL_EFFECTS_DETAIL.effectID?.split(' ') : [];

	////技能效果参数:数组[0 100 1 1 100 1 4 100 -1],为什么这个获取总会出错?
	//const SKILL_EFFECT_ARGS = typeof SKILL_EFFECTS_DETAIL.effectArgs != 'undefined' ? SKILL_EFFECTS_DETAIL.effectArgs?.split(' ') : [];

	/**
	 * 将所有技能效果与其ID映射成Map
	 */
	//let EFFECT_MAP_BY_ID = new Map<number,iMoveEffect>()
	//function effectDesArrayToMap(){
	//	paramType.map((item)=>EFFECT_MAP_BY_ID.set(item.id,item))
	//	//console.log(EFFECT_MAP_BY_ID)
	//}
	//effectDesArrayToMap();


	/**
	 * 按特定情况讨论,如"瞪眼"之类的强化/弱化类技能的效果代码只有4/5两个,较容易讨论,且提升状态的参数是乱序的,因此需要额外讨论.
	 * 异常状态类相关技能太多,无法逐一讨论
	 */
	//	function generateSkillDesPlus():string{
	//		let des = ''
	//		if(SKILL_EFFECT_ID.find(v=>v=="4"||v=="5"||v=="585")){
				
	//			generateSkillDescreption();
	//			return"施工中..."}
	//		SKILL_EFFECT_ID.map(i=>{
	//				des= generateSkillDescreption()
	//		}
	//	);	
	//		return des;
	//	}
		
	///**
	// * 用于生成一般技能的描述,无法生成如"瞪眼"之类的强化/弱化类技能的描述
	// * @returns 
	// */
	//function generateSkillDescreption(){
	//	if(!SKILL_EFFECTS_DETAIL.effectArgs) return''
	//	if (!SKILL_EFFECT_ID) return '';
  //  let des = SKILL_EFFECTS_DETAIL.effectID?.split(' ').map((item, index) => EFFECT_MAP_BY_ID.get(parseInt(item))?.info+";").join('') as string;
	//	let length = des.length;
	//	des = des.slice(0,length-1)
	//	length = des.length;
  //  if (!des) return '';
  //  let desArray = [];
  //  const skillArgsArray = SKILL_EFFECTS_DETAIL.effectArgs?.split(' ');
  //  for (let i = 0; i < length; i++) {
  //      const currentChar = des[i];
  //      if (currentChar == '{') {
  //          if (skillArgsArray.length > 0) {
  //              desArray.push(skillArgsArray.shift());
  //          }
	//					i+=2
  //      } else {
  //          desArray.push(currentChar);
  //      }
  //  }
	//	//console.log(SKILL_EFFECTS_DETAIL)
  //  return desArray.join('');
	//}
	
	///**
	// * 技能描述转Map
	// * 1=>造成伤害的一半回复体力....
	// */

		let move={
			Category:1,
			Priority:1,
			MustHit:0,
			CritRate:75,
			Accuracy:100,
			info:"造成伤害，并使目标受到伤害。",
			learningLv:10,
			ID:10001,
			Name:"攻击",
			SideEffect:4,
			SideEffectArg:100,
		}
	return (
		<div className="">
			<div className={styles.panel}>
				<img
					className={styles.shuxinglogo}
					alt="属性"
					width={30}
					height={30}
					src={`http://seerh5.61.com/resource/assets/PetType/5.png`}
				/>
				<div className={styles.info}>
					<p style={{ color: 'rgb(153, 255, 255)' }}>技能名字</p>
					{/*技能威力假定为150*/}
					<p style={{ color: 'rgb(255, 255, 0)' }}>{150 ? '威力:' + 150 : '威力:0'}</p>
					<p style={{ color: 'white' }}>{'PP：' + 50}</p>
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
					<div>学习等级:{10}</div>
					<div style={{display:move.MustHit==1?"none":"block"}}>精准度:{move.Accuracy}</div>
					<div style={{ display:move.Category == 4 && move.ID>=20000?"none":'block' }}>暴击率:{typeof move.CritRate === 'undefined'?"1":move.CritRate}/16</div>
					<div style={{ color: 'rgb(183,178,178)' }}>{move.info}</div>
					{/*<div style={{ color: 'rgb(80,216,253)' }}>{generateSkillDesPlus().split(";").map((item:any,index:number)=><div key={index} style={{marginBottom:3}}><span>{item.length>0?`效果${index+1}：`:''}</span>{item}</div>)}</div>*/}
				</div>
			</div>
		</div>
	);
					})
SkillPanel.displayName="SkillPanel"
export default SkillPanel;
