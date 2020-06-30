import React, {FC, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {List, ListItem, Checkbox, Paper, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import {Event} from 'storygram/dist/Types';
import {StoryGramMetadata} from '../Util/storyGramHelpers';
import {highLightMatch} from '../Util/highlightMatch';

type EventListElementProps = {
    event: Event,
    metaData: StoryGramMetadata,
    query: string
};

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
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
                    <Typography>
                        <Checkbox disabled checked={!event.isHidden} inputProps={{'aria-label': 'disabled checked checkbox'}} />
                    </Typography>
                </ListItem>
                <Divider orientation="vertical" flexItem />
                <ListItem>
                    <Typography style={{width: '200px'}}>
                        {event.eventValue}
                    </Typography>
                </ListItem>
                <Divider orientation="vertical" flexItem />
                <ListItem>
                    <Button onClick={toggleOpen}>Show actors</Button>
                    <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={toggleOpen}>
                        <DialogTitle>Events actors</DialogTitle>
                        <DialogContent>
                            <List>
                                {event.group.map(actorID => {
                                    const actor = metaData.getActorFromString(actorID)
                                    if(actor) {
                                        return <>
                                            <ListItem>
                                                Actor ID: {actor.actorID}
                                            </ListItem>
                                            {
                                                Object.entries(actor.data).map(entry => <ListItem>
                                                    {entry[0] + ': ' + entry[1]}
                                                </ListItem>
                                                )
                                            }
                                        </>
                                    }
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
                            <Typography>
                                {console.log(JSON.stringify(entry[1]))}
                                {entry[0] + ': ' + String(entry[1])}
                            </Typography> 
                        </ListItem>
                    </>
                )}
            </List>
        </Paper >
    );

}
