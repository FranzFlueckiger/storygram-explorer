import React, {FC} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, List, ListItem, Divider, ListItemText, Slider, TextField, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
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
import {visibleActorsList, allActorsList, getActorFromString, storyGramColorSchemes} from '../Util/storyGramHelpers';

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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
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
                        <Typography className={classes.heading}>Actors({visibleActorsList(storyGram).length})</Typography>
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
                                <ListItemText primary="Highlight" />
                            </ListItem>
                            <ListItem>
                                <Autocomplete
                                    id="virtualize-demo"
                                    style={{width: '100%'}}
                                    disableListWrap
                                    classes={classes}
                                    ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
                                    getOptionLabel={(actor) => actor!.actorID + ' (' + actor!.layers.length + ')'}
                                    renderGroup={renderGroup}
                                    options={allActorsList(storyGram)}
                                    renderInput={(params) => <TextField {...params} variant="outlined" label="Selected actors" />}
                                    multiple
                                    limitTags={2}
                                    defaultValue={config.highlight?.map(actorID => {
                                        return getActorFromString(actorID, storyGram)
                                    })}
                                    // @ts-ignore
                                    onChange={(_: any, newActors: Actor[] | null) => {
                                        const newActorIDs = newActors ? newActors.map(actor => actor.actorID) : []
                                        setConfig({...config, highlight: newActorIDs});
                                    }}
                                />
                            </ListItem>
                        </List>

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
                            </ListItem>
                            <ListItem>
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
                            </ListItem>
                            <ListItem>
                                <Slider
                                    value={[
                                        config.filterGroupAmt![0] as number,
                                        config.filterGroupAmt![1] as number
                                    ]}
                                    min={1}
                                    max={visibleActorsList(storyGram).reduce((maxAmt, actor) => {
                                        return Math.max(
                                            maxAmt,
                                            actor.layers
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
                                    getOptionLabel={(actor) => actor!.actorID + ' (' + actor!.layers.length + ')'}
                                    renderGroup={renderGroup}
                                    options={allActorsList(storyGram)}
                                    renderInput={(params) => <TextField {...params} variant="outlined" label="Selected actors" />}
                                    multiple
                                    limitTags={2}
                                    defaultValue={config.mustContain?.map(actorID => {
                                        return getActorFromString(actorID, storyGram)
                                    })}
                                    // @ts-ignore
                                    onChange={(_: any, newActors: Actor[] | null) => {
                                        const newActorIDs = newActors ? newActors.map(actor => actor.actorID) : []
                                        setConfig({...config, mustContain: newActorIDs});
                                    }}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Event contains some actors" />
                            </ListItem>
                            <ListItem>
                                <Autocomplete
                                    id="virtualize-demo"
                                    style={{width: '100%'}}
                                    disableListWrap
                                    classes={classes}
                                    ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
                                    getOptionLabel={(actor) => actor!.actorID + ' (' + actor!.layers.length + ')'}
                                    renderGroup={renderGroup}
                                    options={allActorsList(storyGram)}
                                    renderInput={(params) => <TextField {...params} variant="outlined" label="Selected actors" />}
                                    multiple
                                    limitTags={2}
                                    defaultValue={config.shouldContain?.map(actorID => {
                                        return getActorFromString(actorID, storyGram)
                                    })}
                                    // @ts-ignore
                                    onChange={(_: any, newActors: Actor[] | null) => {
                                        const newActorIDs = newActors ? newActors.map(actor => actor.actorID) : []
                                        setConfig({...config, shouldContain: newActorIDs});
                                    }}
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
                        <List
                            component="nav"
                            aria-label="main mailbox folders"
                            style={{
                                width: '100%'
                            }}
                        >
                            <ListItem>
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
                            </ListItem>
                            <Divider />
                            <ListItem>
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
                            </ListItem>
                            <ListItem>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Color scheme</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={config.colorScheme}
                                        onChange={(event: React.ChangeEvent<{value: unknown}>) => {
                                            // @ts-ignore
                                            setConfig({...config, colorScheme: event.target.value});
                                        }}
                                    >
                                        {storyGramColorSchemes.map(colorScheme =>
                                            <MenuItem value={colorScheme}>{colorScheme}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </ListItem>
                            <ListItem>
                                <Slider
                                    value={config.eventValueScaling}
                                    min={0}
                                    max={0.01}
                                    step={0.001}
                                    onChange={(_, newValue) => {
                                        setConfig({...config, eventValueScaling: (newValue as number)})
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

            </Drawer>
        </div >
    );

}
