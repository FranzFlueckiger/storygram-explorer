import React, {FC, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {List, ListItem, Paper, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import {Event} from 'storygram/dist/Types';
import { StoryGramMetadata } from '../../Util/storyGramHelpers';
import CheckIcon from '@material-ui/icons/Check';
import NotCheckIcon from '@material-ui/icons/Clear';
import { isVisibleColumnWidth, entityColumnWidth, showRelatedEntitiesColumnWidth, dataColumnWidths } from '../../Util/constants';

type EventListElementProps = {
    event: Event,
    metaData: StoryGramMetadata,
    query: string
};

export const EventListElement: FC<EventListElementProps> = ({event, metaData, query}) => {

    const [open, setOpen] = useState<boolean>(false)

    const toggleOpen = () => setOpen(!open)

    return (
        <Paper>
            <List style={{
                display: 'flex',
                flexDirection: 'row',
                padding: 0,
            }}>
                <ListItem>
                    <Typography style={{ width: isVisibleColumnWidth }}>
                        {event.isHidden ? <NotCheckIcon /> : <CheckIcon />}
                    </Typography>
                </ListItem>
                <Divider orientation="vertical" flexItem />
                <ListItem>
                    <Typography style={{ width: entityColumnWidth}}>
                        {event.eventValue}
                    </Typography>
                </ListItem>
                <Divider orientation="vertical" flexItem />
                <ListItem>
                    <Button onClick={toggleOpen} style={{ width: showRelatedEntitiesColumnWidth }}>Show actors</Button>
                    <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={toggleOpen}>
                        <DialogTitle>Event actors</DialogTitle>
                        <DialogContent>
                            <List>
                                {event.group.map(actorID => {
                                    const actor = metaData.getActorFromString(actorID)
                                    if(actor) {
                                        return <>
                                            <Divider />
                                            <ListItem>
                                                Actor ID: {actor.actorID}
                                            </ListItem>
                                            {
                                                Object.entries(actor.data).map(entry =>
                                                    <>
                                                        <ListItem>
                                                            {entry[0] + ': ' + entry[1]}
                                                        </ListItem> 
                                                    </>
                                                )
                                            }
                                        </>
                                    }
                                    return null
                                }
                                )}
                            </List>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={toggleOpen} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ListItem>
                {Object.entries(event.data).map(entry =>
                    <>
                        <Divider orientation="vertical" flexItem />
                        <ListItem>
                            <Typography style={{ width: dataColumnWidths }}>
                                {entry[0] + ': ' + String(entry[1])}
                            </Typography>
                        </ListItem>
                    </>
                )}
            </List>
        </Paper >
    );

}
