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
}

export const getStoryGramMetadata = (storyGram: Storygram): StoryGramMetadata => {
    let biggestGroup = 0
    let biggestVisibleGroup = 0
    let maxGroupedActor = 0
    let maxGroupedVisibleActor = 0
    let visibleActorsList= Array.from(storyGram.processedData.actors)
            .map(actorKV => actorKV[1])
            .filter((actor: Actor) => {
                return !actor.isHidden
            })
    let allActorsList= Array.from(storyGram.data.actors).map(actorKV => actorKV[1])
    let allActorsListSortAmt= allActorsList.sort((a, b) => {
            if (a.layers.length === b.layers.length) return a.actorID.localeCompare(a.actorID)
            return b.layers.length - a.layers.length
        })
    let visibleEventList= storyGram.processedData.events
    let allEventsList= storyGram.data.events
    
    storyGram.data.events.forEach(event => {
        if (biggestGroup < event.group.length) {
            biggestGroup = event.group.length
        }
        if (!event.isHidden && (biggestVisibleGroup < event.group.length)) {
            biggestVisibleGroup = event.group.length
        }
    })
    allActorsList!.forEach(actor => {
        if (maxGroupedActor < actor.layers.length) {
            maxGroupedActor = actor.layers.length
        }
        if (!actor.isHidden && (maxGroupedVisibleActor < actor.layers.length)) {
            maxGroupedVisibleActor = actor.layers.length
        }
    })
    return {
        visibleActorsList,
        visibleEventList,
        allActorsList,
        allActorsListSortAmt,
        allEventsList,
        biggestGroup,
        biggestVisibleGroup,
        maxGroupedActor,
        maxGroupedVisibleActor
    }
}

export const getActorFromString = (actorID: string, storyGram: Storygram) => {
    return storyGram.data.actors.get(actorID)
}
