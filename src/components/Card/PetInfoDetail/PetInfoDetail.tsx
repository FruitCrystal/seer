import styles from './info.module.css';
import Power from './power/Power';
import SkillPanel from '../../SkillPanel/SkillPanel';
import { useContext, useState } from 'react';
import { IPetBook, IMonsterBrief, iMonsterDetail } from '../../../interface/iMonster';
import { dataContext } from '../../../utils/context';
import { iEffectIcon } from '../../../interface/iEffect';
import { MonsterHead } from '../../MonsterHead/MonsterHead';
import { IMoveLang } from '../../../interface/iMoveLang';
import PageSwitcher from '../../PageSwitcher/PageSwitcher';

const PetInfoDetail = ({ petID }: { petID: number }) => {

	const [page, setPage] = useState(1);
	const data = useContext(dataContext);
	const LangsData: IMoveLang = data.get('movesLang');
	const Lang = LangsData.root.moves.find((item) => item.id === petID);
	const monsterDetail: iMonsterDetail = data.get('monsters').Monsters.Monster.find((item: { ID: number }) => item.ID === petID);
	const pet_book: IPetBook = data.get('petbook');
	const monsterBrief = pet_book.root.Monster.find((item: IMonsterBrief) => item.ID === petID) as IMonsterBrief;
	
	const HunYin: iEffectIcon = data.get('effectIcon');
	/**
	 * @param ExtraMoveID 额外技能,包括特训给的第五技能，活动道具开启的第五技能，神谕给的第五技能
	 */
	const ExtraMovesID = monsterDetail.ExtraMoves;
	const ExtraMoveID = monsterDetail.ExtraMove;
	const spExtraMoveID = monsterDetail.SpExtraMoves;
	const AdvMoves = monsterDetail.LearnableMoves.AdvMove;
	//let num = 0;
	//num += monsterDetail.LearnableMoves.Move.length;
	//AdvMoves?.length ? (num += AdvMoves.length) : null;
	//ExtraMovesID ? (num += 1) : null;
	//spExtraMoveID ? (num += 1) : null;
	//ExtraMoveID ? (num += 1) : null;
	//console.log(num);

	const AllMoves:any[] = [];
	monsterDetail.LearnableMoves.Move.map((item) => AllMoves.push(item));
	AdvMoves?.map((item) => AllMoves.push(item));
	ExtraMoveID ? AllMoves.push(ExtraMoveID) : null;
	spExtraMoveID ? AllMoves.push(spExtraMoveID.Move) : null;
	ExtraMovesID ? AllMoves.push(ExtraMovesID.Move) : null;
	//console.log(AllMoves);
	/**
	 * @param effect 魂印效果的文字描述
	 */
	const effect = HunYin.root.effect.find((item) => item.petId === monsterDetail.ID)?.tips;

	//console.log({'精灵名字:': monsterDetail.DefName, '魂印效果:': effect});
	return (
		<div
			className={styles.main}
			onClick={(e) => {
				e.stopPropagation();
			}}
			style={{
				height: '75%',
				backgroundColor: '#fff',
				display: 'grid',
				gridTemplateColumns: '220px 790px',
				position: 'relative',
				gridTemplateRows: '1fr',
				left: '8%',
				top: '10%',
				cursor: 'default',
			}}
		>
			<div className={styles.left}>
				<div
					style={{
						gridArea: '1/1',
						height: 25,
						lineHeight: '25px',
					}}
				>
					ID:{monsterBrief.ID}
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div
						style={{
							height: 'auto',
							position: 'relative',
							left: 5,
						}}
					>
						<MonsterHead id={monsterBrief.ID}></MonsterHead>
						{/*<img
							src={`http://seerh5.61.com/resource/assets/pet/head/${monsterBrief.ID}.png`}
							alt=""
							height={65}
							width={65}
							className={styles.head}
						/>*/}
					</div>
					<div>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-around',
								height: 65,
								minWidth: 100,
								fontSize: 15,
								alignItems: 'center',
								marginLeft: 10,
							}}
						>
							<div>{monsterBrief.DefName}</div>
							<div>
								<img loading='lazy' src={`http://seerh5.61.com/resource/assets/PetType/${monsterDetail.Type}.png`} alt="" width={24} height={24} />
								{monsterBrief.Type + '系'}
							</div>
						</div>
					</div>
				</div>
				<div style={{}}>
					<div style={{ fontSize: 20, color: 'gold' }}>
						种族值:
						{monsterDetail.Atk + monsterDetail.Def + monsterDetail.HP + monsterDetail.Spd + monsterDetail.SpAtk + monsterDetail.SpDef}
					</div>
					<div className={styles.chart}>
						<div style={{ marginLeft: 8, marginTop: 6 }}>
							<Power item={'攻击'} value={monsterDetail.Atk}></Power>
							<Power item={'特攻'} value={monsterDetail.SpAtk}></Power>
							<Power item={'速度'} value={monsterDetail.Spd}></Power>
							<Power item={'防御'} value={monsterDetail.Def}></Power>
							<Power item={'特防'} value={monsterDetail.SpDef}></Power>
							<Power item={'体力'} value={monsterDetail.HP}></Power>
						</div>
					</div>
				</div>
				<div
					className={styles.effect}
					//有没有魂印,决定显示与否
					style={{ display: effect ? 'block' : 'none', marginTop: 18, overflowY: 'scroll', height: '244px' }}
				>
					<p style={{ fontSize: 20, color: 'gold' }}>魂印:</p>
					{effect?.split('；').map((item, index) => (
						<div  style={{ marginBottom: 5 }} key={index}>
							<span style={{ color: 'turquoise' }}>效果{index + 1}：</span>
							{item}
						</div>
					))}
				</div>
				{Lang ? (
					<div
						className={styles.effect}
						//有没有场景喊话,决定显示与否
						style={{ display: Lang ? 'block' : 'none', marginTop: 18, overflowY: 'scroll', height: '244px' }}
					>
						<p style={{ fontSize: 20, color: 'gold' }}>场景喊话:</p>
						{Lang.lang.map((item, index) => (
							<ul key={index}>
								<li style={{ marginBottom: 10 }}>{index + 1 + '：' + item._text}</li>
							</ul>
						))}
					</div>
				) : null}
			</div>

			<div className={styles.right}>
				{AllMoves.slice((page -1)*25,page*25).map((item) => <SkillPanel key={item.ID} moveID={item.ID} learningLv={item.LearningLv? item.LearningLv : 0}></SkillPanel>)}
				
				<div style={{position: 'absolute', bottom: 10,right:'20%'}}><PageSwitcher onePageNum={25} page={page} setPage={setPage} total={AllMoves.length}></PageSwitcher></div>
				{/*{monsterDetail.LearnableMoves.Move.map((item) => (
					<SkillPanel key={item.ID} moveID={item.ID} learningLv={item.LearningLv}></SkillPanel>
				))}
				{ExtraMovesID != undefined ? <SkillPanel moveID={ExtraMovesID?.Move.ID as number}></SkillPanel> : null}
				{ExtraMoveID != undefined ? <SkillPanel moveID={ExtraMoveID.ID as number}></SkillPanel> : null}
				{spExtraMoveID ? <SkillPanel moveID={spExtraMoveID.Move.ID as number}></SkillPanel> : null}
				{AdvMoves != undefined ? AdvMoves.map((item) => <SkillPanel moveID={item.ID}></SkillPanel>) : null}*/}
				<p style={{ position: 'absolute', bottom: 10, right: 10, fontSize: 16, color: 'black' }}>一共{AllMoves.length}个技能</p>
			</div>
		</div>
	);
};
PetInfoDetail.displayName = 'PetInfoDetail';
export default PetInfoDetail;
