export interface iMove {
	Moves:{
		Move:move[]
	}
	SideEffects: {
		SideEffect: iSideEffect[]
}
}

export interface move{
	ID: number;
	Name: string;
	Category: number;
	Type: number;
	Power: number;
	MaxPP: number;
	Accuracy: number;
	Url: string;
	CD?: number;
	SideEffect?:string
	SideEffectArgs?:string
	MustHit?:number
}
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