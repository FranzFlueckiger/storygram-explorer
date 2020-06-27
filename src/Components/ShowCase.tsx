import React, { FC } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Config, Storygram } from 'storygram';
import { BlockBusterdata } from './exampleData';
import StorygramDrawer from './sgWrapper';

type MyShowCaseProps = {
    drawerWidth: number,
    storyGram: Storygram,
    config: Config,
    data: any[],
    selectedTab: number
}

export const MyShowCase: FC<MyShowCaseProps> = ({ drawerWidth, storyGram, config, data, selectedTab }) => {

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
            marginLeft: drawerWidth,
            marginTop: 70,
        },
    }));
    
    const classes = useStyles();

    return ( 
        <div className={classes.root}>
            <main className={classes.content}>
                {
                    selectedTab === 0 ? <StorygramDrawer storyGram={storyGram} config={config} data={data} /> :
                    null
                }
            </main>
        </div>
    );
}
