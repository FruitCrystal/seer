/**
 * 精灵进阶，包括神谕、特训、元素觉醒等
 */
export default interface iPetAdvance{
	root:{
		Task:{
				Des:string,
				/**
				 * 具体进阶内容
				 */
				Advances:{
					/**
					 * 进阶魂印
					 */
					AdvEffect:{
						Id:number,
						Des:string,
					}
					/**
					 * 进阶精灵ID
					 */
					MonsterId:number,
					/**
				 * 种族值
				 */
				Race:{
					/**
					 * 格式：173 70 110 145 110 132
					 */
					NewRace:string,
					OldRace:string,
				}
				/**
				 * 额外第五技能
				 */
				exMove:{
					ExtraMoves:number
				}
				/**
				 * 额外技能
				 */
				spMove:{
					/**
					 * 格式：28380 28381 36744
					 */
					spMoves:string
				}
				},
				
			}[]
	}
}
