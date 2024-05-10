import {useState} from "react";

export const CapsuleCheckBox = ({ width, hight ,setValue}: { width: number; hight: number,value?: number,setValue: Function }) => {
	const [checked, setChecked] = useState(false);
	return (
		<div
			onClick={() => {setChecked(!checked);setValue(!checked)}}
			style={{
				margin:'0 2px 0 2px',
				display: 'inline-block',
				width: width,
				height: hight,
				borderRadius: hight / 2,
				backgroundColor: 'rgb(183 179 179)',
				position: 'relative',
			}}
		>
			<div
				className="ball"
				style={{
					transition: ' 0.1s',
					position: 'absolute',
					width: width / 2,
					height: hight,
					top: 0,
					left:checked? width / 2 : 0,
					backgroundColor: '#fff',
					borderRadius: hight / 2,
					boxShadow: '0px 0px 5px #888888',
				}}
			></div>
		</div>
	);
};
