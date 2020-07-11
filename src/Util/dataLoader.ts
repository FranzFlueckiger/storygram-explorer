import {Config} from "storygram";
import {ConfigBlockBuster, WarConfig, MetasonConfig, BundesratConfig, BattleConfig} from "../Data/exampleConfig";
import {BlockBusterdata, MetasonData, WarData, BundesratData, BattleData} from "../Data/exampleData";
import {dataSetNames} from "./constants";

type DataSet = {
    config: Config,
    data: any[]
}
 
export const loadData = (description: string): DataSet => {
    switch(description) {
        case dataSetNames.conflicts:
            return {config: WarConfig, data: WarData}
        case dataSetNames.metason:
            return {config: MetasonConfig, data: MetasonData}
        case dataSetNames.bundesrat:
            return {config: BundesratConfig, data: BundesratData}
        case dataSetNames.battles:
            return { config: BattleConfig, data: BattleData}
        default:
            return {config: ConfigBlockBuster, data: BlockBusterdata}
    }
} 
