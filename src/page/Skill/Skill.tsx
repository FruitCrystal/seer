import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dataContext } from '../../utils/context';
import { MoveDetail, iMove } from '../../interface/iMove';
import PageSwitcher from '../../components/PageSwitcher/PageSwitcher';
import SkillPanel from '../../components/SkillPanel/SkillPanel';

export const Skill = () => {
	const PARAMS = useParams();
	const [page, setPage] = useState(1);
	console.log(PARAMS);
	const database = useContext(dataContext);
	const MOVES: iMove = database.get('moves');
	const moves_List: MoveDetail[] = MOVES.MovesTbl.Moves.Move;
	let moves_after_filter: MoveDetail[] = [];
	console.log(PARAMS.id);
	PARAMS.id
		? (moves_after_filter = moves_List.filter((move) =>
				move.SideEffect?.toString()
					.split(' ')
					.includes(PARAMS.id as string)
		  ))
		: moves_after_filter =moves_List;
	return (
		<div>
			{PARAMS.id ? <p>正在查看包含{<span style={{ color: 'red' }}>{PARAMS.id}</span>}号效果的技能</p> : <p>正在查看所有技能</p>}
			<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start',width:800,alignItems:'flex-start'}}>
				{moves_after_filter.slice((page - 1) * 30, page * 30).map((move) => (
					<SkillPanel moveID={move.ID}></SkillPanel>
				))}
			</div>
			<div style={{position:'absolute',left:'30%',bottom:'80px'}}>
				<PageSwitcher page={page} setPage={setPage} total={moves_after_filter.length} onePageNum={30}></PageSwitcher>
			</div>
		</div>
	);
};
