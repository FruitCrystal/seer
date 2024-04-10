import { useState } from 'react';
import iMonster, {iMonsterDetail} from '../../interface/iMonster';
import PetCard from '../../components/Card/PetCard';
import {MonsterBrief} from '../../interface/iMonster';

export const Pet = ({ monsterDetail, monsterBrief }: { monsterDetail: iMonster,monsterBrief: MonsterBrief[] }) => {
	//console.log(pets);
	const [id, setId] = useState(300);
	return (
		<div style={{display:"flex",flexDirection:"column" ,width:350}}>
			<input type="number" onChange={(e) => setId(parseInt(e.target.value))} />
			<div>{id >= 1 ? monsterDetail.Monsters.Monster.find((i) => i.ID === id)?.DefName : '请输入正确的id'}</div>
			{id>=1&&id<=5000 ? <PetCard monsterBrief={monsterBrief.find((i) => i.ID === id) as MonsterBrief} monsterDetail={monsterDetail.Monsters.Monster.find((i) => i.ID === id) as iMonsterDetail}></PetCard> : null}
		</div>
	);
};
