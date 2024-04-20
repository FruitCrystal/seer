import { useContext, useState } from 'react';
import styles from './PetCard.module.css';
import PetInfoDetail from './PetInfoDetail/PetInfoDetail';
import  { IPetBook } from '../../interface/iMonster';
import { MonsterBrief } from '../../interface/iPetBook';
import {dataContext} from '../../utils/context';
import {TYPE_MAP} from '../../utils/commonData';

/**
 *
 * 精灵展示卡,包含了精灵的名称,简介信息,身高体重,ID,系别,种族值
 */
const PetCard = ({id}:{id:number}) => {
	const [overLay, setOverLay] = useState(false);
	const data = useContext(dataContext);
	const monsterDetail = data.get('monsters').Monsters.Monster.find((item: {ID: number;}) => item.ID === id);
	const pet_book:IPetBook = data.get('petbook')
	const monsterBrief = pet_book.root.Monster.find((item: MonsterBrief) => item.ID === id) as MonsterBrief;

	return (
		<div className={styles.pet_card} onClick={() => setOverLay(true)}>
			<div
				onClick={(e) => {
					setOverLay(false);
					e.stopPropagation();
				}}
				style={{
					display: !overLay ? 'none' : 'flex',
					width: '100%',
					height: '100%',
					backgroundColor: '#000b',
					position: 'absolute',
					zIndex: 999,
					margin: '0 auto',
					top: 0,
					left: 0,
				}}
			>
				<PetInfoDetail
					petID={id}
					></PetInfoDetail>
			</div>
			<div>
				<img
				/**@ts-ignore */
					onError={(e) => {e.target.src = 'https://seerh5.61.com/resource/assets/pet/head/1.png'}}
					src={`http://seerh5.61.com/resource/assets/pet/head/${monsterDetail.ID}.png`}
					alt=""
					height={65}
					width={65}
					className={styles.head}
				/>
			</div>
			<div className={styles.detail}>
				<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
					<div className={styles.name}>
						<div className={styles.fullname} style={{ display: 'none', position: 'absolute' }}>
							<li>{monsterDetail.DefName}</li>
						</div>
						<p
							style={{
								fontSize: '1.3rem',
								textOverflow: 'ellipsis',
								height: 24,
								marginRight: 12,
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								width: 83,
							}}
						>
							{monsterDetail.DefName}
						</p>
						<div>
							<img src={`http://seerh5.61.com/resource/assets/PetType/${monsterDetail.Type}.png`} alt="" width={24} height={24}></img>
						</div>
						<div>
							<p style={{ fontSize: '.7rem' }}>ID：{monsterDetail.ID}</p>
							<p style={{ fontSize: '0.7rem' }}>{TYPE_MAP.get(monsterDetail.Type)}系</p>
						</div>
					</div>
					<div style={{ marginRight: 8, display: 'flex' }}>
						{monsterBrief?<div>
							<p style={{ fontSize: '11px' }}>身高：{monsterBrief.Height}cm</p>
							<p style={{ fontSize: '11px' }}>体重：{monsterBrief.Weight}kg</p>
						</div>:<div>
							<p style={{ fontSize: '11px' }}>身高：暂无信息</p>
							<p style={{ fontSize: '11px' }}>体重：暂无信息</p>
						</div>}
					</div>
				</div>
				<div className={styles.des}>
					<p
						style={{
							height:51,
							fontSize: 12,
							marginRight: 3,
						}}
					>
						{monsterBrief? monsterBrief.Features :"暂无信息"}
					</p>
				</div>
				<div style={{ fontSize: 12 }} />
				<div className={styles.telent}>
					<table>
						<thead>
							<tr>
								<th>攻击</th>
								<th>防御</th>
								<th>特攻</th>
								<th>特防</th>
								<th>速度</th>
								<th>体力</th>
								<th>总和</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{monsterDetail.Atk}</td>
								<td>{monsterDetail.Def}</td>
								<td>{monsterDetail.SpAtk}</td>
								<td>{monsterDetail.SpDef}</td>
								<td>{monsterDetail.Spd}</td>
								<td>{monsterDetail.HP}</td>
								<td style={{ color: 'blue', fontSize: 20 }}>{monsterDetail.Atk + monsterDetail.Def + monsterDetail.SpAtk + monsterDetail.SpDef + monsterDetail.Spd + monsterDetail.HP}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default PetCard;
