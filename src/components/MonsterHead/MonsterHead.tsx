import styles from './MonsterHead.module.css';
export const MonsterHead = ({ id,advance }: { id: number,advance?:boolean}) => {
	return (
		<div className={styles.head} >
			<a>
				{/* @ts-ignore */}
				<img style={{border: advance?'rgba(254, 207, 118, 0.948) solid 3px':'rgba(0, 0, 0, 0.5) solid 3px'}} width={65} height={65} onError={(e) => {e.target.src = 'https://seerh5.61.com/resource/assets/pet/head/1.png'}} className={styles.headimg} src={`https://seerh5.61.com/resource/assets/pet/head/${id}.png`}></img>
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
