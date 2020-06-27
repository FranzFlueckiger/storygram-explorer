import {Storygram} from "storygram"
import {Actor} from "storygram/dist/Types"

export const storyGramColorSchemes = ['schemeCategory10', 'schemeAccent', 'schemeDark2', 'schemePaired', 'schemePastel1', 'schemePastel2', 'schemeSet1', 'schemeSet2', 'schemeSet3']

type StoryGramMetadata = {
    visibleActorsList: Array<Actor>,
    allActorsList: Array<Actor>,
    getBiggestGroup: Event,
    getMaxGroupedActor: Actor,
    getBiggestVisibleGroup: Event,
    getMaxGroupedVisibleActor: Actor,
}

export const getStoryGramMetadata = (storyGram: Storygram) => {
    return {}
}

export const visibleActorsList = (storyGram: Storygram) => {
    return Array.from(storyGram.processedData.actors)
        .filter((actorKV: [string, Actor]) => {
            return !actorKV[1].isHidden
        })
        .map(actorKV => actorKV[1])
}

export const getActorFromString = (actorID: string, storyGram: Storygram) => {
    return storyGram.data.actors.get(actorID)
}

export const allActorsList = (storyGram: Storygram) => {
    return Array.from(storyGram.data.actors)
        .map(actorKV => actorKV[1])
        .sort((a, b) => {
            if(a.layers.length === b.layers.length) return a.actorID.localeCompare(b.actorID)
            return b.layers.length - a.layers.length
        })
}