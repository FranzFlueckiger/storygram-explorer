import {Config, Storygram} from "storygram"
import {FullConfig, Actor} from "storygram/dist/Types"
import {StoryGramMetadata} from "./storyGramHelpers"

const stringifyActor = (actor: Actor) => actor.actorID + ' (' + actor.layers.length + ')'

export const onChangeAutoComplete = (
    target: keyof FullConfig,
    setConfig: React.Dispatch<React.SetStateAction<Config>>,
    config: Config
) =>
    ((_: any, newActors: string[]) => {
        const newActorIDs = newActors.map(stringifiedActor => {
            let wordArray = stringifiedActor.split(' ')
            wordArray.pop()
            return wordArray.join(' ')
        })
        setConfig({...config, [target]: newActorIDs});
    })

export const stringifyActorsFromID = (
    target: keyof FullConfig,
    storyGram: Storygram,
    metaData: StoryGramMetadata
) =>
    (storyGram.config[target] as [string, string]).map(actorID =>
        stringifyActor(
            metaData.getActorFromString(actorID) as Actor)
    )

export const stringifyActorsFromActorList = (actors: Actor[]) =>
    actors
        .map(actor => stringifyActor(actor))
