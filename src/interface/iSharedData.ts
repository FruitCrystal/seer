import iMonster from "./iMonster"
import {iMove} from "./iMove"

export default interface SharedData{
	version:string
	monsters:iMonster
	moves:iMove
}