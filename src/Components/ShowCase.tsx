import React, { FC } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Config, Storygram } from 'storygram';
import { BlockBusterdata } from './exampleData';
import StorygramDrawer from './sgWrapper';
import { ActorList } from './ActorList';
import { allActorsList } from '../Util/storyGramHelpers';
import { drawerWidth } from '../Util/constants';

type MyShowCaseProps = {
    storyGram: Storygram,
    config: Config,
    data: any[],
    selectedTab: number
}

export const MyShowCase: FC<MyShowCaseProps> = ({ storyGram, config, data, selectedTab }) => {

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
                        selectedTab === 1 ? null :
                            <ActorList actors={allActorsList(storyGram)}/>
                            
                }
            </main>
        </div>
    );
}
