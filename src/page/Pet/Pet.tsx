import { useContext, useState } from 'react';
import iMonster from '../../interface/iMonster';
import PetCard from '../../components/Card/PetCard';
import { IMonsterBrief } from '../../interface/iMonster';
import {dataContext} from '../../utils/context';
//import {  getSomeRandomPetID } from '../../utils/tools';

export const Pet = () => {
	const data = useContext(dataContext);
	const monster:iMonster = data.get('monsters');
	const [id,setID] = useState(1)
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap',flexDirection:'column' }}>
			<input type='number' placeholder='请输入精灵ID' onChange={(e) => setID(parseInt(e.target.value))}></input>
			{monster.Monsters.Monster.find((m:IMonsterBrief) => m.ID === id)?<PetCard id={id}></PetCard>:<div>精灵不存在</div>}
		</div>
	);
};
