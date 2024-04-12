import PetCard from '../../components/Card/PetCard';
import { IPetBook, MonsterBrief } from '../../interface/iPetBook';
import styles from './home.module.css';
import iMonster, { iMonsterDetail } from '../../interface/iMonster';
import { Pet } from '../Pet/Pet';
import { useContext } from 'react';
import { dataContext } from '../../utils/context';
export const Home = ({ version }: { version: string }) => {
	const data = useContext(dataContext);
	const petBook: IPetBook = data.get('petbook');
	const monsterDetail: iMonster = data.get('monsters');
	return (
		<div className={styles.home}>
			<div className={styles.content}>
				<div className={styles.news}>
					<h5>本周更新精灵</h5>
					<div style={{ display: 'flex' }}>
						{petBook.root.Hotspot.item.place.map((place) =>
							place.type == 0 ? (
								<PetCard
									key={place.ID}
									monsterDetail={monsterDetail.Monsters.Monster.find((e) => e.ID === place.ID) as iMonsterDetail}
									monsterBrief={petBook.root.Monster.find((e) => e.ID === place.ID) as MonsterBrief}
								></PetCard>
							) : null
						)}
					</div>
				</div>
				<div>
					<Pet monsterDetail={monsterDetail} monsterBrief={petBook.root.Monster}></Pet>
				</div>
			</div>
			<p style={{ margin: 0, fontSize: '10px', position: 'absolute', right: 0, bottom: 0 }}>版本号：{version}</p>
		</div>
	);
};
