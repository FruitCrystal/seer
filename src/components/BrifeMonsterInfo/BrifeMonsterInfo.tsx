import {MonsterBrief} from '../../interface/iPetBook'

export const BrifeMonsterInfo = ({info}:{info:MonsterBrief}) => {
	return (
		<div>
			<p>{info.DefName}</p>
			<p>{info.Weight}</p>
			<p>{info.ID}</p>
			<p>{info.Features}</p>
		</div>
	)
}
