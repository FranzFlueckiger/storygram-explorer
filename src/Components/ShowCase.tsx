import React, { FC, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Config, Storygram } from 'storygram';
import StorygramDrawer from './sgWrapper';
import { ActorList } from './ActorList';
import { drawerWidth } from '../Util/constants';
import { StoryGramMetadata } from '../Util/storyGramHelpers';
import { EventList } from './EventList';
import { Button } from '@material-ui/core';

type MyShowCaseProps = {
    storyGram: Storygram,
    selectedTab: number,
    metaData: StoryGramMetadata
}

export const MyShowCase: FC<MyShowCaseProps> = ({ storyGram, selectedTab, metaData }) => {

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
                    selectedTab === 0 ? <StoryGramViewer
                        storyGram={storyGram}
                        metaData={metaData}
                    /> :
                        selectedTab === 1 ?
                            <EventList metaData={metaData} /> :
                            <ActorList metaData={metaData} />
                }
            </main>
        </div>
    );
}

type StoryGramViewerProps = {
    storyGram: Storygram
    metaData: StoryGramMetadata
}

type StoryGramStatus = 'OK' | 'TooBig' | 'AllFiltered' | 'Broken'

const StoryGramViewer: FC<StoryGramViewerProps> = ({ storyGram, metaData }) => {

    const setNewStatus = () => {
        console.log(metaData)
        if (metaData.allEventsList.length === 0 || metaData.allActorsList.length === 0) return 'Broken'
        else if (metaData.visibleEventList.length === 0 || metaData.visibleActorsList.length === 0) return 'AllFiltered'
        else if (metaData.visibleEventList.length > 35 || metaData.visibleActorsList.length > 20) return 'TooBig'
        else return 'OK'
    }

    const [storyGramStatus, setStoryGramStatus] = useState<StoryGramStatus>(setNewStatus())

    useEffect(() => {
        setStoryGramStatus(setNewStatus())
    }, [metaData.allEventsList.length, metaData.allActorsList, metaData.visibleEventList, metaData.visibleActorsList]);
     
    return (
        <>
            {
                storyGramStatus === 'OK' ? 
                    <>
                        <StorygramDrawer storyGram={storyGram}/>
                    </>
                    :
                    storyGramStatus === 'TooBig' ?
                        <>
                            Much data to display. This could result in unintuitive visualization and/or browser crash.
                            <Button
                                variant="contained"
                                onClick={() => setStoryGramStatus('OK')}
                            >Render anyway</Button>
                        </>
                            :
                            storyGramStatus === 'AllFiltered' ?
                            'No data after filtering; change your filter settings.'
                            : 'No data could be imported'
                            } 
        </>
    )

}
