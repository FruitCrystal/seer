export let PROGRESS_MAP: Map<string, string> = new Map([
 ['monsters', '宠物'],
 ['moves', '技能'],
 ['hide_moves', '隐藏技能'],
 ['items', '物品'],
 ['itemsTip', '物品提示'],
 ['gems', '宝石'],
 ['equip', '装备'],
 ['effectDes', '特殊效果描述'],
 ['effectInfo', '技能效果信息'],
 ['effectIcon', '魂印信息'],
 ['effectbuff', '场地buff'],
 ['petbook', '精灵简单信息'],
 ['skillTypes', '属性'],
 ['suit', '套装效果'],
 ['pet_skin', '精灵皮肤'],
 ['ogre', '宝石']
]);

export interface iData {
	version: string;
	monsters: Monster;
	moves: Move;
	hide_moves: Hide_move;
	items: Item;
	itemsTip: ItemsTip;
	gems: Gem;
	equip: Equip;
	effectDes: EffectDe;
	effectInfo: EffectInfo;
	effectIcon: EffectIcon;
	effectbuff: Effectbuff;
	petbook: Petbook;
	skillTypes: SkillType;
	suit: Suit;
	pet_skin: Pet_skin;
	ogre: Ogre;
}
export interface Move {
	iD: number;
	learningLv: number;
}

export interface LearnableMove {
	move: Move[];
}

export interface Monster {
	learnableMoves: LearnableMove;
	iD: number;
	defName: string;
	type: number;
	Growthtype: number;
	hP: number;
	atk: number;
	def: number;
	Spatk: number;
	Spdef: number;
	spd: number;
	yieldingExp: number;
	catchRate: number;
	yieldingEV: string;
	evolvesFrom: number;
	evolvesTo: number;
	evolvingLv: number;
	freeForbidden: number;
	fuseMaster: number;
	fuseSub: number;
	gender: number;
	petClass: number;
	formParam: number;
	characterAttrParam: number;
	gradeParam: number;
	addSeParam: number;
}

export interface Monster {
	monster: Monster[];
}

export interface Monster {
	monsters: Monster;
}

export interface Move {
	iD: number;
	name: string;
	category: number;
	type: number;
	power: number;
	maxPP: number;
	accuracy: number;
	url: string;
	cD: number;
}

export interface Move {
	move: Move[];
}

export interface SideEffect {
	iD: number;
	des: string;
	help: string;
}

export interface SideEffect {
	sideEffect: SideEffect[];
	_text: string[];
}

export interface MovesTbl {
	moves: Move;
	sideEffects: SideEffect;
}

export interface Move {
	movesTbl: MovesTbl;
}

export interface Item {
	moveId: number;
	petId: number;
}

export interface Root {
	item: Item[];
}

export interface Hide_move {
	root: Root;
}

export interface Item {
	iD: number;
	name: string;
	rarity: number;
	price: number;
	tradability: number;
	Viptradability: number;
	dailyKey: number;
	dailyOutMax: number;
	wd: number;
	useMax: number;
	lifeTime: number;
	purpose: number;
	bean: number;
	hide: number;
	sort: number;
}

export interface Cat {
	item: Item[];
	iD: number;
	DbCatiD: number;
	name: string;
	max: number;
	url: string;
}

export interface Item {
	cat: Cat[];
}

export interface Item {
	items: Item;
}

export interface Item {
	id: number;
	level: number;
	color: string;
	des: string;
}

export interface Root {
	item: Item[];
}

export interface ItemsTip {
	root: Root;
}

export interface Effect {
	effectId: number;
	param: string;
}

export interface SkillEffect {
	effect: Effect;
}

export interface Gem {
	skillEffects: SkillEffect[];
	iD: number;
	name: string;
	category: number;
	lv: number;
	equitLv1Cnt1: number;
	des: string;
	promoteItemId: number;
	itemProb: number;
	upgradeGemId: number;
	upgradeFailCompensanteProb: number;
	inlayProb: number;
	failCompensateStart: number;
	failCompensateEnd: number;
	inlayPromoteItem: number;
	inlayPromoteProb: number;
	decomposeProb: number;
	cap_lv: number;
}

export interface Gem {
	gem: Gem[];
}

export interface Gem {
	gems: Gem;
}

export interface Rank {
	lv: number;
	attribute: string;
	addWay: number;
	Battlelv: string;
	Otherattribute: string;
	desc: string;
}

export interface Equip {
	rank: Rank[];
	iD: number;
	ItemiD: number;
	quality: number;
	occasion: number;
	part: number;
	target: number;
	MoniD: number;
	name: string;
	desc: string;
}

