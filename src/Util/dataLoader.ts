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
            break;
        case dataSetNames.metason:
            return {config: MetasonConfig, data: MetasonData}
            break;
        case dataSetNames.bundesrat:
            return {config: BundesratConfig, data: BundesratData}
            break;
        default:
            return {config: ConfigBlockBuster, data: BlockBusterdata}
            break;
    }
}
