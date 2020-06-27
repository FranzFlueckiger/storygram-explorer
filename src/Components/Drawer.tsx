import React, { FC } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, List, ListItem, Divider, ListItemText, Slider, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataIcon from '@material-ui/icons/Storage';
import FilterListIcon from '@material-ui/icons/FilterList';
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';
import { Config, Storygram } from 'storygram';
import { Actor } from 'storygram/dist/Types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ListboxComponent, renderGroup } from './BigAutoComplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { allActorsList, getActorFromString, storyGramColorSchemes } from '../Util/storyGramHelpers';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
  
type MyDrawerProps = {
    drawerWidth: number,
    storyGram: Storygram,
    config: Config,
    setConfig: React.Dispatch<React.SetStateAction<Config>>
}

export const MyDrawer: FC<MyDrawerProps> = ({ drawerWidth, storyGram, config, setConfig }) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            top: '65px',
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
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
            width: '100%'
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
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
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
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
                                <TextField
                                    id="date"
                                    label="From"
                                    type="date"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={new Date(Date.parse(config.filterEventValue![0]! as string)).toISOString().substring(0, 10)}
                                    onChange={(event: any) => {
                                        console.log(event.target.value)
                                        setConfig({ ...config, filterEventValue: [event.target.value, config.filterEventValue![1]!] });
                                    }}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    id="date"
                                    label="To"
                                    type="date"
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={new Date(Date.parse(config.filterEventValue![1]! as string)).toISOString().substring(0, 10)}
                                    onChange={(event: any) => {
                                        console.log(event.target.value)
                                        setConfig({ ...config, filterEventValue: [config.filterEventValue![0]!, event.target.value] });
                                    }}
                                />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    id="standard-number"
                                    label="From"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={config.filterGroupSize![0] as number}
                                    onChange={(event: any) => {
                                        let value = event.target.value
                                        const maxSize = allActorsList(storyGram).reduce((max, actor) => Math.max(max, actor.layers.length), 1)
                                        if (value < 1) value = 1
                                        else if (!value || value > maxSize) value = maxSize
                                        setConfig({
                                            ...config,
                                            filterGroupSize: [value, config.filterGroupSize![1]]
                                        })
                                    }}
                                />
                                <TextField
                                    id="standard-number"
                                    label="To"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={config.filterGroupSize![1] as number}
                                    onChange={(event: any) => {
                                        let value = event.target.value
                                        const maxSize = allActorsList(storyGram).reduce((max, actor) => Math.max(max, actor.layers.length), 1)
                                        if (!value || value < 1) value = 1
                                        else if (value > maxSize) value = maxSize
                                        setConfig({
                                            ...config,
                                            filterGroupSize: [config.filterGroupSize![0], value]
                                        })
                                    }}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Group amount" />
                            </ListItem>
                            <ListItem>
                                <TextField
                                    id="standard-number"
                                    label="From"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={config.filterGroupAmt![0] as number}
                                    onChange={(event: any) => {
                                        let value = event.target.value
                                        const maxSize = allActorsList(storyGram).reduce((max, actor) => Math.max(max, actor.layers.length), 1)
                                        if (value < 1) value = 1
                                        else if (!value || value > maxSize) value = maxSize
                                        setConfig({
                                            ...config,
                                            filterGroupAmt: [value, config.filterGroupAmt![1]]
                                        })
                                    }}
                                />
                                <TextField
                                    id="standard-number"
                                    label="To"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={config.filterGroupAmt![1] as number}
                                    onChange={(event: any) => {
                                        let value = event.target.value
                                        const maxSize = allActorsList(storyGram).reduce((max, actor) => Math.max(max, actor.layers.length), 1)
                                        if (!value || value < 1) value = 1
                                        else if (value > maxSize) value = maxSize
                                        setConfig({
                                            ...config,
                                            filterGroupAmt: [config.filterGroupAmt![0], value]
                                        })
                                    }}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <ListItemText primary="Event contains all actors" />
                            </ListItem>
                            <ListItem>
                                <Autocomplete 
                                    id="virtualize-demo"
                                    style={{ width: '100%' }}
                                    disableListWrap
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
                                        setConfig({ ...config, mustContain: newActorIDs });
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
                                    style={{ width: '100%' }}
                                    disableListWrap
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
                                        setConfig({ ...config, shouldContain: newActorIDs });
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
                                <ListItemText primary="Highlight actors" />
                            </ListItem>
                            <ListItem>
                                <Autocomplete
                                    id="virtualize-demo"
                                    style={{ width: '100%' }}
                                    disableListWrap
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
                                        setConfig({ ...config, highlight: newActorIDs });
                                    }}
                                />
                            </ListItem>
                            <ListItem>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={config.compact}
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                setConfig({ ...config, compact: event.target.checked })}
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
                                                setConfig({ ...config, continuous: event.target.checked })}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Continuous"
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Color scheme</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={config.colorScheme}
                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                            // @ts-ignore
                                            setConfig({ ...config, colorScheme: event.target.value });
                                        }}
                                    >
                                        {storyGramColorSchemes.map(colorScheme =>
                                            <MenuItem value={colorScheme}>{colorScheme}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </ListItem>
                            <Divider />
                            <ListItem>
                                Event value scaling
                            </ListItem>
                            <ListItem>
                                <Slider
                                    value={config.eventValueScaling}
                                    min={0}
                                    max={0.01}
                                    step={0.001}
                                    onChange={(_, newValue) => {
                                        setConfig({ ...config, eventValueScaling: (newValue as number) })
                                    }
                                    }
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={(value) => String(value)}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                Event padding
                            </ListItem>
                            <ListItem>
                                <Slider
                                    value={config.eventPadding}
                                    min={0}
                                    max={150}
                                    step={1}
                                    onChange={(_, newValue) => {
                                        setConfig({ ...config, eventPadding: (newValue as number) })
                                    }
                                    }
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={(value) => String(value)}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                Actor padding
                            </ListItem>
                            <ListItem>
                                <Slider
                                    value={config.actorPadding}
                                    min={0}
                                    max={150}
                                    step={1}
                                    onChange={(_, newValue) => {
                                        setConfig({ ...config, actorPadding: (newValue as number) })
                                    }
                                    }
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    getAriaValueText={(value) => String(value)}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem>
                                Line size
                            </ListItem>
                            <ListItem>
                                <Slider
                                    value={config.lineSize}
                                    min={1}
                                    max={30}
                                    step={0.5}
                                    onChange={(_, newValue) => {
                                        setConfig({ ...config, lineSize: (newValue as number) })
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
