import PetCard from '../../components/Card/PetCard';
import { IPetBook } from '../../interface/iPetBook';
import styles from './home.module.css';
import { useContext } from 'react';
import { dataContext } from '../../utils/context';


export const Home = () => {
	const data = useContext(dataContext);
	const petBook: IPetBook = data.get('petbook');
	const version = data.get('version');
	return (
		<div className={styles.home}>
			<div className={styles.content}>
				<div className={styles.main}>
					<div className={styles.news}>
						<h2>本周更新精灵</h2>
						<div style={{ display: 'flex' }}>
							{petBook.root.Hotspot.item.place.map((place) =>
								place.type == 0 ? <PetCard key={place.ID} id={place.ID}></PetCard> : null
							)}
						</div>
					</div>
				</div>
			</div>
			<p style={{ margin: 0, fontSize: '10px', position: 'absolute', right: 0, bottom: 0 }}>版本号：{version}</p>
		</div>
	);
};
