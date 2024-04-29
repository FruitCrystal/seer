import {useContext, useState} from "react";
import {CounterMark} from "../../components/CounterMark/CounterMark"
import {dataContext} from "../../utils/context";
import iCounterMark from "../../interface/iCounterMark";
import PageSwitcher from "../../components/PageSwitcher/PageSwitcher";
import styles from './Counter.module.css'
export const Counter = () => {
	const dataBase = useContext(dataContext);
	const counter_marks: iCounterMark = dataBase.get('mintmark');
	const [page, setPage] = useState(1);
	const counter_marks_reversed = counter_marks.MintMarks.MintMark.reverse();
	return (
		<div>
			<div style={{width: '100%', height: 70, backgroundColor: '#eee'}}></div>
			<div
			style={{
				minHeight: 444,
					overflow:'hidden',
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
					overflow:'hidden',
					margin: '0 auto',
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#f5f5f5',
					flexWrap: 'wrap',
				}}
			>
				{counter_marks.MintMarks.MintMark.reverse().slice((page - 1) * 32, page * 32).map((mark, index) => (
					<CounterMark key={index} counter={mark} />
				))}
			</div>
			<div style={{ position: 'absolute', bottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<PageSwitcher page={page} setPage={setPage} total={Math.ceil(counter_marks.MintMarks.MintMark.length)} onePageNum={32} />
			</div>
		</div>
		</div>
	)
}
