/**
 * 完整的精灵数据
 */

import iLearnableMove from "./iLearnableMove";


export default interface iMonster{

	Monsters:{Monster:Array<iMonsterInner>}

}

interface iMonsterInner{
		/**
 * @param learnableMoves 可习得技能
 */
		learnableMoves: iLearnableMove;
		/**
		 * @param ID 精灵ID(1~5000)
		 */
		ID: number;
		/**
		 * @param DefName 精灵名称
		 */
		DefName: string;
		/**
		 * @param TypeID 精灵属性ID
		 */
		TypeID: number;
		/**
		 * @param Growthtype 进化形态数量
		 */
		GrowthType: number;
		/**
		 * 种族值 
		 */
		HP: number;
		Atk: number;
		Def: number;
		SpAtk: number;
		SpDef: number;
		Spd: number;
	
		/**
		 * @param CatchRate 捕捉率
		 */
		CatchRate: number;
		/**
		 * @param YieldingEV 战胜后获得的学习力 6个数字(攻击 特攻 防御 特防 速度 体力),如(1 0 0 0 0 0) 
		 */
		YieldingEV: string;
			/**
		 * @param EvolvesFrom 前一形态ID
		 */
		EvolvesFrom: number;
		/**
		 * @param EvolvesTo 后一形态ID
		 */
		EvolvesTo: number;
		/**
		 * @param EvolvingLv 进化等级
		 */
		EvolvingLv: number;
		/**
		 * @param FreeForbidden 是否可放生(0/1)
		 */
		FreeForbidden: number;
		/**
		 * @param Gender 性别(1:雄性;2:雌性;3:无性别)
		 */
		Gender: number;
		/**
		 * @param hasSound 是否有声音,0无
		 */
		hasSound:number
		Height:number
		Weight:number
	
		/**
		 * @param Foundin 发现地
		 */
		Foundin:string
		Food:string
		/**
		 * @param Features 精灵描述
		 */
		Features:string
		/**
		 * @param Type 精灵属性中文
		 */
		Type:string
}

