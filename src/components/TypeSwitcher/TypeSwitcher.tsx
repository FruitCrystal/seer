import { useContext, useEffect, useState } from 'react';
import { dataContext } from '../../utils/context';
import { iType, type } from '../../interface/iType';
import { TYPE_MAP } from '../../utils/commonData';

export const TypeSwitcher = ({ _setType,_type }: { _setType: Function,_type: number }) => {
	const Database = useContext(dataContext);
	const skill_types: iType = Database.get('skillTypes');
	let single_types: type[] = [];
	let double_types: type[] = [];
	skill_types.root.item.map((item) => {
		item.cn.split(' ').length === 1 ? single_types.push(item) : double_types.push(item);
	});
	const [type, setType] = useState(0);
	const [visibile, setVisibile] = useState(false);
	useEffect(() => {
		_setType(type);
	}, [type]);
	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', cursor: 'pointer' }}>
			<div
				className="overlay"
				style={{
					display: visibile ? 'block' : 'none',
					width: '100vw',
					height: '100vh',
					position: 'fixed',
					top: 0,
					left: 0,
					zIndex: 1000,
					backgroundColor: 'rgba(0,0,0,0.5)',
				}}
				onClick={(e) => {
					e.stopPropagation();
					setVisibile(false);
				}}
			>
				<div
					id="属性选择面板"
					style={{
						width: 1000,
						height: 550,
						backgroundColor: 'white',
						position: 'relative',
						margin: '0 auto',
						top: 20,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'flex-start',
						alignItems: 'center',
					}}
				>
					<div id="单属性" style={{ width: '100%', height: '40%', backgroundColor: '#f0f0f0' }}>
						<p
							style={{
								height: 40,
								width: '100%',
								backgroundColor: 'rgb(177,191,201)',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								fontSize: 26,
								fontWeight: 'bold',
							}}
						>
							单属性
						</p>
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-start',
								alignItems: 'center',
								height: 50,
								cursor: 'pointer',
								flexWrap: 'wrap',
							}}
						>
							<div
								onClick={() => {
									setType(0);
								}}
								style={{
									width: 55,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									height: 'auto',
									cursor: 'pointer',
									flexWrap: 'wrap',
								}}
							>
								<img style={{padding:'15px 15px'}} src={`http://seerh5.61.com/resource/assets/PetType/0.png`} alt="" />
								<p style={{ textAlign: 'center' }}>所有</p>
							</div>
							{single_types.map((item, index) => (
								<div
									key={index}
									onClick={() => {
										setType(item.id);
									}}
									style={{
										width: 55,
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
										height: 'auto',
										cursor: 'pointer',
										flexWrap: 'wrap',
									}}
								>
									<img src={`http://seerh5.61.com/resource/assets/PetType/${item.id}.png`} alt="" />
									<p style={{ textAlign: 'center' }}>{item.cn}</p>
								</div>
							))}
						</div>
					</div>
					<div id="双属性" style={{ width: '100%', height: '100%', backgroundColor: '#efefef' }}>
						<p
							style={{
								height: 40,
								width: '100%',
								backgroundColor: 'rgb(177,191,201)',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								fontSize: 26,
								fontWeight: 'bold',
							}}
						>
							双属性
						</p>
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-start',
								alignItems: 'center',
								height: 50,
								cursor: 'pointer',
								flexWrap: 'wrap',
							}}
						>
							{double_types.map((item, index) => (
								<div
									key={index}
									onClick={() => {
										setType(item.id);
									}}
									style={{
										width: 55,
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignItems: 'center',
										height: 'auto',
										cursor: 'pointer',
										flexWrap: 'wrap',
									}}
								>
									<img src={`http://seerh5.61.com/resource/assets/PetType/${item.id}.png`} alt="" />
									<p style={{ textAlign: 'center' }}>{item.cn.replace(' ', '')}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={(e) => {
					e.stopPropagation();
					setVisibile(!visibile);
				}}
			>
				<img src={`http://seerh5.61.com/resource/assets/PetType/${_type? _type : 0}.png`} alt="" />
			</div>
			<p>{TYPE_MAP.get(_type)? TYPE_MAP.get(_type) : '所有'}</p>
		</div>
	);
};
