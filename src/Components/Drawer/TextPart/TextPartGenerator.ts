import { Actor, Event } from "storygram/dist/Types"

export const generateTextPartGenerators = (dataKeys: string[]) => {
    const generatorObj: Record<string, (text: string, event?: Event, actor?: Actor) => string> = {}
    dataKeys.forEach(key => generatorObj[key] = (text: string, event?: Event, actor?: Actor) => {
        if (event && key in event.data)
            return text + event.data[key]
        else if (actor && actor.data[key])
            return text + actor.data[key]
        return text
    })
    return {
        ...generatorObj,
        'Space': (text: string, event?: Event, actor?: Actor) => text + ' ',
        'Comma': (text: string, event?: Event, actor?: Actor) => text + '',
        'Colon': (text: string, event?: Event, actor?: Actor) => text + ':',
    }
} 

export const renderTextFunction = (
    event: Event,
    actor: Actor,
    funcs: ((text: string, event: Event, actor: Actor) => string)[]
) => {
    return funcs.reduce((acc, func) => func(acc, event, actor), '')
}
