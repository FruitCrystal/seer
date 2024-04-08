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