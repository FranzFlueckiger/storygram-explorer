import React, {FC, useRef, useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import {List, ListItem, Checkbox, Paper, Divider, Grid, TextField} from '@material-ui/core';
import {Actor} from 'storygram/dist/Types';
import {Virtuoso} from 'react-virtuoso';
import {ActorListElement} from './ActorListElement';
import {StoryGramMetadata} from '../../Util/storyGramHelpers';
import { appBarHeight } from '../../Util/constants';

type ActorListProps = {
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

export const ActorList: FC<ActorListProps> = ({ metaData }) => {
    
    const loadedCount = useRef(0);
    const endReached = useRef(false);
    const [loadedUsers, setLoadedUsers] = useState<Actor[]>([]);
    const allActorsList = metaData.allActorsList.sort((a, b) => a.isHidden ? -1 : 1)
    const [actors, setActors] = useState(allActorsList)
    const [query, setQuery] = useState('')

    const handleQueryChange = (e: any) => {
        const value = e.target.value
        setQuery(value)
        setActors(allActorsList
            .filter(actor => {
                return actor.actorID.toLowerCase().includes(query.toLowerCase()) ||
                    Object.values(actor.data)
                    .some(value => { 
                        if(value) {
                            (value as any).toString().toLowerCase()
                                .includes(query.toLowerCase())
                        }
                    })
            }))
    }

    const loadMore = () => {
        if(!endReached.current) {
            setTimeout(() => {
                loadedCount.current += 50;

                if(loadedCount.current === 500) {
                    endReached.current = true;
                }
                setLoadedUsers(actors.slice(0, loadedCount.current));
            }, 500);
        }
    };

    useEffect(loadMore, []);

    return (
        <div >
            <TextField
                id="standard-basic"
                label="Search actor"
                variant="outlined"
                margin="dense"
                value={query}
                onChange={(e: any) => handleQueryChange(e)}
                style={{marginLeft: '17px'}}
            />
            <Virtuoso
                //@ts-ignore
                ListContainer={ListContainer}
                //@ts-ignore
                ItemContainer={ItemContainer}
                style={{height: document.documentElement.clientHeight - appBarHeight - 120 }}
                totalCount={actors.length}
                footer={() => {
                    return (
                        <div>
                            {loadedUsers.length === actors.length ? '-- end -- ' : ' loading...'}
                        </div>
                    );
                }}
                endReached={loadMore}
                overscan={200}
                item={index => {
                    return (
                        <>
                            <ActorListElement actor={actors[index]} />
                        </>
                    );
                }}
            />
        </div>
    );

}
