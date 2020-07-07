import React, {FC} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Box, Tabs, Tab} from '@material-ui/core';
import {Storygram} from 'storygram';
import {StoryGramMetadata} from '../Util/storyGramHelpers';
 
type MyAppBarProps = {
    storyGram: Storygram,
    selectedTab: number,
    setSelectedTab: React.Dispatch<React.SetStateAction<number>>,
    metaData: StoryGramMetadata,
    isDrawable: boolean
}

export const MyAppBar: FC<MyAppBarProps> = ({storyGram, selectedTab, setSelectedTab, metaData, isDrawable}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }));

    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Storygram Explorer Beta
                    </Typography>
                    <Tabs
                        value={selectedTab}
                        onChange={(event, newValue) => setSelectedTab(newValue)}
                        indicatorColor="secondary"
                        textColor="secondary"
                        centered
                    >
                        <Tab label="Storygram" />
                        <Tab label={isDrawable ? "Events (" + metaData.visibleEventList.length + ")" : "Events"} disabled={!isDrawable} />
                        <Tab label={isDrawable ? "Actors (" + metaData.visibleActorsList.length + ")" : "Actors"} disabled={!isDrawable} />
                    </Tabs>
                </Toolbar>
            </AppBar>
        </div>
    );

}
