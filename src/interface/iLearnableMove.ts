export default interface iLearnableMove{
	AdvMove?:[{ID:number,Tag:number}],
	Move: {
		ID: number;
		LearningLv: number;
	}[],
	SpMove:{
		ID:number,
		Rec:number,
		Tag:number
	}[]
}