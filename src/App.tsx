import {  useEffect, useState } from 'react';
import './App.css';
import { PROGRESS_MAP, init } from './utils/init';
import Loading from './components/Loading/Loading';
import { Home } from './page/Home/Home';
import { dataContext } from './utils/context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Pet } from './page/Pet/Pet';
import Nav from './components/Nav/Nav';

function App() {
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
				{progress.index != 20 ? (
					<Loading width={progress.index * 20} item={PROGRESS_MAP.get(progress.item) as string}></Loading>
				) : (
						<div style={{ display: 'flex', flexDirection: 'row', height: '100vh', width: '100vw' }}>
						<BrowserRouter>
							<Nav></Nav>
							<Routes>
									<Route path="/" element={<Home></Home>}></Route>
									<Route path="/pet" element={<Pet></Pet>}></Route>
							</Routes>
						</BrowserRouter>
					</div>
				)}
			</dataContext.Provider>
		</div>
	);
}

export default App;
