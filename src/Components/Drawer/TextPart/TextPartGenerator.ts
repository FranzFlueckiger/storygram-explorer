import {Actor, Event} from "storygram/dist/Types"

export type ModFunction = [string, (text: string, event?: Event, actor?: Actor) => string]

export const generateTextPartGenerators = (dataKeys: string[]): ModFunction[] => {
    return dataKeys.map(key => [
        key,
        (text: string, event?: Event | undefined, actor?: Actor | undefined) => {
            if(event && key in event.data)
                return text + event.data[key]
            else if(actor && actor.data[key])
                return text + actor.data[key]
            return text
        }
    ]
    )
}

export const renderTextFunction = (funcs: (string | ModFunction)[]): ModFunction[] => {
    return funcs.map(func => {
        if(typeof func === 'string') return [func, ((text: string, event?: Event, actor?: Actor) => text + func)]
        return func
    })
}
