import React, { FC, useRef, useState, useEffect } from 'react';
import { List, ListItem, TextField } from '@material-ui/core';
import { Event } from 'storygram/dist/Types';
import { Virtuoso } from 'react-virtuoso';
import { EventListElement } from './EventListElement';
import { StoryGramMetadata } from '../../Util/storyGramHelpers';
import { appBarHeight } from '../../Util/constants';

type EventListProps = {
    metaData: StoryGramMetadata
};

//@ts-ignore
const ListContainer = ({ listRef, style, children }) => {
    return (
        <List ref={listRef} style={{ ...style, padding: 0 }}>
            {children}
        </List>
    );
};

//@ts-ignore
const ItemContainer = ({ children, ...props }) => {
    return (
        <ListItem {...props} style={{ margin: 0 }}>
            {children}
        </ListItem>
    );
};

export const EventList: FC<EventListProps> = ({ metaData }) => {

    const loadedCount = useRef(0);
    const endReached = useRef(false);
    const [loadedUsers, setLoadedUsers] = useState<Event[]>([]);
    const allEventsList = metaData.allEventsList.sort((a, b) => b.isHidden ? -1 : 1)
    const [events, setEvents] = useState(allEventsList)
    const [query, setQuery] = useState('')

    const handleQueryChange = (e: any) => {
        const value = e.target.value
        setQuery(value)
        setEvents(allEventsList
            .filter(event => {
                return Object.values(event.data)
                    .some(value => {
                        if (value) {
                            return (value as any).toString().toLowerCase()
                                .includes(query.toLowerCase())
                        } else return false
                    })
            })
        )
    }

    const loadMore = () => {
        if (!endReached.current) {
            setTimeout(() => {
                loadedCount.current += 50;

                if (loadedCount.current === 500) {
                    endReached.current = true;
                }
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
                variant="outlined"
                margin="dense"
                value={query}
                onChange={(e: any) => handleQueryChange(e)}
                style={{ marginLeft: '17px' }}
            />
            <Virtuoso
                //@ts-ignore
                ListContainer={ListContainer}
                //@ts-ignore
                ItemContainer={ItemContainer}
                style={{ height: document.documentElement.clientHeight - appBarHeight - 120 }}
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
