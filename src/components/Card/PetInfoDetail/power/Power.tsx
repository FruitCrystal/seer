const Power=({value,item,advance}: {value: number; item: string,advance?:number|undefined}) => {
	return (
		<div style={{display: 'flex',minWidth: '100%'}}>
			<div style={{display: 'flex',width: '100%',alignItems: 'center',justifyContent: "space-between"}}>
				<span>{item}:{value}<span style={{textAlign: 'right',width:20}}>{advance? `↑${advance}`:''}</span></span>
				<div style={{
					minWidth: '120px',position: 'relative',
					backgroundColor: "#0006",
					height: 5,
					marginRight: 5
				}}>
					<div
						style={{
							position: 'absolute',
							minWidth: 0.6*value,
							backgroundColor: 'goldenrod',
							height: 5,
							transition: '0.3s ease-in-out'
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default Power;
