import styles from './info.module.css';
import Power from './power/Power';
import SkillPanel from '../../SkillPanel/SkillPanel';
import { useContext, useState } from 'react';
import { iMonsterDetail } from '../../../interface/iMonster';
import { dataContext } from '../../../utils/context';
import { iEffectIcon } from '../../../interface/iEffect';
import { MonsterHead } from '../../MonsterHead/MonsterHead';
import { IMoveLang } from '../../../interface/iMoveLang';
import PageSwitcher from '../../PageSwitcher/PageSwitcher';
import { TYPE_MAP } from '../../../utils/commonData';
import iPetAdvance from '../../../interface/Monster';
import {sum} from '../../../utils/tools';
const PetInfoDetail = ({ petID }: { petID: number }) => {
	const [page, setPage] = useState(1);
	const data = useContext(dataContext);
	const HunYin: iEffectIcon = data.get('effectIcon');
	const LangsData: IMoveLang = data.get('movesLang');
	const Lang = LangsData.root.moves.find((item) => item.id === petID);
	const Langs = Lang?.lang;
	const monsterDetail: iMonsterDetail = data.get('monsters').Monsters.Monster.find((item: { ID: number }) => item.ID === petID);

	const petAdvance:iPetAdvance = data.get('pet_advance');
	const totalRace = monsterDetail.Atk + monsterDetail.Def + monsterDetail.HP + monsterDetail.Spd + monsterDetail.SpAtk + monsterDetail.SpDef
	const advanceInfo = petAdvance.root.Task.find((item) => item.Advances.MonsterId === petID);
	const [Advance, setShowAdvance] = useState(false);
	const advanceEffectIcon = HunYin.root.effect.find((item) => item.Id === advanceInfo?.Advances.AdvEffect.Id)?.tips;
	/**
	 * 0 体力
	 * 1 攻击
	 * 2 防御
	 * 3 特攻
	 * 4 特防
	 * 5 速度
	 */
	let newRace: string[] = advanceInfo? advanceInfo.Advances.Race.NewRace.split(' ')	: [];
	//const pet_book: IPetBook = data.get('petbook');
	//const monsterBrief = pet_book.root.Monster.find((item: IMonsterBrief) => item.ID === petID) as IMonsterBrief;
	
	/**
	 * @param ExtraMoveID 额外技能,包括特训给的第五技能，活动道具开启的第五技能，神谕给的第五技能
	 */
	const ExtraMovesID = monsterDetail.ExtraMoves;
	const ExtraMoveID = monsterDetail.ExtraMove;
	const spExtraMoveID = monsterDetail.SpExtraMoves;
	const AdvMoves = monsterDetail.LearnableMoves.AdvMove;
	const spMove = monsterDetail.LearnableMoves.SpMove;
	//let num = 0;
	//num += monsterDetail.LearnableMoves.Move.length;
	//AdvMoves?.length ? (num += AdvMoves.length) : null;
	//ExtraMovesID ? (num += 1) : null;
	//spExtraMoveID ? (num += 1) : null;
	//ExtraMoveID ? (num += 1) : null;
	//console.log(num);
	console.log(AdvMoves);
	const AllMoves: any[] = [];
	monsterDetail.LearnableMoves.Move.map((item) => AllMoves.push({move:item,mark:0}));
	ExtraMoveID ? AllMoves.push({move:ExtraMoveID,mark:2}) : null;
	AdvMoves?.map((item) => AllMoves.push({move:item,mark:2}));
	spExtraMoveID ? AllMoves.push({move:spExtraMoveID.Move,mark:1}) : null;
	ExtraMovesID ? AllMoves.push({move:ExtraMovesID.Move,mark:1}) : null;
	spMove? AllMoves.push({move:spMove[0],mark:2}) : null;
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
				gridTemplateColumns: '220px 800px',
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
					ID:{monsterDetail.ID}
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div
						style={{
							height: 'auto',
							position: 'relative',
							left: 5,
						}}
					>
						<MonsterHead id={monsterDetail.ID} advance={advanceInfo?true:false}></MonsterHead>
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
							<div style={{color:'lightblue',fontSize:15}}>{monsterDetail.DefName}</div>
							<div style={{display:'flex',alignItems:'center',fontSize:14}}>
								<img src={`http://seerh5.61.com/resource/assets/PetType/${monsterDetail.Type}.png`} alt="" width={24} height={24} />
								{TYPE_MAP.get(monsterDetail.Type) + '系'}
							</div>
						</div>
					</div>
				</div>
				<div style={{position:'relative'}}>
					<div style={{ fontSize: 20, color: 'gold' }}>
						种族值:
						{Advance?totalRace:sum(newRace)?sum(newRace):totalRace}

					</div>
					{advanceInfo&&<div className={styles.advance_switcher} style={{color:!Advance?'greenyellow':'#000000',textShadow:!Advance?'0 0 3px black':'none',cursor:'pointer'}} onClick={() => setShowAdvance(!Advance)}>当前：{Advance?'未进阶':'进阶'}</div>}
					<div className={styles.chart}>
						<div style={{ marginLeft: 8, marginTop: 6 }}>
							{
								!Advance&&advanceInfo?
								<div>
									<Power item={'攻击'} value={~~newRace[1]}></Power>
									<Power item={'特攻'} value={~~newRace[3]}></Power>
									<Power item={'速度'} value={~~newRace[5]}></Power>
									<Power item={'防御'} value={~~newRace[2]}></Power>
									<Power item={'特防'} value={~~newRace[4]}></Power>
									<Power item={'体力'} value={~~newRace[0]}></Power>
							</div>:
							<div>
								<Power item={'攻击'} value={monsterDetail.Atk}></Power>
								<Power  item={'特攻'} value={monsterDetail.SpAtk}></Power>
								<Power item={'速度'} value={monsterDetail.Spd}></Power>
								<Power item={'防御'} value={monsterDetail.Def}></Power>
								<Power  item={'特防'} value={monsterDetail.SpDef}></Power>
								<Power  item={'体力'} value={monsterDetail.HP}></Power>
							</div>
							}
						</div>
					</div>
				</div>
				<div
					className={styles.effect}
					//有没有魂印,决定显示与否
					style={{ display: effect ? 'block' : 'none', paddingTop: 18, overflowY: 'scroll',height:235 }}
				>
					<p style={{ fontSize: 20, color: 'gold' }}>{!Advance&&advanceInfo?'进阶':''}魂印:</p>
					{!Advance&&advanceInfo?advanceEffectIcon?.split('|').map((item, index) => (
						<div style={{ marginBottom: 5 }} key={index}>
							&nbsp;&nbsp;{item}
						</div>
					)):effect?.split('|').map((item, index) => (
						<div style={{ marginBottom: 5 }} key={index}>
							&nbsp;&nbsp;{item}
						</div>
					))}
				</div>
				{Lang ? (
					<div
						className={styles.effect}
						//有没有场景喊话,决定显示与否
						style={{ display: Lang ? 'block' : 'none', paddingTop: 18, overflowY: 'scroll',height:235 }}
					>
						<p style={{ fontSize: 20, color: 'gold' }}>场景喊话:</p>
						{/**@ts-ignore*/}
						{Langs?.length?Lang.lang.map((item, index) => (
							<ul key={index}>
								<li style={{ marginBottom: 10 }}>{index + 1 + '：' + item._text}</li>
							</ul>
							/**@ts-ignore */
						)):<ul><li style={{ marginBottom: 10 }}>1：{Langs._text}</li></ul>}
					</div>
				) : null}
			</div>

			<div className={styles.right}>
				{AllMoves.slice((page - 1) * 25, page * 25).map((item,index) => (
					<div key={index} style={{position: 'relative'}}>
						{item.mark==1?<p style={{position: 'absolute', bottom: 8, right: 7, fontSize: 12, color: 'rgb(165,187,177)',zIndex: 100}}>第五技能</p>:item.mark==2?<p style={{position: 'absolute', bottom: 8, right: 7, fontSize: 12, color: 'rgb(165,187,177)',zIndex: 100}}>追加技能</p>:null}
						<SkillPanel key={index} moveID={item.move.ID? item.move.ID : 10001} learningLv={item.move.LearningLv ? item.move.LearningLv : 0}></SkillPanel>
					</div>
				))}

				<div style={{ position: 'absolute', bottom: 10, right: '20%' }}>
					<PageSwitcher onePageNum={25} page={page} setPage={setPage} total={AllMoves.length}></PageSwitcher>
				</div>
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
