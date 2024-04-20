import styles from './MonsterHead.module.css';
export const MonsterHead = ({ id }: { id: number}) => {
	return (
		<div className={styles.head}>
			<a>
				{/* @ts-ignore */}
				<img onError={(e) => {e.target.src = 'https://seerh5.61.com/resource/assets/pet/head/1.png'}} className={styles.headimg} src={`https://seerh5.61.com/resource/assets/pet/head/${id}.png`}></img>
				{/*<p style={{ position: 'relative', bottom: '0px', backgroundColor: '#00000080', color: 'white', width: '89px', left: '8px' }}>
					{name}
				</p>*/}
			</a>
			{/*<div className={styles.brifeInfo}>
				<BrifeMonsterInfo info={info}></BrifeMonsterInfo>
			</div>*/}
		</div>
	);
};
