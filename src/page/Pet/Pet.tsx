import { useContext, useEffect, useState } from 'react';
import iMonster, { IMonsterBrief, IPetBook, iMonsterDetail } from '../../interface/iMonster';
import PetCard from '../../components/Card/PetCard';
import { dataContext } from '../../utils/context';
import { FilterContextProps, filterContext } from './../../utils/filterContext';
import style from './Pet.module.css';
import {TYPE_MAP} from '../../utils/commonData';
import PageSwitcher from '../../components/PageSwitcher/PageSwitcher';
export const Pet = () => {
	const _filter = useContext(filterContext);
	const data = useContext(dataContext);
	const monstersData:iMonster = data.get('monsters');
	const monsters:iMonsterDetail[]= monstersData.Monsters.Monster.filter(e=>e.ID<=5000);
	const [filter, setFilter] = useState<FilterContextProps>({ keyword: undefined, gender: undefined ,type:0,IDAsce:true,canCatch:false});
	const [result,setResult] = useState<iMonsterDetail[]>([]);
	const [page,setPage] =useState(1);
	//const monsters = petBook.root.Monster.find((e) => e.ID == filter?.keyword);
	
	function doSearch() {
		setPage(1)
		let RESUTL:iMonsterDetail[] = monsters
		if (filter.keyword){
			!Number.isNaN(parseInt(filter.keyword as string)) ?  RESUTL = monsters.filter((e) => e.ID == filter.keyword):RESUTL = monsters.filter((e) => e.DefName.includes(filter.keyword as string))
			//console.log(RESUTL);
		}
		if(filter.type){
			RESUTL = RESUTL.filter((e) => e.Type === filter.type)
			//console.log(RESUTL);
		}
		if(filter.gender){
			switch (filter.gender) {
				case 1://雄性
					RESUTL = RESUTL.filter((e) => e.Gender === 1);
					break;
				case 2://雌性
					RESUTL = RESUTL.filter((e) => e.Gender === 2);
					break;
				case 3://不筛选性别
					RESUTL = RESUTL;
					break;
				case 4://无性别
					RESUTL = RESUTL.filter((e) => e.Gender === 0 || e.Gender === undefined);
					break;
			}
			//if(filter.canCatch){
			//	RESUTL = RESUTL.filter((e) => e.CatchRate>0);
			//}
		}
		setResult(RESUTL);
		console.log(RESUTL);
		return RESUTL;
	}
	useEffect(()=>{
		console.log("条件改变");
		doSearch();
	},[filter.IDAsce,filter.keyword,filter.type,filter.gender,filter.canCatch])
	return (
		<div>
			<div
				className={style.search_bar}
				style={{
					fontSize: '12px',
					display: 'flex',
					height: '77px',
					backgroundColor: '#f2f2f2',
				}}
			>
				<label>
					<input
					onKeyDown={(e) => e.code === 'Enter' && setFilter({...filter, keyword: e.currentTarget.value})}
					className={style.searchInput}
					type="text"
					placeholder="输入精灵ID或名称，按回车以搜索" />
				</label>
				<fieldset>
					<legend>属性</legend>
					<select onChange={(e) => setFilter({...filter, type: parseInt(e.currentTarget.value)})}>
						{Array.from(TYPE_MAP.keys()).map((key) => <option value={key} key={key}>{TYPE_MAP.get(key)}</option>)}
					</select>
					<div>
						<img src={`http://seerh5.61.com/resource/assets/PetType/${filter.type}.png`} alt="" />
					</div>
				</fieldset>
				<fieldset>
					<legend>筛选精灵性别</legend>
					<div>
						<label>
							<input onChange={(e) => setFilter({...filter, gender: parseInt(e.currentTarget.value)})} type="radio" id="male" name="gender" value={1} />
							雄性
						</label>
					</div>
					<div>
						<label>
							<input onChange={(e) => setFilter({...filter, gender: parseInt(e.currentTarget.value)})} type="radio" id="female" name="gender" value={2} />
							雌性
						</label>
					</div>
					<div>
						<label>
							<input onChange={(e) => setFilter({...filter, gender: parseInt(e.currentTarget.value)})} type="radio" id="none" name="gender" value={4} />
							无性别
						</label>
					</div>
					<div>
						<label>
							<input onChange={(e) => setFilter({...filter, gender: parseInt(e.currentTarget.value)})} type="radio" id="none" name="gender" value={3} />
							不筛选性别
						</label>
					</div>
				</fieldset>
				<fieldset style={{width: '70px'}}>
					<legend>ID升降序</legend>
					<label>
						<input onChange={(e) => setFilter({...filter, IDAsce: true})} type="radio" name="id" id="idAsc" checked={filter.IDAsce} />
						ID升序
					</label>
					<label>
						<input onChange={(e) => setFilter({...filter, IDAsce: false})} type="radio" name="id" id="idDesc" checked={filter.IDAsce} />
						ID降序
					</label>
				</fieldset>
				<fieldset  style={{width: '80px', display: 'flex',flexDirection: 'column'}}>
					<legend>可否捕捉</legend>
					<label>
						<input type="radio" name='catch' onChange={() => setFilter({...filter, canCatch: true})} />可捕捉
					</label>
					<label>
						<input type="radio" name='catch' onChange={() => setFilter({...filter, canCatch: false})} />不可捕捉
					</label>
				</fieldset>
				<fieldset  style={{width: '230px', display: 'flex',flexDirection: 'column'}}>
					<legend>种族值设定</legend>
					<p>暂无法设置种族值</p>
				</fieldset>
			</div>
			<div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', flex: 1, padding: '10px' }}>
			{result.slice((page-1)*9,page*9).map((e) =>e.ID?<PetCard key={e.ID} id={e.ID}></PetCard>:null)}
			</div>
			<div style={{position:'absolute',right:"23%",bottom:46}}><PageSwitcher total={result.length} onePageNum={9} page={page} setPage={setPage}></PageSwitcher></div>
			<p style={{position:"absolute" ,bottom:0,right:0}} >共{result.length}个精灵</p>
		</div>
	);
};
