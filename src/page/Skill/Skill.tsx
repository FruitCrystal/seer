import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dataContext } from '../../utils/context';
import { MoveDetail, iMove } from '../../interface/iMove';
import PageSwitcher from '../../components/PageSwitcher/PageSwitcher';
import SkillPanel from '../../components/SkillPanel/SkillPanel';
import styles from './Skill.module.css';
import change from '../../assets/refresh.svg';
import {TypeSwitcher} from '../../components/TypeSwitcher/TypeSwitcher';
export const Skill = () => {
	const PARAMS = useParams();
	const [page, setPage] = useState(1);
	const [searchID, setSearchID] = useState<string | undefined>(PARAMS.id);
	const [effectID, setEffectID] = useState(PARAMS.id);
	const database = useContext(dataContext);
	const MOVES: iMove = database.get('moves');
	const moves_List: MoveDetail[] = MOVES.MovesTbl.Moves.Move;
	const [moves_after_filter, setMoves_after_filter] = useState<MoveDetail[]>([]);
	const [search_way, setSearch_way] = useState(!PARAMS.id? true : false); //true为搜索技能ID，false为搜索效果ID
	const [type, setType] = useState(0);
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
			: setMoves_after_filter(moves_List);
			setType(0);
	}, [PARAMS.id]);

	function doSearch(param: string) {
		if (search_way) {
			console.log('按技能ID搜索');
			let result = [];
			result = moves_List.filter((move) => move.ID?.toString() == param);
			setMoves_after_filter(result);
		} else {
			console.log('按效果ID搜索');
			setMoves_after_filter(moves_List.filter((move) => move.SideEffect?.toString().split(' ').includes(param)));
		}
	}
	useEffect(() => {
		if (type){
			setMoves_after_filter(moves_List.filter((move) => move.Type == type));
		}else{
			setMoves_after_filter(moves_List.filter((move) => move.SideEffect?.toString().split(' ').includes(PARAMS.id as string)));
		}
		setPage(1);},[type])
	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '100%', alignItems: 'center' }}>
			<div className={styles.controll_panel}>
				<fieldset>
					<legend>搜索方式</legend>
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%' }}>
					{search_way ? (
						<label>
							技能ID：
							<input
								id="searchID"
								type="text"
								value={searchID}
								onChange={(e) => {
									setEffectID(undefined);
									setSearchID(e.target.value);
									doSearch(e.currentTarget.value);
									setType(0);
								}}
								placeholder="输入技能ID"
							></input>
						</label>
					) : (
						<label>
							效果ID：
							<input
								id="effectID"
								type="text"
								value={effectID}
								onChange={(e) => {
									setSearchID(undefined);
									setEffectID(e.target.value);
									doSearch(e.target.value);
									setType(0);
								}}
								placeholder="输入效果ID"
							></input>
						</label>
					)}
					<div
						onClick={(e) => {
							e.stopPropagation();
							setType(0);
							setSearch_way(!search_way);
							setEffectID(undefined);
							setSearchID(undefined);
							setMoves_after_filter(moves_List);
							e.isDefaultPrevented();
						}}
					>
						<img title="切换搜索方式" className={styles.refresh} width={25} src={change}></img>
					</div>
				</div>
				</fieldset>
				
				<fieldset style={{width:55,fontSize:12}}>
					<legend>属性</legend>
					<TypeSwitcher _setType={setType} _type={type}></TypeSwitcher>
				</fieldset>
				<fieldset style={{width:55,fontSize:12}}>
					<legend>重置</legend>
						<button onClick={()=>{
							setPage(1);
							setEffectID(undefined);
							setSearchID(undefined);
							setMoves_after_filter(moves_List);
							setType(0);
						}}>重置</button>
				</fieldset>
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
						margin:'0 -10px',
						alignItems: 'flex-start',
					}}
				>
					{moves_after_filter
						.slice((page - 1) * 25, page * 25)
						.map((move) => (moves_after_filter ? <SkillPanel moveID={move.ID}></SkillPanel> : <p>暂无结果！</p>))}
				</div>
			</div>
			<div style={{ position: 'absolute', left: '35%', bottom: '100px' }}>
				<PageSwitcher page={page} setPage={setPage} total={moves_after_filter.length} onePageNum={25}></PageSwitcher>
			</div>
		</div>
	);
};
