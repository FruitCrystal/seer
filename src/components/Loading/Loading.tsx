function Loading({width,item}:{width:number,item:string}) {
  return <div>
		<p>正在初始化{item}相关数据...</p>
		<p>{width/20}/17</p>
		<div className="progress"  style={{width:"340px",height:"10px",backgroundColor:"#eee"}}>
			<div style={{width:width+"px",height:"10px",backgroundColor:"#007bff"}}></div>
		</div>
	</div>;
}

export default Loading;