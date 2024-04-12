import { useState } from 'react';
import iMonster, { iMonsterDetail } from '../../interface/iMonster';
import PetCard from '../../components/Card/PetCard';
import { MonsterBrief } from '../../interface/iMonster';
import {  getSomeRandomPetID } from '../../utils/tools';

export const Pet = ({ monsterDetail, monsterBrief }: { monsterDetail: iMonster; monsterBrief: MonsterBrief[] }) => {
	//console.log(pets);
	const [id, setId] = useState(300);
	//let monster = monsterDetail.Monsters.Monster.find((i) => i.ID === id);
	//let monster_brief = monsterBrief.find((i) => i.ID === id);

	let randomID = getSomeRandomPetID(9, 1, 5000);
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			<button onClick={() => setId(id - 1)}>Random</button>
			{randomID.map((i) => (
				monsterBrief[i]?
				<PetCard
					key={i}
					monsterBrief={monsterBrief[i] as MonsterBrief}
					monsterDetail={monsterDetail.Monsters.Monster[i] as iMonsterDetail}
				></PetCard>:null
			))}
		</div>
	);
};
