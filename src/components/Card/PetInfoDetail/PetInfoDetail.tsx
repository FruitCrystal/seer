import styles from './info.module.css';
import Power from './power/Power';
import SkillPanel from '../../SkillPanel/SkillPanel';
import { useContext } from 'react';
import { MonsterBrief, iMonsterDetail } from '../../../interface/iMonster';
import { dataContext } from '../../../utils/context';
import { iEffectIcon } from '../../../interface/iEffect';
import {iMove} from '../../../interface/iMove';

const PetInfoDetail = ({ monsterDetail, monsterBrief }: { monsterDetail: iMonsterDetail; monsterBrief: MonsterBrief }) => {
	const data = useContext(dataContext);
	const HunYin: iEffectIcon = data.get('effectIcon');
	/**
	 * @param ExtraMoveID 额外技能,包括特训给的第五技能，活动道具开启的第五技能，神谕给的第五技能
	 */
	const ExtraMoveID = [monsterDetail?.ExtraMove,monsterDetail.SpExtraMoves,monsterDetail.ExtraMoves?.Move];
	//const [effect, setEffect] = useState<string | undefined>();

	/**
	 * @param effect 魂印效果的文字描述
	 */
	const effect =  HunYin.root.effect.find((item) => item.petId === monsterDetail.ID)?.tips;

	console.log({'精灵名字:': monsterDetail.DefName, '魂印效果:': effect});
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
				gridTemplateColumns: '220px 0px 790px',
				position: 'relative',
				gridTemplateRows: '1fr',
				left: '8%',
				top: '10%',
				cursor: 'default',
			}}
		>
			<div style={{ backgroundColor: '#498' }}>
				<div
					style={{
						gridArea: '1/1',
						height: 25,
						lineHeight: '25px',
					}}
				>
					ID:{monsterBrief.ID}
				</div>
				<div style={{ display: 'flex', justifyContent: 'flex-start' }}>
					<div
						style={{
							height: 'auto',
							position: 'relative',
							left: 5,
						}}
					>
						<img
							src={`http://seerh5.61.com/resource/assets/pet/head/${monsterBrief.ID}.png`}
							alt=""
							height={65}
							width={65}
							className={styles.head}
						/>
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
								<img src={`http://seerh5.61.com/resource/assets/PetType/${monsterDetail.Type}.png`} alt="" width={24} height={24} />
								{monsterBrief.Type}
							</div>
						</div>
					</div>
				</div>
				<div>
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
					//有没有魂印,决定显示与否,这里先假定没有魂印(f)
					style={{ display :effect? 'block' : 'none', marginTop: 18, overflowY: 'scroll', height: '244px' }}
				>
					<p style={{ fontSize: 20, color: 'gold' }}>魂印:</p>
					{effect?.split('；').map((item, index) => (
						<div style={{ marginBottom: 5 }} key={index}>
							<span style={{ color: 'turquoise' }}>效果{index + 1}：</span>
							{item}
						</div>
					))}
				</div>
			</div>
			<div style={{ backgroundColor: '#198', overflow: 'hidden' }}>
				<div
					style={{
						position: 'relative',
					}}
				>
					<img src={`https://seerh5.61.com/resource/assets/fightResource/pet/11.png`} alt="" className={styles.head} />
				</div>
			</div>
			<div style={{ backgroundColor: '#fff', display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', justifyContent: 'flex-start' }}>
				{monsterDetail.LearnableMoves.Move.map((item) => (
					<SkillPanel
						key={item.ID}
						moveID={item.ID}
						learningLv={item.LearningLv}
					></SkillPanel>
					))}
					{
						ExtraMoveID.map((item,index)=>item? <SkillPanel key={index} moveID={item.ID} learningLv={item.LearningLv? item.LearningLv : 0}></SkillPanel> : null)
					}
			</div>
		</div>
	);
};
PetInfoDetail.displayName = 'PetInfoDetail';
export default PetInfoDetail;
