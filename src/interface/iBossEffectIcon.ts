/**
 *  {
                "iconId": 0,
                "Stat": 1,
                "Eid": 1261,
                "Args": "185 139 235",
                "tips": "神话：免疫异常状态和能力下降状态，所有技能必中且PP值无限",
                "sort": 0,
                "rows": 2
            },
 */
export interface IBossEffectIcon {
	root:{
		bossEffect:[
			{
				iconId: number,
        Stat: number,
        Eid: number,
        Args: string,
        tips: string,
        sort: number,
        rows: number,
			}
		]
	}
}