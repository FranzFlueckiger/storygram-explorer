import React, {FC, useRef, useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import {List, ListItem, Checkbox, Paper, Divider, Grid, TextField} from '@material-ui/core';
import {Event} from 'storygram/dist/Types';
import {Virtuoso} from 'react-virtuoso';
import {EventListElement} from './EventListElement';
import {StoryGramMetadata} from '../Util/storyGramHelpers';
import {queryAllByAttribute} from '@testing-library/react';

type EventListProps = {
    metaData: StoryGramMetadata
};

//@ts-ignore
const ListContainer = ({listRef, style, children}) => {
    return (
        <List ref={listRef} style={{...style, padding: 0}}>
            {children}
        </List>
    );
};

//@ts-ignore
const ItemContainer = ({children, ...props}) => {
    return (
        <ListItem {...props} style={{margin: 0}}>
            {children}
        </ListItem>
    );
};

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
};

export const EventList: FC<EventListProps> = ({metaData}) => {

    const loadedCount = useRef(0);
    const endReached = useRef(false);
    const [loadedUsers, setLoadedUsers] = useState<Event[]>([]);
    const [events, setEvents] = useState(metaData.allEventsList)
    const [query, setQuery] = useState('')

    const handleQueryChange = (e: any) => {
        const value = e.target.value
        setQuery(value)
        setEvents(metaData.allEventsList
            .filter(event => {
                return Object.values(event.data)
                    .some(value =>
                        (value as any).toString().toLowerCase()
                            .includes(query.toLowerCase()))
            }))
    }

    const loadMore = () => {
        if(!endReached.current) {
            setTimeout(() => {
                loadedCount.current += 50;

                if(loadedCount.current === 500) {
                    endReached.current = true;
                }

                // in a real world scenario, you would fetch the next
                // slice and append it to the existing records
                setLoadedUsers(events.slice(0, loadedCount.current));
            }, 500);
        }
    };

    useEffect(loadMore, []);

    return (
        <div >
            <TextField
                id="standard-basic"
                label="Search event"
                value={query}
                onChange={(e) => handleQueryChange(e)}
            />
            <Virtuoso
                //@ts-ignore
                ListContainer={ListContainer}
                //@ts-ignore
                ItemContainer={ItemContainer}
                // todo
                style={{width: '600px%', height: '520px'}}
                totalCount={events.length}
                footer={() => {
                    return (
                        <div>
                            {loadedUsers.length === events.length ? '-- end -- ' : ' loading...'}
                        </div>
                    );
                }}
                endReached={loadMore}
                overscan={200}
                item={index => {
                    return (
                        <>
                            <EventListElement event={events[index]} metaData={metaData} query={query} />
                        </>
                    );
                }}
            />
        </div>
    );

}
