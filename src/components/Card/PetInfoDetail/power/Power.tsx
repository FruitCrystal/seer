import React from 'react';
const Power=({value,item}: {value: number; item: string}) => {
	return (
		<div style={{display: 'flex',minWidth: '100%'}}>
			<div style={{display: 'flex',width: '100%',alignItems: 'center',justifyContent: "space-between"}}>
				{item}:{value}
				<div style={{
					minWidth: '130px',position: 'relative',
					backgroundColor: "#0006",
					height: 5,
					marginRight: 5
				}}>
					<div
						style={{
							position: 'absolute',
							minWidth: 0.7*value,
							backgroundColor: 'goldenrod',
							height: 5,
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Power;
