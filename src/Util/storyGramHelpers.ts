import {Storygram} from "storygram"
import {Actor, Event} from "storygram/dist/Types"
import {Functors} from "../App"

export const storyGramColorSchemes = ['schemeCategory10', 'schemeAccent', 'schemeDark2', 'schemePaired', 'schemePastel1', 'schemePastel2', 'schemeSet1', 'schemeSet2', 'schemeSet3']

const firstDate = '1700-01-02'
const lastDate = '4000-12-29'

export type StoryGramMetadata = {
    visibleActorsList: Array<Actor>,
    allActorsList: Array<Actor>,
    allActorsListSortAmt: Array<Actor>,
    visibleEventList: Array<Event>,
    allEventsList: Array<Event>,
    biggestGroup: number,
    maxGroupedActor: number,
    biggestVisibleGroup: number,
    maxGroupedVisibleActor: number,
    dataKeys: Array<string>,
    getActorFromString: (id: string) => Actor | undefined,
    firstEvent: Event | undefined,
    lastEvent: Event | undefined
}

export const getStoryGramMetadata = (storyGram: Storygram, data: any[]): StoryGramMetadata => {
    let biggestGroup = 0
    let biggestVisibleGroup = 0
    let maxGroupedActor = 0
    let maxGroupedVisibleActor = 0
    let firstEventValue = Number.MAX_SAFE_INTEGER
    let lastEventValue = Number.MIN_SAFE_INTEGER
    let visibleActorsList = Array.from(storyGram.processedData.actors)
        .map(actorKV => actorKV[1])
        .filter((actor: Actor) => {
            return !actor.isHidden
        })
    let allActorsList = Array.from(storyGram.data.actors).map(actorKV => actorKV[1])
    let allActorsListSortAmt = allActorsList.sort((a, b) => {
        if(a.layers.length === b.layers.length) return a.actorID.localeCompare(a.actorID)
        return b.layers.length - a.layers.length
    })
    let visibleEventList = storyGram.processedData.events
    let allEventsList = storyGram.data.events
    const getActorFromString = (actorID: string) => {
        return storyGram.data.actors.get(actorID)
    }
    storyGram.data.events.forEach(event => {
        if(biggestGroup < event.group.length) {
            biggestGroup = event.group.length
        }
        if(!event.isHidden && (biggestVisibleGroup < event.group.length)) {
            biggestVisibleGroup = event.group.length
        }
    })
    allActorsList!.forEach(actor => {
        if(maxGroupedActor < actor.layers.length) {
            maxGroupedActor = actor.layers.length
        }
        if(!actor.isHidden && (maxGroupedVisibleActor < actor.layers.length)) {
            maxGroupedVisibleActor = actor.layers.length
        }
    })
    let dataKeysSet = new Set<string>()
    if(Array.isArray(data)) {
        data.forEach(d => Object.keys(d).forEach(key => dataKeysSet.add(key)))
    }
    let dataKeys = Array.from(dataKeysSet)
    return {
        visibleActorsList,
        visibleEventList,
        allActorsList,
        allActorsListSortAmt,
        allEventsList,
        biggestGroup,
        biggestVisibleGroup,
        maxGroupedActor,
        maxGroupedVisibleActor,
        dataKeys,
        getActorFromString,
        firstEvent: storyGram.data.events.length ? storyGram.data.events[0] : undefined,
        lastEvent: storyGram.data.events.length ? storyGram.data.events[storyGram.data.events.length - 1] : undefined,
    }
}

export const setNiceDefaults = (storyGram: Storygram, metaData: StoryGramMetadata, functors: Functors) => {
    setNiceEventValueFilterDefaults(storyGram, metaData)
    setNiceGroupAmountFilterDefaults(storyGram, metaData)
    setNiceGroupSizeFilterDefaults(storyGram, metaData)
}

const setNiceEventValueFilterDefaults = (storyGram: Storygram, metaData: StoryGramMetadata) => {
    console.log(storyGram.config.filterEventValue, metaData.firstEvent)
    if(storyGram.config.inferredEventType === 'datestring') {
        if(storyGram.config.filterEventValue[0] == null || storyGram.config.filterEventValue[0] === firstDate) {
            storyGram.config.filterEventValue[0] = millisToDateString(metaData.firstEvent?.eventXValue as number)
        } else {
            storyGram.config.filterEventValue[0] = standartizeDateString
                (storyGram.config.filterEventValue![0]! as string)
        }
        if(storyGram.config.filterEventValue[1] == null || storyGram.config.filterEventValue[1] === lastDate) {
            storyGram.config.filterEventValue[1] = millisToDateString(metaData.lastEvent?.eventXValue as number)
        } else {
            storyGram.config.filterEventValue[1] = standartizeDateString
                (storyGram.config.filterEventValue![1]! as string)
        }
    } else {
        if(storyGram.config.filterEventValue[0] === Number.MIN_SAFE_INTEGER) {
            storyGram.config.filterEventValue[0] = metaData.firstEvent?.eventXValue
        }
        if(storyGram.config.filterEventValue[1] === Number.MAX_SAFE_INTEGER) {
            storyGram.config.filterEventValue[1] = metaData.lastEvent?.eventXValue
        }
    }
}

const setNiceGroupAmountFilterDefaults = (storyGram: Storygram, metaData: StoryGramMetadata) => {
    if(storyGram.config.filterGroupAmt[1] === Number.MAX_SAFE_INTEGER) {
        storyGram.config.filterGroupAmt[1] = metaData.maxGroupedActor
    }
}

const setNiceGroupSizeFilterDefaults = (storyGram: Storygram, metaData: StoryGramMetadata) => {
    if(storyGram.config.filterGroupSize[1] === Number.MAX_SAFE_INTEGER) {
        storyGram.config.filterGroupSize[1] = metaData.biggestGroup
    }
}

export const dateStringToMillis = (dateString: string) => {
    console.log('dateString to millis', dateString)
    return Date.parse(dateString)
}

export const millisToDateString = (millis: number) => {
    return new Date(0, 0, 0, 0, 0, 0, millis).toISOString().substring(0, 10)
}

export const standartizeDateString = (dateString: string) => {
    return new Date(Date.parse(dateString)).toISOString().substring(0, 10)
}
