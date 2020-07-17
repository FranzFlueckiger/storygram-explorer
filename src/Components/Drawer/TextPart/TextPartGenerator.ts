import {Actor, Event} from "storygram/dist/Types"

export type ModFunction = [string, (text: string, event?: Event, actor?: Actor) => string]
export type SplitModFunction = [string, (text: string, event?: Event, actor?: Actor) => string[]]

export const generateSGDataAccessors = (dataKeys: string[]): ModFunction[] => {
    return dataKeys.map(key => {
        return [
            key,
            (text: string, event?: Event | undefined, actor?: Actor | undefined) => {
                if(event && key in event.data)
                    return text + event.data[key]
                else if(actor && actor.data[key])
                    return text + actor.data[key]
                return text
            }
        ]
    }
    )
}

export const generateEventAccessors = (): ModFunction[] => {
    return [
        [
            'Eventvalue',
            (text: string, event?: Event | undefined, actor?: Actor | undefined) => {
                return text + event?.eventValue
            }
        ]
    ]
}

export const generateActorAccessors = (): ModFunction[] => {
    return [
        [
            'Actor name',
            (text: string, event?: Event | undefined, actor?: Actor | undefined) => {
                return text + actor?.actorID
            }
        ]
    ]
}

export const generateNoneAccessor = (): ModFunction[] => {
    return [
        [
            'None',
            (text: string, event?: Event | undefined, actor?: Actor | undefined) => {
                return text
            }
        ]
    ]
}

export const generateNoneSplitAccessor = (): SplitModFunction[] => {
    return [
        [
            'None',
            (text: string, event?: Event | undefined, actor?: Actor | undefined) => {
                return [text]
            }
        ]
    ]
}

export const generateSplitters = (): SplitModFunction[] => {
    return [
        ['Comma (",")',
            (text: string, event?: Event | undefined, actor?: Actor | undefined) => {
                return text.split(',')
            }
        ],
        ['Space (" ")',
            (text: string, event?: Event | undefined, actor?: Actor | undefined) => {
                return text.split(' ')
            }
        ],
        ['Colon (":")',
            (text: string, event?: Event | undefined, actor?: Actor | undefined) => {
                return text.split(':')
            }
        ],
        ['Semicolon (";")',
            (text: string, event?: Event | undefined, actor?: Actor | undefined) => {
                return text.split(';')
            }
        ]
    ]
}

export const renderTextFunction = (funcs: (string | ModFunction)[]): ModFunction[] => {
    return funcs.map(func => {
        if(typeof func === 'string') return [func, ((text: string, event?: Event, actor?: Actor) => text + func)]
        return func
    })
}
