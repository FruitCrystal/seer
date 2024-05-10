import {PROGRESS_MAP} from "../../utils/init";

function Loading({width,item}:{width:number,item:string}) {
	const length = PROGRESS_MAP.size
  return <div>
		<p>正在初始化{item}相关数据...</p>
		<p>{width/length}/23</p>
		<div className="progress"  style={{width:"462px",height:"10px",backgroundColor:"#eee"}}>
			<div style={{width:width+"px",height:"10px",backgroundColor:"#007bff"}}></div>
		</div>
	</div>;
}

export default Loading;