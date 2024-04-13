import { useContext, useState } from 'react';
import iMonster, {IPetBook} from '../../interface/iMonster';
import PetCard from '../../components/Card/PetCard';
import { IMonsterBrief } from '../../interface/iMonster';
import {dataContext} from '../../utils/context';
//import {  getSomeRandomPetID } from '../../utils/tools';

export const Pet = () => {
	//console.log(pets);
	const data = useContext(dataContext);
	const petBook:IPetBook = data.get("petbook")
	console.log(data);
	const NewPets:number[] = [];
	petBook.root.Hotspot.item.place.map(i=>NewPets.push(i.MonID))
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			<PetCard id={5000}></PetCard>
			{/*<button onClick={() => setId(id - 1)}>Random</button>*/}
			{/*{randomID.map((i) => (
				monsterBrief[i]?
				<PetCard
					key={i}
					id={monsterBrief[i].ID}
				></PetCard>:null
			))}*/}
		</div>
	);
};
