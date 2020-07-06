import {Storygram} from "storygram"
import {Actor, Event} from "storygram/dist/Types"

export const storyGramColorSchemes = ['schemeCategory10', 'schemeAccent', 'schemeDark2', 'schemePaired', 'schemePastel1', 'schemePastel2', 'schemeSet1', 'schemeSet2', 'schemeSet3']

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
    actorDataKeys: Array<string>,
    eventDataKeys: Array<string>,
    getActorFromString: (id: string) => Actor | undefined,
    firstEventValue: number,
    lastEventValue: number
}

export const getStoryGramMetadata = (storyGram: Storygram): StoryGramMetadata => {
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
    let eventDataKeysSet = new Set<string>()
    let actorDataKeysSet = new Set<string>()
    storyGram.data.events.forEach(event => {
        if(biggestGroup < event.group.length) {
            biggestGroup = event.group.length
        }
        if(!event.isHidden && (biggestVisibleGroup < event.group.length)) {
            biggestVisibleGroup = event.group.length
        }
        Object.keys(event.data).forEach(key => eventDataKeysSet.add(key))
    })
    allActorsList!.forEach(actor => {
        if(maxGroupedActor < actor.layers.length) {
            maxGroupedActor = actor.layers.length
        }
        if(!actor.isHidden && (maxGroupedVisibleActor < actor.layers.length)) {
            maxGroupedVisibleActor = actor.layers.length
        }
        Object.keys(actor.data).forEach(key => actorDataKeysSet.add(key))
    })
    let actorDataKeys = Array.from(actorDataKeysSet)
    let eventDataKeys = Array.from(eventDataKeysSet)
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
        actorDataKeys,
        eventDataKeys,
        getActorFromString,
        firstEventValue: storyGram.data.events[0].eventXValue,
        lastEventValue: storyGram.data.events[storyGram.data.events.length - 1].eventXValue,
    }
}
