/**
 * 完整的精灵数据
 */

import iLearnableMove from "./iLearnableMove";


export default interface iMonster{

	Monsters:{Monster:Array<iMonsterDetail>}

}

/**
 * 	精灵详细数据,包括技能,属性ID,种族值,ID,名字,进化信息
 */
export interface iMonsterDetail{
	SpExtraMoves?:{
		ID:number,
		LearningLv:number,
	}
	ExtraMoves?:{
		Move:{
			ID:number,
			LearningLv?:number,
		}
	}

	ExtraMove?:{
		ID:number,
		LearningLv?:number,
	}
		/**
 * @param LearnableMoves 可习得技能
 */
		LearnableMoves: iLearnableMove;
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

/**
 * 精灵图鉴信息,包括热门精灵,本周更新精灵,以及所有精灵的简介信息,但不包括其技能,种族
 */
export interface IPetBook {
	root:{
		Hotspot:{
			item:{place:[{ID:number,type:number,MonID:number}]}
		}
		PetCollect:{
			Branch:{
				Collect:[{monID:number}]
			}
		}
		HotPet:{
			item:{
				place:[{ID:number}]
			}
		}
		Monster:IMonsterBrief[]
	}
}

/**
 * 精灵的简洁信息,不包括种族,技能,进化阶段之类的数据
 */
export interface IMonsterBrief{
	ID:number,
	Features:string,
	Type:string,
	Food?:string,
	Height?:number,
	Weight?:number,
	DefName:string
}

export interface iPetSkin {
	Skin:[]
}

export interface skin {
	/**
	 * @param ID 皮肤ID
	 */
	ID:number,
	AddWay:number,
	/**
	 * @param MonID 所属精灵ID
	 */
	MonID:number,
	/**
	 * @param Name 皮肤名称
	 */
	Name:string,
	Occasion:number,
}
