import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dataContext } from '../../utils/context';
import { MoveDetail, iMove } from '../../interface/iMove';
import PageSwitcher from '../../components/PageSwitcher/PageSwitcher';
import SkillPanel from '../../components/SkillPanel/SkillPanel';
import styles from './Skill.module.css';
import change from '../../assets/refresh.svg';
import { TypeSwitcher } from '../../components/TypeSwitcher/TypeSwitcher';
import { iEffectInfo } from '../../interface/iEffect';

export const Skill = () => {
	const PARAMS = useParams();
	const [page, setPage] = useState(1);
	const [searchID, setSearchID] = useState<string | undefined>(PARAMS.id);
	const [effectID, setEffectID] = useState(PARAMS.id);
	const database = useContext(dataContext);
	const MOVES: iMove = database.get('moves');
	const move_effests: iEffectInfo = database.get('effectInfo');
	const Effect = move_effests.root.Effect.find((effect) => effect.id == parseInt(effectID as string));
	const [EffectIdDesc, setEffectIdDesc] = useState(PARAMS.id ? Effect?.info : Effect?.info);
	useEffect(() => {
		setEffectIdDesc(PARAMS.id ? Effect?.info : Effect?.info);
	}, [PARAMS.id, Effect]);
	const moves_List: MoveDetail[] = MOVES.MovesTbl.Moves.Move;
	const [moves_after_filter, setMoves_after_filter] = useState<MoveDetail[]>(moves_List);
	const [search_way, setSearch_way] = useState(!PARAMS.id ? true : false); //true为搜索技能ID，false为搜索效果ID
	const [type, setType] = useState(0);
	function reset() {
		setPage(1);
		setEffectID(undefined);
		setSearchID(undefined);
		setMoves_after_filter(moves_List);
		setType(0);
	}
	/*	
	const [sortByPower,setSortByPower] = useState(true);
	const [sortByPP,setSortByPP] = useState(true);
	const [sortByID,setSortByID] = useState(true);
	const [sort,setSort] = useState([
		sortByPower? 1 : 2,
		sortByPP? 3 : 4,
		sortByID? 5 : 6
	]);
	useEffect(() => {
		setSort([
			sortByPower? 1 : 2,
			sortByPP? 3 : 4,
			sortByID? 5 : 6
		])
		setMoves_after_filter(moves_after_filter.sort(sort_map.get(sortByPower? 2 : 1)))
	},[sortByPower,sortByPP,sortByID])
	const sort_map = new Map([
		[1,(a:MoveDetail, b:MoveDetail) => a.Power - b.Power],//威力升序
		[2,(a:MoveDetail, b:MoveDetail) => a.Power + b.Power],//威力降序
		[3,(a:MoveDetail, b:MoveDetail) => a.MaxPP - b.MaxPP],//PP升序
		[4,(a:MoveDetail, b:MoveDetail) => a.MaxPP + b.MaxPP],//PP降序
		[5,(a:MoveDetail, b:MoveDetail) => a.ID - b.ID],//ID升序
		[6,(a:MoveDetail, b:MoveDetail) => a.ID + b.ID],//ID降序
	]);
	*/
	useEffect(() => {
		//由于Params.id是不可变的，所以从技能效果ID跳转到技能页面时，只需要设置一次
		setPage(1);
		if(effectID&&PARAMS.id){
			setMoves_after_filter(
					moves_List.filter((move) =>
						move.SideEffect?.toString()
							.split(' ')
							.includes(PARAMS.id as string)
					)
			)
		}else{
			reset()
		}
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
		if (type) {
			setEffectID(undefined);
			setSearchID(undefined);
			setPage(1);
			setMoves_after_filter(moves_List.filter((move) => move.Type == type));
		} else {
			reset();
		}
		setPage(1);
	}, [type]);
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
									type="number"
									value={searchID}
									onChange={(e) => {
										setEffectID(undefined);
										setSearchID(e.target.value);
										doSearch(e.currentTarget.value);
										setType(0);
									}}
									placeholder="输入技能ID，由10001开始"
								></input>
							</label>
						) : (
							<label>
								效果ID：
								<input
									id="effectID"
									type="number"
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

				<fieldset style={{ width: 55, fontSize: 12 }}>
					<legend>属性</legend>
					<TypeSwitcher _setType={setType} _type={type}></TypeSwitcher>
				</fieldset>
				<fieldset style={{ width: 55, fontSize: 12 }}>
					<legend>重置</legend>
					<button
						onClick={() => {
							reset()
						}}
					>
						重置
					</button>
				</fieldset>
				<fieldset style={{ width: 180, fontSize: 12 }}>
					<legend>查询效果ID</legend>
				</fieldset>
				{/*<fieldset style={{width:180,fontSize:12}}>
					<legend>排序</legend>
						<label style={{marginBottom:3}}>
							<span style={{display:"inline-block",width:31,textAlign:'right'}}>ID:</span>
							升序<CapsuleCheckBox setValue={setSortByID} width={70} hight={15}></CapsuleCheckBox>降序
						</label>
						<label style={{marginBottom:3}}>
							<span>威力:</span>
							升序<CapsuleCheckBox setValue={setSortByPower} width={70} hight={15}></CapsuleCheckBox>降序
						</label>
						<label style={{marginBottom:3}}>
						<span style={{display:"inline-block",width:31,textAlign:'right'}}>PP:</span>
							升序<CapsuleCheckBox setValue={setSortByPP}  width={70} hight={15}></CapsuleCheckBox>降序
						</label>
				</fieldset>*/}
			</div>
			<p>
				{EffectIdDesc ? (
					<p>
						您正在查看的效果{<span>{effectID}</span>}为：
						<span style={{ color: 'red' }}>
							{move_effests.root.Effect.find((effect) => effect.id == parseInt(effectID as string))?.info}
						</span>
					</p>
				) : (
					''
				)}
			</p>
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
						margin: '0 -10px',
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
