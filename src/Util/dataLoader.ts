import {Config} from "storygram";
import {ConfigBlockBuster, WarConfig, MetasonConfig, BundesratConfig} from "../Data/exampleConfig";
import {BlockBusterdata, MetasonData, WarData, BundesratData} from "../Data/exampleData";
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
        default:
            return {config: ConfigBlockBuster, data: BlockBusterdata}
    }
}
