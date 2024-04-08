import { useState } from 'react';
import iMonster from '../../interface/iMonster';

export const Pet = ({ pets }: { pets: iMonster }) => {
	//console.log(pets);
	const [id, setId] = useState(300);
	return (
		<>
			<input type="number" onChange={(e) => setId(parseInt(e.target.value))} />
			<div>{id >= 1 ? pets.Monsters.Monster.find((i) => i.ID === id)?.DefName : '请输入正确的id'}</div>
			{id ? <img src={`https://seerh5.61.com/resource/assets/pet/head/${id}.png`}></img> : null}
		</>
	);
};
