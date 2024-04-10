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
		Monster:MonsterBrief[]
	}
}

/**
 * 精灵的简洁信息,不包括种族,技能,进化阶段之类的数据
 */
export interface MonsterBrief{
	ID:number,
	Features:string,
	Type:string,
	Food?:string,
	Height?:number,
	Weight?:number,
	DefName:string
}