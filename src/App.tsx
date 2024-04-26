import {  useEffect, useState } from 'react';
import './App.css';
import { PROGRESS_MAP, init } from './utils/init';
import Loading from './components/Loading/Loading';
import { Home } from './page/Home/Home';
import { dataContext } from './utils/context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Pet } from './page/Pet/Pet';
import Nav from './components/Nav/Nav';
import {Item} from './page/Item/Item';
import {Skill} from './page/Skill/Skill';
import {Counter} from './page/Counter/Counter';

function App() {
	const length = PROGRESS_MAP.size;
	const [data, setData] = useState(
		new Map<
			| 'version'
			| 'monsters'
			| 'moves'
			| 'hide_moves'
			| 'items'
			| 'itemsTip'
			| 'gems'
			| 'equip'
			| 'effectDes'
			| 'effectInfo'
			| 'effectIcon'
			| 'effectbuff'
			| 'petbook'
			| 'skillTypes'
			| 'suit'
			| 'pet_skin'
			| 'ogre'
			| 'movesLang'
			| 'bossEffectIcon'
			| 'pvp_ban',
			any
		>()
	);

	useEffect(() => {
		init(setProgress).then((res) => {
			setData(res);
		});
	}, []);
	//用于展示更新进度
	const [progress, setProgress] = useState({ item: '', index: 0 });

	return (
		<div>
			<dataContext.Provider value={data}>
				{progress.index != length-1 ? (
					<Loading width={progress.index * length} item={PROGRESS_MAP.get(progress.item) as string}></Loading>
				) : (
						<div style={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw'}}>
						<BrowserRouter>
							<Nav></Nav>
							<Routes>
									<Route path="/" element={<Home></Home>}></Route>
									<Route path="/home" element={<Home></Home>}></Route>
									<Route path="/pet" element={<Pet></Pet>}></Route>
									<Route path="/item" element={<Item></Item>}></Route>
									<Route path={`/skill/:id?`} element={<Skill></Skill>}></Route>
									<Route path="/counter" element={<Counter></Counter>}></Route>
							</Routes>
						</BrowserRouter>
					</div>
				)}
			</dataContext.Provider>
		</div>
	);
}

export default App;
