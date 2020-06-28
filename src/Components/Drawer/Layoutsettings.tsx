import React, { FC } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, List, ListItem, Divider, ListItemText, Slider, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';
import { Config, Storygram } from 'storygram';
import { Actor } from 'storygram/dist/Types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ListboxComponent, renderGroup } from '../BigAutoComplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { getActorFromString, storyGramColorSchemes, StoryGramMetadata } from '../../Util/storyGramHelpers';

type LayoutSettingsProps = {
    drawerWidth: number,
    storyGram: Storygram,
    config: Config,
    setConfig: React.Dispatch<React.SetStateAction<Config>>,
    expandedMenu: boolean | "Data" | "Actors" | "Events" | "Filtering" | "Layout",
    handleMenuChange: (panel: any) => (event: any, isExpanded: boolean) => void,
    metaData: StoryGramMetadata
}

export const LayoutSettings: FC<LayoutSettingsProps> = ({ drawerWidth, storyGram, config, setConfig, expandedMenu, handleMenuChange, metaData }) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            //display: 'flex',
            width: '100%'
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

    const classes = useStyles(drawerWidth);
    const theme = useTheme();

    return (
        <div className={classes.root}>

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
                                options={metaData.allActorsListSortAmt}
                                renderInput={(params) => <TextField {...params} variant="outlined" label="Selected actors" />}
                                multiple
                                limitTags={2}
                                defaultValue={storyGram.config.highlight?.map(actorID => {
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
                                        checked={storyGram.config.compact}
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
                                        checked={storyGram.config.continuous}
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
                                    value={storyGram.config.colorScheme}
                                    onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                        // @ts-ignore
                                        setConfig({ ...config, colorScheme: event.target.value });
                                    }}
                                >
                                    {storyGramColorSchemes.map((colorScheme, key) =>
                                        <MenuItem key={key} value={colorScheme}>{colorScheme}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            Event value scaling
                            </ListItem>
                        <ListItem>
                            <Slider
                                value={storyGram.config.eventValueScaling}
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
                                value={storyGram.config.eventPadding}
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
                                value={storyGram.config.actorPadding}
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
                                value={storyGram.config.lineSize}
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

        </div >
    );

}
