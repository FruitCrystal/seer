import { useContext, useState } from 'react';
import { CounterMark } from '../../components/CounterMark/CounterMark';
import { dataContext } from '../../utils/context';
import iCounterMark from '../../interface/iCounterMark';
import PageSwitcher from '../../components/PageSwitcher/PageSwitcher';
import styles from './Counter.module.css';
import {Item} from '../Item/Item';
export const Counter = () => {
	const dataBase = useContext(dataContext);
	const counter_marks: iCounterMark = dataBase.get('mintmark');
	const [page, setPage] = useState(1);
	const [counterMarkClass, setCounterMarkClass] = useState('');
	const [display, setDisplay] = useState(false);
	console.log(counter_marks.MintMarks.MintmarkClass);
	function filter() {
		return counterMarkClass
			? counter_marks.MintMarks.MintMark.filter((mark) => mark.MintmarkClass && mark.MintmarkClass == ~~counterMarkClass)
			: counter_marks.MintMarks.MintMark;
	}
	return (
		<div>
			<div style={{ width: 'calc(100vw - 120px)', height: 70, backgroundColor: '#eee' }}>
				<div
					style={{
						position: 'absolute',
						zIndex: 999,
						left: -120,
						width: 'calc(100vw + 120px)',
						height: '100%',
						display: display ? 'flex' : 'none',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'rgb(0,0,0,0.5)',
					}}
					onClick={() => setDisplay(!display)}
				>
					<div style={{ position: 'absolute', width: 188, height: 469, backgroundColor: '#eee', zIndex: 999,overflowY:'scroll',overflowX:'hidden' }}>
						<table className={styles.Count_table}>
							<thead className={styles.Count_thead}>
								<tr className={styles.Count_tr}>
									<th className={styles.Count_th} scope="col">ID</th>
									<th className={styles.Count_th} scope="col">系列</th>
								</tr>
							</thead>
							<tbody className={styles.Count_tobody}>
								<tr className={styles.Count_tr} onClick={() => setCounterMarkClass('')}>
									<td className={styles.Count_td}>0</td>
									<td className={styles.Count_td}>所有</td>
								</tr>
								{counter_marks.MintMarks.MintmarkClass.map((item, index) => 
								<tr className={styles.Count_tr} key={index} onClick={() => setCounterMarkClass(item.ID+'')}>
									<td className={styles.Count_td}>{item.ID}</td>
									<td className={styles.Count_td}>{item.ClassName}</td>
								</tr>
							)}
							</tbody>
						</table>
					</div>
				</div>
				<div>
					<label htmlFor="class">刻印系列</label>
					<input
						id='class'
						type="number"
						placeholder="Search"
						defaultValue={undefined}
						className={styles.searchInput}
						max={82}
						min={1}
						value={counterMarkClass}
						onChange={(e) => {
							setCounterMarkClass(e.target.value as string);
						}}
					></input>
					<span title='点击查看刻印系列' onClick={() => setDisplay(!display)}>?</span>
				</div>

				{counterMarkClass && counter_marks.MintMarks.MintmarkClass[~~counterMarkClass - 1].ClassName}
			</div>
			<div
				style={{
					minHeight: 444,
					overflow: 'hidden',
					minWidth: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					cursor: 'pointer',
				}}
			>
				<div
					style={{
						minHeight: 444,
						overflow: 'hidden',
						margin: '0 auto',
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#f5f5f5',
						flexWrap: 'wrap',
					}}
				>
					{filter()
						.slice((page - 1) * 32, page * 32)
						.map((mark, index) => (
							<CounterMark key={index} counter={mark} />
						))}
				</div>
				<div style={{ position: 'absolute', bottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<PageSwitcher page={page} setPage={setPage} total={Math.ceil(filter().length)} onePageNum={32} />
				</div>
			</div>
		</div>
	);
};
