import React, {FC} from 'react';
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Box, Tabs, Tab} from '@material-ui/core';
import {Storygram} from 'storygram';
import {StoryGramMetadata} from '../Util/storyGramHelpers';

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

type TabPanelProps = {
    children: any,
    index: any,
    value: any,
};

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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
                        <Tab label={isDrawable ? "Events (" + metaData.visibleEventList.length + ")" : "Events"} disabled={!isDrawable}/>
                        <Tab label={isDrawable ? "Actors (" + metaData.visibleActorsList.length + ")" : "Actors"} disabled={!isDrawable}/>
                    </Tabs>
                </Toolbar>
            </AppBar>
        </div>
    );

}
