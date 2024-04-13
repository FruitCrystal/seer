import styles from './style.module.css';
import yiyo from '../../assets/yiyo.png';
import pony from '../../assets/pony.png';
import seer_door from '../../assets/seer_door.png';
import counter_mark from '../../assets/countermark.png';
import {HashRouter, Link, useHref, useLocation} from 'react-router-dom';
import {useEffect, useState} from 'react';
const Nav = () => {
	
	const href = useLocation()
	const [url,setUrl] = useState<string>(href.pathname);
	useEffect(() => {setUrl(href.pathname)},[href])
	const [flat,setFlat] = useState<boolean>(true)
	function changeBGC(href:string){
		return {backgroundColor: url === href ? '#648496' : 'rgb(177,191,201)'}
	}
	return (
		<ul  style={{width:flat?'120px':0}} className={styles.nav} onClick={()=>{setUrl(useLocation().pathname)}}>
			<img onClick={()=>{setFlat((prev)=>!prev)}} className={styles.nav_button}src={seer_door} style={{left:flat?'5px':'-10px'}}></img>
			<Link to='/' >
				<li title="首页" style={changeBGC('/')}>
					<img src={pony} width={'40px'} height={'40px'}></img>
					首页
				</li>
			</Link>
			<Link to='/pet' >
				<li title="精灵" id='pet' style={changeBGC('/pet')}>
					<img src={yiyo} width={'40px'} height={'40px'}></img>
					精灵
				</li>
			</Link>
			
			<Link to={'/item'}>
				<li title="物品" id='item' style={changeBGC('/item')}>
					<img src={seer_door} width={'40px'} height={'40px'}></img>
					物品
				</li>
			</Link>
			<Link to={'/counter'} id='counter'>
				<li title="刻印" style={changeBGC('/counter')}>
					<img src={counter_mark} width={'40px'} height={'40px'}></img>
					刻印
				</li>
			</Link>
			
		</ul>
	);
};

export default Nav;
