import {Actor, Event} from "storygram/dist/Types"

export type ModFunction = [string, (text: string, event?: Event, actor?: Actor) => string]

export const generateTextPartGenerators = (dataKeys: string[]): ModFunction[] => {
    const generatorArr: ModFunction[] = []
    dataKeys.forEach(key => generatorArr.push(
        [
            key,
            (text: string, event?: Event | undefined, actor?: Actor | undefined) => {
                if(event && key in event.data)
                    return text + event.data[key]
                else if(actor && actor.data[key])
                    return text + actor.data[key]
                return text
            }
        ])
    )
    return [
        ...generatorArr,
        ['Space', (text: string, event?: Event, actor?: Actor) => text + ' '],
        ['Comma', (text: string, event?: Event, actor?: Actor) => text + ''],
        ['Colon', (text: string, event?: Event, actor?: Actor) => text + ':'],
    ]
}

export const renderTextFunction = (
    event: Event,
    actor: Actor,
    funcs: ((text: string, event: Event, actor: Actor) => string)[]
) => {
    return funcs.reduce((acc, func) => func(acc, event, actor), '')
}
