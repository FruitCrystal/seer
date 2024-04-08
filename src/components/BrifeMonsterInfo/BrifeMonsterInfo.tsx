import {brife_info} from '../../interface/iPetBook'

export const BrifeMonsterInfo = ({info}:{info:brife_info}) => {
	return (
		<div>
			<p>{info.DefName}</p>
			<p>{info.Weight}</p>
			<p>{info.ID}</p>
			<p>{info.Features}</p>
		</div>
	)
}
