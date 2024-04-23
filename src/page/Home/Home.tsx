import PetCard from '../../components/Card/PetCard';
import { IPetBook } from '../../interface/iPetBook';
import styles from './home.module.css';
import { useContext, useEffect, useState } from 'react';
import { dataContext } from '../../utils/context';
import { iPvPBan } from '../../interface/iPvpBan';
import { FakeLoading } from '../../components/FakeLoading/FakeLoading';
import {iPeakMons} from '../../interface/PeakMons';

export const Home = () => {
	console.log('Home 组件重新渲染了！');
	const data = useContext(dataContext);
	const petBook: IPetBook = data.get('petbook');
	const version = data.get('version');
	const pvp_ban: iPvPBan = data.get('pvp_ban');
	const [loading, setLoading] = useState(true);
	const pvp_month:iPeakMons = data.get('peak_battle_mons')
	//console.log(pvp_month.VirtualBattle.PeakBtGlobalRule.WeeklyID[0].NewSeIcon);
	useEffect(() => {
		setLoading(false);
	}, []);
	return loading ? (
		<FakeLoading></FakeLoading>
	) : (
		<div className={styles.home}>
			<div className={styles.content}>
				<div className={styles.main}>
					<div className={styles.news}>
						<h2 style={{ width: '100%', textAlign: 'center', backgroundColor: '#bfbfbf' }}>本周更新精灵</h2>
						<div style={{ display: 'flex', width: '100%' }}>
							{petBook.root.Hotspot.item.place.map((place) =>
								place.type == 0 ? (
									<div key={place.ID} style={{ marginRight: 10 }}>
										<PetCard id={place.ID}></PetCard>
									</div>
								) : null
							)}
						</div>
					</div>
					<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
						<h2 style={{ width: '100%', textAlign: 'center', backgroundColor: '#bfbfbf' }}>巅峰相关信息</h2>
						<div className="pvp_ban" style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
							<div
								className="pvp_ban_first"
								style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
							>
								<h3 style={{ width: '100%', textAlign: 'center', backgroundColor: '#efefef' }}>准限制级</h3>
								<div
									className="pvp_ban_first_list"
									style={{ display: 'flex', flexWrap: 'wrap', height: 400, width: 370, overflowY: 'scroll' }}
								>
									{pvp_ban.data[0].name.split(';').map((name) => (
										<PetCard key={name} id={parseInt(name)}></PetCard>
									))}
								</div>
							</div>
							<div
								className="pvp_ban_second"
								style={{ display: 'flex', flexDirection: 'column',  alignItems: 'center' }}
							>
								<h3 style={{ textAlign: 'center', backgroundColor: '#efefef' }}>限制级</h3>
								<div
									className="pvp_ban_second_list"
									style={{ display: 'flex', flexWrap: 'wrap', height: 400, width: 370, overflowY: 'scroll' }}
								>
									{pvp_ban.data[1].name.split(';').map((name) => (
										<PetCard key={name} id={parseInt(name)}></PetCard>
									))}
								</div>
							</div>
							<div className="pvp_mons_pet"
								style={{ display: 'flex', flexDirection: 'column',  alignItems: 'center',width:'100%' }}>
									<h3 style={{ textAlign: 'center', backgroundColor: '#efefef' }}>本月主场</h3>
									<div>
										{pvp_month.VirtualBattle.PeakBtGlobalRule.WeeklyID.map((mon) => <p style={{marginBottom:10}} key={mon.ID}>{mon.NewSeIcon}</p>)}
									</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<p style={{ margin: 0, fontSize: '10px', position: 'absolute', right: 0, bottom: 0 }}>版本号：{version}</p>
		</div>
	);
};

export default Home;
