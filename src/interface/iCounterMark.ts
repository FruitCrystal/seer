
export interface iMintMark{
	/**
			 * @param ID 刻印ID
			 */
	ID:number,
	/**
	 * 刻印隐藏属性
	 */
	ExtraAttriValue?:string,
	Type:number,
	Quality:number,
	/**
	 * @param Effect 刻印的初始数值，由6位数以空格分隔构成，次序如：攻击 防御 特攻 特防 速度 体力
	 */
	Effect?:number,
	/**
	 * @param EffectDes 即为刻印的数值具体描述，如"体力8/80,特攻6/60,防御2/28,特防2/28,速度2/25"
	 */
	EffectDes?:string,
	Arg?:string,
	Level:number,
	/**
	 * 刻印名字
	 */
	Des:string,
	/**
	 * @param MaxAttriValue 最大属性值，仅全能刻印才有该数值
	 */
	MaxAttriValue?:string,
	/**
	 * @param BaseAttriValue 基础属性值，仅全能刻印才有该数值
	 */
	BaseAttriValue?:string,
	Rarity?:number,
	/**
	 * 全能刻印等级？品质等级？
	 */
	MintmarkLevel?:number,
	/**
	 * 全能刻印可以升几级，一般是5级
	 */
	Grade?:number,
	/**
	 * 刻印限定技能ID
	 */
	MoveID?:number,
	/**
	 * @param MonsterID 刻印所属精灵ID
	 */
	MonsterID?:number,
	/**
	 * 全能刻印系列
	 */
	MintMarkClass?:number,
}
export interface iMintmarkClass{
	/**
		 * 刻印系列名称
		 */
	ClassName:string,
	/**
	 * 刻印系列id
	 */
	ID:number,
}
/**
 * 刻印
 */
export default interface iCounterMark{
	
	MintMarks:{
		MintMark:iMintMark[]
	}
	MintmarkClass:iMintmarkClass[]
}