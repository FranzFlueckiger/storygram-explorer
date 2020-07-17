import React, {FC, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {List, ListItem, Checkbox, Paper, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import {Actor} from 'storygram/dist/Types';

type ActorListElementProps = {
    actor: Actor
};

const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
};

export const ActorListElement: FC<ActorListElementProps> = ({actor}) => {

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
                        <Checkbox disabled checked={actor.isHidden} inputProps={{'aria-label': 'disabled checked checkbox'}} />
                    </Typography>
                </ListItem>
                <Divider orientation="vertical" flexItem />
                <ListItem>
                    <Typography style={{width: '200px'}}>
                        {actor.actorID}
                    </Typography>
                </ListItem>
                <Divider orientation="vertical" flexItem />
                <ListItem>
                    <Button onClick={toggleOpen}>Show events</Button>
                    <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={toggleOpen}>
                        <DialogTitle>Events of {actor.actorID}</DialogTitle>
                        <DialogContent>
                            <List>
                                {actor.layers.map(event =>
                                    <>
                                        <ListItem>
                                            <List>
                                                <ListItem>
                                                    Event value: {event.eventValue}
                                                </ListItem>
                                                {Object.entries(event.data).map(entry =>
                                                    <>
                                                        <ListItem>{entry[0] + ': ' + entry[1]}</ListItem>
                                                    </>
                                                )}
                                            </List>
                                        </ListItem>
                                        <Divider />
                                    </>
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
                {Object.entries(actor.data).map(entry =>
                    <>
                        <Divider orientation="vertical" flexItem />
                        <ListItem>
                            {', ' + entry[0] + ': ' + entry[1]}
                        </ListItem>
                    </>
                )}
            </List>
        </Paper >
    );

}
