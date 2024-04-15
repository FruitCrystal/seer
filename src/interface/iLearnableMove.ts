export default interface iLearnableMove{
	AdvMove?:[{ID:number,Tag:number}],
	Move: {
		ID: number;
		LearningLv: number;
	}[];
}