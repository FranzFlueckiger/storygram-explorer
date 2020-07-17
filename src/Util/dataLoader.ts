import {Config} from "storygram";
import {ConfigBlockBuster, WarConfig, MetasonConfig, BundesratConfig} from "../Data/exampleConfig";
import {BlockBusterdata, MetasonData, WarData, BundesratData} from "../Data/exampleData";
import {dataSetNames} from "./constants";
import {Functors} from "../App";
import { generateNoneAccessor, generateNoneSplitAccessor, generateSplitters } from "../Components/Drawer/TextPart/TextPartGenerator";
import { Actor, Event } from 'storygram/dist/Types';

type DataSet = {
    config: Config,
    data: any[]
}
 
export const loadData = (description: string, functors: Functors, setConfig?: React.Dispatch<React.SetStateAction<Config>>): DataSet => {
    switch (description) {
        
        case dataSetNames.conflicts:
            functors.setActorSplitFunc([generateSplitters().find(splitter => splitter[0] === 'Comma (",")')!])
            functors.setEventDescs([
                ['War in ', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + 'War in '],
                ['location', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.data.location],
                [', ', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + ', '],
                ['Eventvalue', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.eventValue],
            ])
            functors.setEventURLs([
                ['https://www.google.ch/search?q=', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + 'https://www.google.ch/search?q='],
                ['War in ', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + 'War in '],
                ['location', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.data.location],
                ['+', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + '+'],
                ['EventValue', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.eventValue]
            ])
            functors.setActorURLs([
                ['https://www.google.ch/search?q=', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + 'https://www.google.ch/search?q='],
                ['War in ', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + 'War in '],
                ['location', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.data.location],
                ['+', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + '+'],
                ['EventValue', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.eventValue],
                ['+', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + '+'],
                ['Actor name', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + actor!.actorID]
            ]) 
            return { config: WarConfig, data: WarData }
        
        case dataSetNames.metason:
            functors.setActorSplitFunc(generateNoneSplitAccessor())
            functors.setEventDescs([
                ['releaseName', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.data.releaseName],
                [', ', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + ', '],
                ['year', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.data.year]
            ])
            functors.setEventURLs([
                ['https://www.google.ch/search?q=', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + 'https://www.google.ch/search?q='],
                ['release_title', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.data.release_title],
                ['+', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + '+'],
                ['EventValue', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.eventValue]
            ])
            functors.setActorURLs([
                ['https://music.metason.net/artistinfo?name=', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + 'https://music.metason.net/artistinfo?name='],
                ['Actor name', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + actor!.actorID]
            ])
            return { config: MetasonConfig, data: MetasonData }
        
        case dataSetNames.bundesrat:
            functors.setActorSplitFunc(generateNoneSplitAccessor())
            functors.setEventDescs([
                ['Bundesrat im Jahr ', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + 'Bundesrat im Jahr '],
                ['EventValue', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.eventValue]
            ])
            functors.setEventURLs([
                ['https://www.google.ch/search?q=', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + 'https://www.google.ch/search?q='],
                ['Bundesrat im Jahr ', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + 'Bundesrat im Jahr '],
                ['EventValue', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.eventValue]
            ])
            functors.setActorURLs([
                ['https://www.google.ch/search?q=', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + 'https://www.google.ch/search?q=Bundesrat '],
                ['Actor name', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + actor!.actorID],
                ['+', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + '+'], 
                ['EventValue', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.eventValue]
            ])
            return { config: BundesratConfig, data: BundesratData }
        
        case dataSetNames.blockbuster:
            functors.setActorSplitFunc(generateNoneSplitAccessor())
            functors.setEventDescs([
                ['original_title', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.data.original_title],
                [' (', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + ' ('],
                ['vote_average', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.data.vote_average],
                ['/10)', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + '/10)'],
            ])
            functors.setEventURLs([
                ['https://www.google.ch/search?q=', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + 'https://www.google.ch/search?q='],
                ['original_title', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.data.original_title],
                ['+', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + '+'],
                ['Eventvalue', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.eventValue],
            ])
            functors.setActorURLs([
                ['https://www.google.ch/search?q=', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + 'https://www.google.ch/search?q='],
                ['original_title', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.data.original_title],
                ['+', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + '+'],
                ['Eventvalue', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + event!.eventValue],
                ['+', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + '+'],
                ['Actor name', (text: string, event?: Event | undefined, actor?: Actor | undefined) => text + actor!.actorID],
            ])

        default:
            return { config: ConfigBlockBuster, data: BlockBusterdata }
        
    }
} 

const resetFunctors = (functors: Functors) => {
    functors.setActorColor(generateNoneAccessor())
    functors.setActorSplitFunc(generateNoneSplitAccessor())
    functors.setActorURLs([])
    functors.setEventURLs([])
    functors.setEventDescs([])
}
