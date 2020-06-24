import React, {FC} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, List, ListItem, Divider, ListItemText, Slider, TextField} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataIcon from '@material-ui/icons/Storage';
import EventIcon from '@material-ui/icons/Event';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import FilterListIcon from '@material-ui/icons/FilterList';
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';
import {Config, Storygram} from 'storygram';
import {Actor} from 'storygram/dist/Types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {ListboxComponent, renderGroup} from './BigAutoComplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

type MyDrawerProps = {
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
    drawerOpen: boolean,
    drawerWidth: number,
    storyGram: Storygram,
    config: Config,
    setConfig: React.Dispatch<React.SetStateAction<Config>>
}

export const MyDrawer: FC<MyDrawerProps> = ({setDrawerOpen, drawerOpen, drawerWidth, storyGram, config, setConfig}) => {

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

    const visibleActors = Array.from(storyGram.processedData.actors)
        .filter((actorKV: [string, Actor]) => {
            return !actorKV[1].isHidden
        })

    const allActors = Array.from(storyGram.data.actors)
        .map(actorKV => actorKV[1])
        .sort((a, b) => {
            if(a.layers.length === b.layers.length) return a.actorID.localeCompare(b.actorID)
            return b.layers.length - a.layers.length
        })

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
                        <Typography className={classes.heading}>Events({storyGram.processedData.events.length})</Typography>
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
                        <Typography className={classes.heading}>Actors({visibleActors.length})</Typography>
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

                        <List
                            component="nav"
                            aria-label="main mailbox folders"
                            style={{
                                width: '100%'
                            }}
                        >
                            <ListItem>
                                <ListItemText primary="Event value" />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Group size" />
                                <Slider
                                    value={[
                                        config.filterGroupSize![0] as number,
                                        config.filterGroupSize![1] as number
                                    ]}
                                    min={1}
                                    max={storyGram.processedData.events
                                        .reduce((maxSize, group) => {
                                            return Math.max(maxSize, group.group.length + group.hiddenActors.length)
                                        }, 0)}
                                    step={1}
                                    marks
                                    onChange={(_, newValue) => {
                                        setConfig({...config, filterGroupSize: (newValue as [number, number])})
                                    }
                                    }
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={(value) => String(value)}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Group amount" />
                                <Slider
                                    value={[
                                        config.filterGroupAmt![0] as number,
                                        config.filterGroupAmt![1] as number
                                    ]}
                                    min={1}
                                    max={visibleActors.reduce((maxAmt, actorKV) => {
                                        return Math.max(
                                            maxAmt,
                                            actorKV[1].layers
                                                .filter(event => !event.isHidden).length)
                                    }, 0)}
                                    step={1}
                                    marks
                                    onChange={(_, newValue) => {
                                        setConfig({...config, filterGroupAmt: (newValue as [number, number])})
                                    }
                                    }
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={(value) => String(value)}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Event contains all actors" />
                            </ListItem>
                            <ListItem>
                                <Autocomplete
                                    id="virtualize-demo"
                                    style={{width: '100%'}}
                                    disableListWrap
                                    classes={classes}
                                    ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
                                    getOptionLabel={(actor) => actor.actorID + ' (' + actor.layers.length + ')'}
                                    renderGroup={renderGroup}
                                    options={allActors}
                                    //groupBy={(option) => option.isHidden.toUpperCase()}
                                    renderInput={(params) => <TextField {...params} variant="outlined" label="Selected actors" />}
                                    multiple
                                    limitTags={2}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Event contains some actors" />

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
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={config.compact}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        setConfig({...config, compact: event.target.checked})}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Compact"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={config.continuous}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                        setConfig({...config, continuous: event.target.checked})}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Continuous"
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>

            </Drawer>
        </div>
    );

}
