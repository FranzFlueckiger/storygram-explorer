import {Config} from "storygram";
import {ConfigBlockBuster, WarConfig, MetasonConfig, BundesratConfig, BattleConfig} from "../Data/exampleConfig";
import {BlockBusterdata, MetasonData, WarData, BundesratData, BattleData} from "../Data/exampleData";
import {dataSetNames} from "./constants";
import {Functors} from "../App";
import { Actor, Event } from "storygram/dist/Types"
import { generateNoneAccessor, generateNoneSplitAccessor } from "../Components/Drawer/TextPart/TextPartGenerator";

type DataSet = {
    config: Config,
    data: any[]
} 
 
export const loadData = (description: string, functors: Functors): DataSet => {
    switch(description) {
        case dataSetNames.conflicts:
            return {config: WarConfig, data: WarData}
        case dataSetNames.metason:
            return {config: MetasonConfig, data: MetasonData}
        case dataSetNames.bundesrat:
            return {config: BundesratConfig, data: BundesratData}
        case dataSetNames.battles:
            return {config: BattleConfig, data: BattleData}
        default:
            return {config: ConfigBlockBuster, data: BlockBusterdata}
    }
} 

const resetFunctors = (functors: Functors) => {
    functors.setActorColor(generateNoneAccessor())
    functors.setActorSplitFunc(generateNoneSplitAccessor())
    functors.setActorURLs([])
    functors.setEventURLs([])
    functors.setEventDescs([])
}
  