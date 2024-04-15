import {createContext} from "react";

export const  dataContext = createContext(new Map<'version'|'monsters'| 'moves'| 'hide_moves'| 'items'| 'itemsTip'| 'gems'| 'equip'| 'effectDes'| 'effectInfo'| 'effectIcon'| 'effectbuff'| 'petbook'| 'skillTypes'| 'suit'| 'pet_skin'| 'ogre'| 'movesLang'
| 'bossEffectIcon'|"pvp_ban", any>());