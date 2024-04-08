import styles from './info.module.css';
import Power from './power/Power';
import SkillPanel from '../../SkillPanel/SkillPanel';
import {memo} from 'react';

const PetInfoDetail = memo(
	() => {
		//const [skills, setSkills] = useState(new Map<number, iMove>());
		//const SKILLS_MAP = new Map<number, iMove>();
		//moves.map((item) => SKILLS_MAP.set(item.ID, item));
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
						ID:{1}
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
								src={`http://seerh5.61.com/resource/assets/pet/head/1.png`}
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
								<div>精灵名字</div>
								<div>
									<img src={`http://seerh5.61.com/resource/assets/PetType/5.png`} alt="" width={24} height={24} />
									电
								</div>
							</div>
						</div>
					</div>
					<div>
						<div style={{ fontSize: 20, color: 'gold' }}>种族值:{500}</div>
						<div className={styles.chart}>
							<div style={{ marginLeft: 8, marginTop: 6 }}>
								<Power item={'攻击'} value={100}></Power>
								<Power item={'特攻'} value={100}></Power>
								<Power item={'速度'} value={100}></Power>
								<Power item={'防御'} value={100}></Power>
								<Power item={'特防'} value={100}></Power>
								<Power item={'体力'} value={100}></Power>
							</div>
						</div>
					</div>
					<div
						className={styles.effect}
						//有没有魂印,决定显示与否,这里先假定没有魂印(f)
						style={{ display: false ? 'block' : 'none', marginTop: 18, overflowY: 'scroll', height: '244px' }}
					>
						<p style={{ fontSize: 20, color: 'gold' }}>魂印:</p>
						{/*{effect?.tips.split('；').map((item, index) => (
							<div style={{ marginBottom: 5 }} key={index}>
								<span style={{ color: 'turquoise' }}>效果{index + 1}：</span>
								{item}
							</div>
						))}*/}
					</div>
				</div>
				<div style={{ backgroundColor: '#198', overflow: 'hidden' }}>
					<div
						style={{
							position: 'relative',
						}}
					>
						<img src={`https://seerh5.61.com/resource/assets/fightResource/pet/11.png`} alt=""  className={styles.head} />
					</div>
				</div>
				<div style={{ backgroundColor: '#fff', display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', justifyContent: 'flex-start' }}>
					{/*{pet.LearnableMoves.Move.map((item) => (
						循环获取技能生成出来,这里只是展示技能
					))}*/}
					<SkillPanel
						></SkillPanel>
				</div>
			</div>
		);
	}
);
PetInfoDetail.displayName = 'PetInfoDetail';
export default PetInfoDetail;
