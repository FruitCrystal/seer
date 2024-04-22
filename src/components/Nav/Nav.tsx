import styles from './style.module.css';
import yiyo from '../../assets/yiyo.png';
import pony from '../../assets/pony.png';
import seer_door from '../../assets/seer_door.png';
import counter_mark from '../../assets/countermark.png';
import skill_stone from '../../assets/skill_stone.png'
import { Link,  useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
const Nav = () => {

	const href = useLocation()
	const [url,setUrl] = useState<string>(href.pathname);
	useEffect(() => {setUrl(href.pathname)},[href])
	/**
	 * 
	 * 改变背景颜色
	 * @returns 
	 */
	function changeBGC(href:string){
		return {backgroundColor: url.includes(href)? '#648496' : 'rgb(177,191,201)'}
	}
	return (
		<ul className={styles.nav}>
			
			<Link to='/' onClick={()=>setUrl('/home')}>
				<li title="首页" style={changeBGC('/home')}>
					<img src={pony} width={'40px'} height={'40px'}></img>
					首页
				</li>
			</Link>
			<Link to='/pet' onClick={()=>setUrl('/pet')}>
				<li title="精灵" id='pet' style={changeBGC('/pet')}>
					<img src={yiyo} width={'40px'} height={'40px'}></img>
					精灵
				</li>
			</Link>
			
			<Link to={'/item'} onClick={()=>setUrl('/item')}>
				<li title="物品" id='item' style={changeBGC('/item')}>
					<img src={seer_door} width={'40px'} height={'40px'}></img>
					物品
				</li>
			</Link>
			<Link to={'/counter'} id='counter' onClick={()=>setUrl('/counter')}>
				<li title="刻印" style={changeBGC('/counter')}>
					<img src={counter_mark} width={'40px'} height={'40px'}></img>
					刻印
				</li>
			</Link>
			<Link to={'/skill'} id='skill' onClick={()=>setUrl('/skill')}>
				<li title="刻印" style={changeBGC('/skill')}>
					<img src={skill_stone} width={'40px'} height={'40px'}></img>
					技能
				</li>
			</Link>
		</ul>
	);
};

export default Nav;
