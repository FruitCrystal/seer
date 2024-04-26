import { useContext, useEffect, useRef, useState } from 'react';
import iMonster, { iMonsterDetail } from '../../interface/iMonster';
import PetCard from '../../components/Card/PetCard';
import { dataContext } from '../../utils/context';
import { FilterContextProps } from './../../utils/filterContext';
import style from './Pet.module.css';
import { TYPE_MAP } from '../../utils/commonData';
import PageSwitcher from '../../components/PageSwitcher/PageSwitcher';
import { getSomeRandomPetID } from '../../utils/tools';
import { MoveDetail, iMove } from '../../interface/iMove';
import {Link} from 'react-router-dom';
import { TypeSwitcher } from './../../components/TypeSwitcher/TypeSwitcher';
export const Pet = () => {
	const data = useContext(dataContext);
	const monstersData: iMonster = data.get('monsters');
	const MOVE: iMove = data.get('moves');
	let movesNameList: string[] = [];
	const moves: MoveDetail[] = MOVE.MovesTbl.Moves.Move;
	const monsters: iMonsterDetail[] = monstersData.Monsters.Monster.filter((e) => e.ID <= 5000);
	moves.map((item) => movesNameList.push(item.Name));
	const [filter, setFilter] = useState<FilterContextProps>({ keyword: undefined, gender: 3, type: 0, IDAsce: true, canCatch: false });
	const [result, setResult] = useState<iMonsterDetail[]>([]);
	const [page, setPage] = useState(1);
	const [SKILL_NAME, setSKILL_NAME] = useState('');
	const [TipsVisible, setTipsVisible] = useState(false);
	const [searchingSkillName, setSearchingSkillName] = useState('');
	const [Tips, setTips] = useState<Array<string>>([]);
	function setType(type: number) {
		setFilter({ ...filter, type });
	}
	useEffect(() => {
		setTips(movesNameList.filter((item) => (item + '').includes(searchingSkillName)));
	}, [searchingSkillName]);
	function reset() {
		setFilter({ ...filter, keyword: undefined, gender: 3, type: 0, IDAsce: true, canCatch: undefined });
		setResult(monsters);
		setPage(1);
	}
	//const monsters = petBook.root.Monster.find((e) => e.ID == filter?.keyword);
	function generateRandomMonsters() {
		let ids = getSomeRandomPetID(50, 1, 5000);
		let result: iMonsterDetail[] = [];
		for (let i = 0; i < ids.length; i++) {
			let monster = monsters.find((e) => e.ID == ids[i]);
			if (monster) {
				result.push(monster);
			}
		}
		setPage(1);
		setFilter({ ...filter, keyword: undefined, gender: 3, type: 0, IDAsce: true, canCatch: undefined });
		//setFilter({ keyword: undefined, gender: 3 ,type:0,IDAsce:true,canCatch:false});
		setResult(result);
	}
	function doSearch(_monster: iMonsterDetail[]) {
		setPage(1);
		let RESUTL: iMonsterDetail[] = _monster;
		if (filter.keyword) {
			!Number.isNaN(parseInt(filter.keyword as string))
				? (RESUTL = monsters.filter((e) => e.ID == filter.keyword))
				: (RESUTL = monsters.filter((e) => e.DefName.includes(filter.keyword as string)));
			//console.log(RESUTL);
		}
		if (filter.type) {
			RESUTL = RESUTL.filter((e) => e.Type === filter.type);
			//console.log(RESUTL);
		}
		if (filter.gender) {
			switch (filter.gender) {
				case 1: //雄性
					RESUTL = RESUTL.filter((e) => e.Gender === 1);
					break;
				case 2: //雌性
					RESUTL = RESUTL.filter((e) => e.Gender === 2);
					break;
				case 3: //不筛选性别
					RESUTL = RESUTL;
					break;
				case 4: //无性别
					RESUTL = RESUTL.filter((e) => e.Gender === 0 || e.Gender === undefined);
					break;
			}
		}
		filter.IDAsce ? (RESUTL = RESUTL.sort()) : (RESUTL = RESUTL.sort().reverse());

		setResult(RESUTL);
		return RESUTL;
	}
	useEffect(() => {
		doSearch(monsters);
	}, [filter.IDAsce, filter.keyword, filter.gender, filter.type, filter.canCatch]);
	return (
		<div style={{ width: '100%', height: '100%' }}>
			<div
				className={style.search_bar}
				style={{
					fontSize: '12px',
					display: 'flex',
					height: '77px',
					backgroundColor: '#f2f2f2',
				}}
			>
				<label style={{ display: 'flex', flexDirection: 'column' }}>
					<input
						onKeyDown={(e) => e.code === 'Enter' && setFilter({ ...filter, keyword: e.currentTarget.value })}
						className={style.searchInput}
						type="text"
						placeholder="输入精灵ID或名称，按回车以搜索"
					/>
					<div style={{ display: 'flex' }}>
						<button onClick={() => generateRandomMonsters()} className={style.randomBtn}>
							随机
						</button>
						<button onClick={() => reset()} className={style.randomBtn}>
							重置
						</button>
					</div>
				</label>
				<fieldset>
					<legend>属性</legend>
					{/*<select onChange={(e) => setFilter({ ...filter, type: parseInt(e.currentTarget.value) })} value={filter.type}>
						{Array.from(TYPE_MAP.keys()).map((key) => (
							<option value={key} key={key}>
								{TYPE_MAP.get(key)}
							</option>
						))}
					</select>*/}
					<div style={{width:55}}>
							<TypeSwitcher _type={filter.type} _setType={setType}></TypeSwitcher>
						{/*<img src={`http://seerh5.61.com/resource/assets/PetType/${filter.type}.png`} alt="" />*/}
					</div>
				</fieldset>
				<fieldset>
					<legend>筛选精灵性别</legend>
					<div>
						<label>
							<input
								checked={filter.gender === 1 ? true : false}
								onChange={(e) => setFilter({ ...filter, gender: parseInt(e.currentTarget.value) })}
								type="radio"
								id="male"
								name="gender"
								value={1}
							/>
							雄性
						</label>
					</div>
					<div>
						<label>
							<input
								checked={filter.gender === 2 ? true : false}
								onChange={(e) => setFilter({ ...filter, gender: parseInt(e.currentTarget.value) })}
								type="radio"
								id="female"
								name="gender"
								value={2}
							/>
							雌性
						</label>
					</div>
					<div>
						<label>
							<input
								checked={filter.gender === 4 ? true : false}
								onChange={(e) => setFilter({ ...filter, gender: parseInt(e.currentTarget.value) })}
								type="radio"
								id="none"
								name="gender"
								value={4}
							/>
							无性别
						</label>
					</div>
					<div>
						<label>
							<input
								checked={filter.gender === 3 ? true : false}
								onChange={(e) => setFilter({ ...filter, gender: parseInt(e.currentTarget.value) })}
								type="radio"
								id="none"
								name="gender"
								value={3}
							/>
							不筛选性别
						</label>
					</div>
				</fieldset>
				<fieldset style={{ width: '70px' }}>
					<legend>ID升降序</legend>
					<label>
						<input onChange={() => setFilter({ ...filter, IDAsce: true })} type="radio" name="id" id="idAsc" checked={filter.IDAsce} />
						ID升序
					</label>
					<label>
						<input onChange={() => setFilter({ ...filter, IDAsce: false })} type="radio" name="id" id="idDesc" checked={!filter.IDAsce} />
						ID降序
					</label>
				</fieldset>
				<fieldset style={{ width: '80px', display: 'flex', flexDirection: 'column' }}>
					<legend>可否捕捉</legend>
					<label>
						<input
							type="radio"
							name="catch"
							value={1}
							checked={filter.canCatch === true}
							onChange={() => setFilter({ ...filter, canCatch: true })}
						/>
						可捕捉
					</label>
					<label>
						<input
							type="radio"
							name="catch"
							value={2}
							checked={filter.canCatch === false}
							onChange={() => setFilter({ ...filter, canCatch: false })}
						/>
						不可捕捉
					</label>
					<label>
						<input
							type="radio"
							name="catch"
							value={3}
							checked={filter.canCatch === undefined}
							onChange={() => setFilter({ ...filter, canCatch: undefined })}
						/>
						不筛选此项
					</label>
				</fieldset>
				<fieldset style={{ width: '230px', display: 'flex', flexDirection: 'column' }}>
					<legend>种族值设定</legend>
					<p>暂无法设置种族值</p>
				</fieldset>
				<fieldset style={{ width: '230px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
					<legend>根据技能查询</legend>
					<Link title='点我查找技能ID' style={{position: 'relative', top: 20, right: -95}} to='/skill'>?</Link>
					<input
						onKeyDown={(e) => {
							if (e.code === 'Enter') {
								if (e.currentTarget.value == '') {
									setResult(monsters);
									return;
								}
								const value = e.currentTarget.value;
								if (parseInt(value)) {
									let move = moves.find((item) => item.ID == parseInt(value));
									setSKILL_NAME(move?.Name as string);
									setResult(monsters.filter(item=>item.LearnableMoves.Move.find(_item=>_item.ID===parseInt(e.currentTarget.value))))
								} else {
									let move = moves.filter((item) => item.Name == value);
									let movesID = move.map(item=>item.ID);
									setResult(monsters.filter(item=>item.LearnableMoves.Move.find(_item=>movesID.includes(_item.ID))))
								}
							}
						}}
						onChange={(e) => {
							setSearchingSkillName(e.currentTarget.value);
						}}
						onFocus={() => setTipsVisible(true)}
						onBlur={() => setTipsVisible(false)}
						className={style.searchInput}
						type="text"
						placeholder="输入技能名称或ID，按回车以搜索"
					/>
					{/*<div
						id="提示框"
						style={{
							position: 'absolute',
							top: 52,
							backgroundColor: '#efef',
							width: '200px',
							display: TipsVisible ? 'block' : 'none',
							zIndex: 100,
						}}
					>
						{TipsVisible && (
							<ul style={{ height: 200, overflowY: 'scroll' }}>
								{searchingSkillName? Tips.map((item, index) => 
									<li
										className={style.tipsItem}
										style={{ padding: '3px 0px 3px 0px', cursor: 'pointer' }}
										key={index}
										onClick={() => {console.log('hi!');} }
									>
										{item}
									</li>
								):<p>Loading...</p>}
							</ul>
						)}
					</div>*/}
					{SKILL_NAME ? (
						<p style={{ marginTop: 5 }}>
							您正在查找包含技能&nbsp;<span style={{ color: 'red' }}>{SKILL_NAME}</span>&nbsp;的精灵
						</p>
					) : (
						<p style={{ marginTop: 5 }}>&nbsp;</p>
					)}
				</fieldset>
			</div>
			<div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', flex: 1, padding: '10px' }}>
				{result.slice((page - 1) * 9, page * 9).map((e) =>
					e.ID ? (
						<div style={{ marginRight: 18 }}>
							<PetCard key={e.ID} id={e.ID}></PetCard>
						</div>
					) : null
				)}
			</div>
			<div style={{ position: 'absolute', right: '30%', bottom: 46 }}>
				<PageSwitcher total={result.length} onePageNum={9} page={page} setPage={setPage}></PageSwitcher>
			</div>
			<p style={{ position: 'absolute', bottom: 0, right: 0 }}>共{result.length}个精灵</p>
		</div>
	);
};
