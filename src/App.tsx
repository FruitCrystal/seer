import { useContext, useEffect, useState } from 'react';
import './App.css';
import { init } from './utils/init';
import Loading from './components/Loading/Loading';
import { PROGRESS_MAP } from './interface/iData';
import { Home } from './page/Home/Home';
import { dataContext } from './utils/context';

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
			| 'ogre',
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
				{progress.index != 17 ? (
					<Loading width={progress.index * 20} item={PROGRESS_MAP.get(progress.item) as string}></Loading>
				) : (
					<Home version={data.get('version')} ></Home>
				)}
			</dataContext.Provider>
		</div>
	);
}

export default App;
