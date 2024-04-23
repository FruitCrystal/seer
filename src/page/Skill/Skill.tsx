import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dataContext } from '../../utils/context';
import { MoveDetail, iMove } from '../../interface/iMove';
import PageSwitcher from '../../components/PageSwitcher/PageSwitcher';
import SkillPanel from '../../components/SkillPanel/SkillPanel';
import styles from './Skill.module.css';
export const Skill = () => {
	const PARAMS = useParams();
	const [page, setPage] = useState(1);
	const [searchID, setSearchID] = useState<string | undefined>('10001');
	const [effectID, setEffectID] = useState(PARAMS.id);
	const database = useContext(dataContext);
	const MOVES: iMove = database.get('moves');
	const moves_List: MoveDetail[] = MOVES.MovesTbl.Moves.Move;
	const [moves_after_filter, setMoves_after_filter] = useState<MoveDetail[]>([]);
	//let moves_after_filter: MoveDetail[] = [];
	useEffect(() => {
		//由于Params.id是不可变的，所以从技能效果ID跳转到技能页面时，只需要设置一次
		setPage(1);
		PARAMS.id
			? setMoves_after_filter(
					moves_List.filter((move) =>
						move.SideEffect?.toString()
							.split(' ')
							.includes(PARAMS.id as string)
					)
			  )
			: null;
		setSearchID('');
	}, [PARAMS.id]);

	useEffect(() => {
		setEffectID(undefined);
		if (searchID == '') {
			setMoves_after_filter(moves_List);
			return;
		}
		let result = [];
		result = moves_List.filter((move) => move.ID?.toString() == searchID);
		setMoves_after_filter(result);
	}, [searchID]);
	
	useEffect(() => {
		setSearchID(undefined);
		if (effectID == '') {
			setMoves_after_filter(moves_List);
			return;
		}
		setMoves_after_filter(
			moves_List.filter((move) =>
				move.SideEffect?.toString()
					.split(' ')
					.includes(effectID as string)
			)
		);
	}, [effectID]);
	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', alignItems: 'center' }}>
			<div className={styles.controll_panel}>
				{effectID ? (
					<p>正在查看包含{<span style={{ color: 'red' }}>{effectID}</span>}号效果的技能</p>
				) : searchID ? (
					<p>正在搜索技能ID为{<span style={{ color: 'red' }}>{searchID}</span>}的技能</p>
				) : (
					<p>正在查看所有技能</p>
				)}
				<input
					type="text"
					value={searchID}
					onChange={(e) => {
						setSearchID(e.target.value);
					}}
					placeholder="输入技能ID"
				></input>
				<input
					type="text"
					value={effectID}
					onChange={(e) => {
						setEffectID(e.target.value);
					}}
					placeholder="输入效果ID"
				></input>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'wrap',
					justifyContent: 'flex-start',
					width: 800,
					alignItems: 'flex-start',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'wrap',
						justifyContent: 'flex-start',
						width: 800,
						alignItems: 'flex-start',
					}}
				>
					{moves_after_filter.slice((page - 1) * 30, page * 30).map((move) => (
						<SkillPanel moveID={move.ID}></SkillPanel>
					))}
				</div>
			</div>
			<div style={{ position: 'absolute', left: '35%', bottom: '40px' }}>
				<PageSwitcher page={page} setPage={setPage} total={moves_after_filter.length} onePageNum={30}></PageSwitcher>
			</div>
		</div>
	);
};