export interface Equip {
	equip: Equip[];
}

export interface Equip {
	equips: Equip;
}

export interface _declaration {
	version: number;
	encoding: string;
}

export interface Item {
	id: number;
	kind: number;
	kinddes: string;
	icon: number;
	tab: number;
	desc: string;
}

export interface Root {
	item: Item[];
}

export interface EffectDe {
	_declaration: _declaration;
	root: Root;
}

export interface ParamType {
	id: number;
	params: string;
	desc: string;
}

export interface Effect {
	id: number;
	argsNum: number;
	info: string;
}

export interface Root {
	paramType: ParamType[];
	effect: Effect[];
}

export interface EffectInfo {
	root: Root;
}

export interface Effect {
	id: number;
	petid: number;
	iconid: number;
	effectid: number;
	kind: number;
	tips: string;
}

export interface Root {
	effect: Effect[];
}

export interface EffectIcon {
	root: Root;
}

export interface Buff {
	iD: number;
	name: string;
	type: number;
	IconiD: number;
	ImageiD: number;
	kind: number;
	range: number;
	round: number;
	remove: number;
	desc: string;
}

export interface Root {
	buff: Buff[];
}

export interface Effectbuff {
	root: Root;
}

export interface Collect {
	iD: number;
	moniD: number;
	redirect: string;
	go: string;
}

export interface Export {
	monID: number;
}

export interface Branch {
	collect: Collect[];
	export: Export;
	iD: number;
	title: string;
}

export interface PetCollect {
	branch: Branch;
}

export interface PetData {
	id: number;
	pid: number;
	tagA: number;
	tagB: number;
	redirect: string;
	go: string;
}

export interface Place {
	iD: number;
	moniD: number;
	ImageiD: number;
	label: number;
	desc: string;
	redirect: string;
	go: string;
}

export interface Branch {
	place: Place[];
	iD: number;
	title: string;
	intro: string;
}

export interface Type {
	branch: Branch[];
	iD: number;
}

export interface HotPet {
	petData: PetData[];
	type: Type[];
}

export interface Place {
	type: number;
	iD: number;
	ImageiD: number;
	label: number;
	redirect: string;
	go: string;
}

export interface Item {
	place: Place[];
	intro: string;
}

export interface Hotspot {
	item: Item;
}

export interface Place {
	iD: number;
	mintmark: string;
	redirect: string;
	go: string;
	desc: string;
}

export interface RecMintmark {
	place: Place[];
}

export interface MonsterBrief {
	iD: number;
	hasSound: number;
	defName: string;
	type:string;
	height: number;
	weight: number;
	foundin: string;
	food: string;
	features: string;
	mapiD: number;
}

export interface Root {
	petCollect: PetCollect;
	hotPet: HotPet;
	hotspot: Hotspot;
	recMintmark: RecMintmark;
	monster: Monster[];
}

export interface Petbook {
	root: Root;
}

export interface Item {
	id: number;
	cn: string;
	en: string;
}

export interface Root {
	item: Item[];
}

export interface SkillType {
	root: Root;
}

export interface Item {
	id: number;
	cloths: string;
	name: string;
	suitdes: string;
}

export interface Root {
	item: Item[];
}

export interface Suit {
	root: Root;
}

export interface SkinKind {
	iD: number;
	type: number;
	lifeTime: number;
}

export interface Skin {
	skinKind: SkinKind[];
	iD: number;
	MoniD: number;
	target: number;
	occasion: number;
	addWay: number;
	type: number;
	name: string;
}

export interface PetSkin {
	skin: Skin[];
}

export interface Pet_skin {
	petSkins: PetSkin;
}

export interface _declaration {
	version: number;
	encoding: string;
}

export interface Item {
	id: number;
	pList: string;
}

export interface Ogre {
	item: Item[];
}

export interface Region {
	id: number;
	pList: string;
}

export interface Item {
	region: Region;
	id: number;
}

export interface Bos {
	item: Item[];
}

export interface Item {
	id: number;
	pList: string;
}

export interface Special {
	item: Item[];
}

export interface De {
	_cdata: string;
}

export interface Msg {
	_cdata: string;
}

export interface Date {
	des: De;
	msg: Msg;
	week: number;
	showHour: string;
	showMinute: number;
	lastTime: number;
	mapID: number;
	pList: string;
}

export interface Item {
	date: Date[];
	petID: number;
}

export interface TimeBos {
	item: Item[];
}

export interface Root {
	ogre: Ogre;
	boss: Bos;
	special: Special;
	timeBoss: TimeBos;
}

export interface Ogre {
	_declaration: _declaration;
	root: Root;
}

