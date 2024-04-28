import { useContext, useState } from 'react';
import { dataContext } from '../../utils/context';
import iCounterMark, { iMintMark } from '../../interface/iCounterMark';
import PageSwitcher from '../PageSwitcher/PageSwitcher';
import styles from './CounterMark.module.css';
export const CounterMark = ({ counter }: { counter: iMintMark }) => {
	const dataBase = useContext(dataContext);
	const counter_marks: iCounterMark = dataBase.get('mintmark');
	console.log(counter_marks.MintMarks.MintMark);
	const Quality_color = new Map([
		[1, 'blue'],
		[2, 'green'],
		[3, 'purple'],
		[4, 'rgb(238 125 91)'],
		[5, 'orange'],
	]);
	return (
		<div
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
				<img width={60} src={`https://seerh5.61.com/resource/assets/countermark/icon/${counter.ID}.png `} alt="刻印" />
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
	);
};
