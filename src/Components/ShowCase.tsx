import React, { FC } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Config, Storygram } from 'storygram';
import { BlockBusterdata } from './exampleData';
import StorygramDrawer from './sgWrapper';

type MyShowCaseProps = {
    drawerOpen: boolean,
    drawerWidth: number,
    storyGram: Storygram
}

export const MyShowCase: FC<MyShowCaseProps> = ({ drawerWidth, drawerOpen, storyGram }) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: 0,
            marginTop: 70,
        },
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: drawerWidth,
        },
    }));
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: drawerOpen,
                })}
            >
                <StorygramDrawer storyGram={storyGram} />
            </main>
        </div>
    );
}