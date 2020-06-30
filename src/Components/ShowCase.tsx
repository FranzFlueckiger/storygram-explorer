import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Config, Storygram } from 'storygram';
import StorygramDrawer from './sgWrapper';
import { ActorList } from './ActorList';
import { drawerWidth } from '../Util/constants';
import { StoryGramMetadata } from '../Util/storyGramHelpers';
import {EventList} from './EventList';

type MyShowCaseProps = {
    storyGram: Storygram,
    config: Config,
    data: any[],
    selectedTab: number,
    metaData: StoryGramMetadata
}

export const MyShowCase: FC<MyShowCaseProps> = ({ storyGram, config, data, selectedTab, metaData }) => {

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
                        selectedTab === 1 ? 
                        <EventList metaData={metaData} /> :
                            <ActorList metaData={metaData}/>
                }
            </main>
        </div>
    );
}
