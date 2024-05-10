export function getSomeRandomPetID(amout: number,maximum: number,minimum: number): number[] {
	let resultSet: number[] = [];
	for (let i = 0; i < amout; i++) {
		resultSet.push(Math.floor(Math.random() * (maximum - minimum + 1)) + minimum);
	}
	return Array.from(new Set(resultSet));
}
export function sum(arr: (number | string)[]): number {
	return ~~arr.reduce((acc, cur) => ~~acc + ~~cur, 0);
}