import { useContext, useState } from 'react';
import { dataContext } from '../../utils/context';
import iCounterMark, { iMintMark } from '../../interface/iCounterMark';
import PageSwitcher from '../PageSwitcher/PageSwitcher';
import styles from './CounterMark.module.css';
import SkillPanel from '../SkillPanel/SkillPanel';
export const CounterMark = ({ counter }: { counter: iMintMark }) => {
	const dataBase = useContext(dataContext);
	const counter_marks: iCounterMark = dataBase.get('mintmark');
	const [overLay, setOverLay] = useState(false);

	function sum(arr: string[]) {
		return arr.reduce((pre, cur) => ~~pre + ~~cur, 0);
	}
	const counter_class = counter_marks.MintMarks.MintmarkClass;
	const Quality_color = new Map([
		[1, 'blue'],
		[2, 'green'],
		[3, 'purple'],
		[4, 'rgb(238 125 91)'],
		[5, 'orange'],
	]);
	const Ability_Map = new Map([
		[1, '攻击'],
		[2, '防御'],
		[3, '特攻'],
		[4, '特防'],
		[5, '速度'],
		[6, '体力'],
	]);
	return (
		<div>
			<div
				onClick={(e) => {
					setOverLay(false);
					e.stopPropagation();
				}}
				className="overlay"
				style={{
					position: 'absolute',
					display: overLay ? 'flex' : 'none',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(0,0,0,0.5)',
					zIndex: 100,
					top: 0,
					left: 0,
				}}
			>
				<div
					onClick={(e) => e.stopPropagation()}
					className={styles.counter_mark_popup}
					style={{
						width: 300,
						height: 250,
						backgroundColor: 'rgb(244,252,253,0.9)',
						borderRadius: 5,
						padding: 20,
						boxShadow: '0px 0px 18px rgba(0,0,0,0.5)',
					}}
				>
					<div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginBottom: 10}}>
					{counter.ID!=42338?<img
						onClick={(e) => {
							setOverLay(!overLay);
							e.stopPropagation();
						}}
						width={90}
						src={`https://seerh5.61.com/resource/assets/countermark/icon/${counter.ID}.png `}
						alt="刻印"
					/>:<img
					onClick={(e) => {
						setOverLay(!overLay);
						e.stopPropagation();
					}}
					width={90}
					src={`https://seerh5.61.com/resource/assets/countermark/icon/41007.png`}
					alt="刻印"
				/>}
						<div style={{ textAlign: 'center', marginLeft: 10, width: 250, fontSize: 16 }}>
							<div className="counter-mark-name">
								<p style={{ marginTop: -10, color: Quality_color.get(counter.Quality) }}>{counter.Des}</p>
							</div>
							<div className="counter-mark-info">
								{counter.MintmarkClass && (
									<p style={{ marginTop: 10 }}>
										系列：
										<span style={{ color: 'rgb(102,102,102)' }}>
											{counter.MintmarkClass && counter_class
												? counter_class.find((item) => item.ID === counter.MintmarkClass)?.ClassName
												: null}
										</span>
									</p>
								)}
								<p style={{ marginTop: 10 }}>{counter.MonsterID && <p>绑定精灵：{counter.MonsterID}</p>}</p>
								<p style={{ marginTop: 10 }}>{counter.MoveID && <p>绑定技能：{counter.MoveID}</p>}</p>
							</div>
							<hr></hr>
						</div>
					</div>
					<div className="counter-mark-value" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
						<div>
							{counter.BaseAttriValue &&
								counter.MaxAttriValue &&
								counter.BaseAttriValue?.split(' ').map((value, index) => (
									<p key={index} style={{ margin: '5px 0px', color: value == '0' ? 'gray' : 'black' }}>
										{Ability_Map.get(index + 1)}：{value}/{counter.MaxAttriValue && counter?.MaxAttriValue.split(' ')[index]}
									</p>
								))}
							{counter.Arg &&
								!counter.MoveID &&
								(counter.Arg + ' ')?.split(' ').map((value, index) => value&&(
									<p key={index} style={{ margin: '5px 0px', color: value == '0' ? 'gray' : 'black' }}>
										{Ability_Map.get(index + 1)}：{value}
									</p>
								))}
							{counter.MaxAttriValue && !counter.MoveID && (
								<p style={{ color: 'orange' }}>总和：{counter.MaxAttriValue && sum(counter.MaxAttriValue.split(' '))}</p>
							)}
							{counter.Arg && !counter.MoveID && (
								<p style={{ color: 'orange' }}>总和：{counter.Arg && sum((counter.Arg + ' ').split(' '))}</p>
							)}
							{
								counter.MoveID && <p style={{ color: 'orange' }}><p>效果：</p><p>{counter.EffectDes}</p></p>}
						</div>
						<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection: 'column'}}>
							{counter.MonsterID && typeof counter.MonsterID === 'string' ? (
								<img
									width={90}
									src={`https://seerh5.61.com/resource/assets/pet/head/${counter.MonsterID.split(' ')[0]}.png`}
									alt=""
								></img>
							) : (
								<img width={120} src={`https://seerh5.61.com/resource/assets/pet/head/${counter.MonsterID}.png`} alt=""></img>
							)}
							{counter.MoveID && <SkillPanel moveID={counter.MoveID}></SkillPanel>}
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={(e) => {
					setOverLay(!overLay);
					e.stopPropagation();
				}}
				className={styles.counterMark}
				style={{
					margin: 8,
					width: 120,
					height: 95,
					backgroundColor: 'rgb(244,252,253)',
					//boxShadow: '0px 0px 5px rgba(0,0,0,0.1)',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexWrap: 'wrap',
				}}
			>
				<div
					style={{
						flexWrap: 'wrap',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						fontSize: 11,
					}}
				>
					{counter.ID!=42338?<img
						width={60}
						src={`https://seerh5.61.com/resource/assets/countermark/icon/${counter.ID}.png `}
						alt="刻印"
					/>:<img
					width={60}
					src={`https://seerh5.61.com/resource/assets/countermark/icon/41007.png`}
					alt="刻印"
				/>}
					<p
						style={{
							position: 'relative',
							width: 120,
							textAlign: 'center',
							color: Quality_color.get(counter.Quality),
							fontSize: 14,
							bottom: -4,
							backgroundColor: 'rgb(185 232 239)',
							height: 30,
							lineHeight: '30px',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
						}}
					>
						{counter.Des}
					</p>
				</div>
			</div>
		</div>
	);
};
