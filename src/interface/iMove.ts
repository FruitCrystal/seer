export interface iMove {
	MovesTbl:{
		Moves:{
			Move: MoveDetail[]
		}
	}
	SideEffects: {
		SideEffect: iSideEffect[]
}
}

/**
 * 单个技能,包括技能ID,名称,效果代码,效果数值,PP,威力等数据
 */
export interface MoveDetail {
	Priority?:number,
	CritRate?:number,
	ID: number;
	info?:string,
	Name: string;
	Category: number;
	Type: number;
	Power: number;
	MaxPP: number;
	Accuracy: number;
	Url: string;
	CD?: number;
	SideEffect?:string|number
	SideEffectArg?:string|number
	MustHit?:number,
	AtkType: number;
}

/**
 * 技能效果ID,一个技能是由若干的效果ID组成的特效集
 * 如:{
    "ID": 20707,
    "Name": "浑浊之水",
    "Category": 4,
    "Type": 8,
    "MaxPP": 20,
    "Accuracy": 100,
    "SideEffect": 5, 
		5号效果:{
    "ID": 1000005,
    "des": "技能使用成功时，m%对方XX等级+/-n",
    "help": "降低能力"
	}
    "SideEffectArg": "5 100 -2",
		//三个参数,5对应XX,100对应m, -2对应n,5号能力值为命中,所以
		最终效果就是:技能使用成功时,100%使对方命中等级-2
    "AtkType": 2,
    "Url": "pro_3",
    "info": "命中降低了许多",
    "CD": 791
}
 */
export interface iSideEffect {
	/**
	 * @param ID 技能效果ID 要减去1000000
	 */
	ID: number;
	Des: string;
}

export interface iHideMoves{

	root:{
		item:hide_move[]
	}

}

export interface hide_move{
	/**
	 * @param moveId 技能ID
	 * 
	 */
	moveId: number;
	petId: number;
}