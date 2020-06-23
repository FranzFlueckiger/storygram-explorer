import React, { FC } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, List, ListItem, Divider, ListItemText, Slider } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataIcon from '@material-ui/icons/Storage';
import EventIcon from '@material-ui/icons/Event';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import FilterListIcon from '@material-ui/icons/FilterList';
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';
import { Config, Storygram } from 'storygram';

type MyDrawerProps = {
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
    drawerOpen: boolean,
    drawerWidth: number,
    storyGram: Storygram,
    setStoryGram: React.Dispatch<React.SetStateAction<Storygram>>
}

export const MyDrawer: FC<MyDrawerProps> = ({ setDrawerOpen, drawerOpen, drawerWidth, storyGram, setStoryGram }) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }));

    const [expandedMenu, setExpandedMenu] = React.useState<boolean | 'Data' | 'Actors' | 'Events' | 'Filtering' | 'Layout'>(false);

    const handleMenuChange = (panel: any) => (event: any, isExpanded: boolean) => {
        setExpandedMenu(isExpanded ? panel : false);
    };

    const classes = useStyles(drawerWidth);
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={() => setDrawerOpen(false)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>

                <ExpansionPanel expanded={expandedMenu === 'Data'} onChange={handleMenuChange('Data')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <DataIcon />
                        <Typography className={classes.heading}>Data</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expandedMenu === 'Events'} onChange={handleMenuChange('Events')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <EventIcon />
                        <Typography className={classes.heading}>Events</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expandedMenu === 'Actors'} onChange={handleMenuChange('Actors')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <PeopleAltIcon />
                        <Typography className={classes.heading}>Actors</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expandedMenu === 'Filtering'} onChange={handleMenuChange('Filtering')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                    >
                        <FilterListIcon />
                        <Typography className={classes.heading}>Filtering</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem>
                                <ListItemText primary="Event value" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Group size" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Group amount" />
                                <Slider
                                    value={[
                                        storyGram.config.filterGroupAmt![0] as number,
                                        storyGram.config.filterGroupAmt![1] as number
                                    ]}
                                    min={0}
                                    max={storyGram.config.filterGroupAmt![1] as number}
                                    onChange={(_, newValue) => {
                                        // @ts-ignore
                                        storyGram.setConfig({ ...storyGram.config, filterGroupAmt: newValue })
                                        console.log(storyGram.config.filterGroupAmt)
                                        setStoryGram(storyGram)
                                        }
                                    }
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={(value) => String(value)}
                                />
                            </ListItem>
                        </List>

                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel expanded={expandedMenu === 'Layout'} onChange={handleMenuChange('Layout')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel5bh-content"
                        id="panel5bh-header"
                    >
                        <PhotoFilterIcon />
                        <Typography className={classes.heading}>Layout</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>

                    </ExpansionPanelDetails>
                </ExpansionPanel>

            </Drawer>
        </div>
    );

}
