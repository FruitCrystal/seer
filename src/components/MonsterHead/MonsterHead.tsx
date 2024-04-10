import styles from './MonsterHead.module.css';
import { BrifeMonsterInfo } from '../BrifeMonsterInfo/BrifeMonsterInfo';
import { MonsterBrief } from '../../interface/iPetBook';
export const MonsterHead = ({ id, name, info }: { id: number; name: string; info: MonsterBrief }) => {
	return (
		<div className={styles.head}>
			<a>
				<img className={styles.headimg} src={`https://seerh5.61.com/resource/assets/pet/head/${id}.png`}></img>
				<p style={{ position: 'relative', bottom: '30px', backgroundColor: '#00000080', color: 'white', width: '89px', left: '9px' }}>
					{name}
				</p>
			</a>
			<div className={styles.brifeInfo}>
				<BrifeMonsterInfo info={info}></BrifeMonsterInfo>
			</div>
		</div>
	);
};
