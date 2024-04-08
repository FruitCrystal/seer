import PetCard from '../../components/Card/PetCard';
import { IPetBook, brife_info } from '../../interface/iPetBook';
import styles from './home.module.css';
import iMonster, { iMonsterDetail } from '../../interface/iMonster';
export const Home = ({ version, monsterBrief, monsterDetail }: { version: string; monsterBrief: IPetBook; monsterDetail: iMonster }) => {
	console.log();
	return (
		<div className={styles.home}>
			<div className={styles.content}>
				<div className={styles.news}>
					<h1>本周更新精灵</h1>
					<div style={{ display: 'flex' }}>
						{monsterBrief.root.Hotspot.item.place.map((place) =>
							place.type == 0 ? (
								<PetCard
									monsterDetail={monsterDetail.Monsters.Monster.find((e) => e.ID === place.ID) as iMonsterDetail}
									monsterBrief={monsterBrief.root.Monster.find((e) => e.ID === place.ID) as brife_info}
								></PetCard>
							) : //<MonsterHead
							//key={place.ID}
							//id={place.ID}
							//name={petbook.root.Monster.find((e) => e.ID === place.ID)?.DefName as string}
							//info={petbook.root.Monster.find((e) => e.ID === place.ID) as brife_info}
							//></MonsterHead>
							null
						)}
					</div>
				</div>
			</div>
			<p style={{ margin: 0, fontSize: '10px', position: 'absolute', right: 0, bottom: 0 }}>版本号：{version}</p>
		</div>
	);
};
