import React, {FC} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, List, ListItem, Divider, ListItemText, Slider, TextField, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';
import {Config, Storygram} from 'storygram';
import {Actor, Event} from 'storygram/dist/Types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {ListboxComponent, renderGroup} from './ActorAutoComplete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {storyGramColorSchemes, StoryGramMetadata} from '../../Util/storyGramHelpers';
import {stringifyActorsFromActorList, stringifyActorsFromID, onChangeAutoComplete} from '../../Util/actorCodec';
import {TextPartPicker} from './TextPart/TextPartPicker';
import {type} from 'os';
import {ModFunction, renderTextFunction, generateSGDataAccessors, generateEventAccessors, generateActorAccessors, generateNoneAccessor, SplitModFunction} from './TextPart/TextPartGenerator';

type LayoutSettingsProps = {
    drawerWidth: number,
    storyGram: Storygram,
    config: Config,
    setConfig: React.Dispatch<React.SetStateAction<Config>>,
    expandedMenu: boolean | "Data" | "Actors" | "Events" | "Filtering" | "Layout",
    handleMenuChange: (panel: any) => (event: any, isExpanded: boolean) => void,
    metaData: StoryGramMetadata,
    isDrawable: boolean,
    functors: {
        eventDescs: ModFunction[];
        setEventDescs: React.Dispatch<React.SetStateAction<ModFunction[]>>;
        eventURLs: ModFunction[];
        setEventURLs: React.Dispatch<React.SetStateAction<ModFunction[]>>,
        actorURLs: ModFunction[];
        setActorURLs: React.Dispatch<React.SetStateAction<ModFunction[]>>,
        actorColor: ModFunction[];
        setActorColor: React.Dispatch<React.SetStateAction<ModFunction[]>>,
        actorSplitFunc: SplitModFunction[];
        setActorSplitFunc: React.Dispatch<React.SetStateAction<SplitModFunction[]>>,
    }
}

export const LayoutSettings: FC<LayoutSettingsProps> = ({drawerWidth, storyGram, config, setConfig, expandedMenu, handleMenuChange, metaData, isDrawable, functors}) => {

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

    const setEventDescription = (funcs: (string | ModFunction)[]) => {
        const defFuncs = renderTextFunction(funcs)
        let endFunc = (event: Event) => defFuncs.reduce<string>((acc, func) => func[1](acc, event), '')
        functors.setEventDescs(defFuncs)
        setConfig({...config, eventDescription: endFunc})
    }

    const setEventURL = (funcs: (string | ModFunction)[]) => {
        const defFuncs = renderTextFunction(funcs)
        let endFunc = (event: Event) => defFuncs.reduce<string>((acc, func) => func[1](acc, event), '')
        functors.setEventURLs(defFuncs)
        setConfig({...config, eventUrl: endFunc})
    }

    const setActorURL = (funcs: (string | ModFunction)[]) => {
        const defFuncs = renderTextFunction(funcs)
        let endFunc = (event: Event, actor: Actor) => defFuncs.reduce<string>((acc, func) => func[1](acc, event, actor), '')
        functors.setActorURLs(defFuncs)
        setConfig({...config, url: endFunc})
    }

    const setActorColor = (key: string) => {
        const func: ModFunction = dataOptions.find(opt => opt[0] === key)!
        const defFuncs = renderTextFunction([func])
        let endFunc = (event: Event, actor: Actor) =>
            defFuncs.reduce<string>((acc, func) => func[1](acc, event, actor), '')
        functors.setActorColor(defFuncs)
        setConfig({...config, actorColor: endFunc})
    }

    const dataOptions = generateSGDataAccessors(metaData.dataKeys)
    const noneOption = generateNoneAccessor()
    const eventOptions = generateEventAccessors().concat(dataOptions)
    const actorOptions = generateActorAccessors().concat(dataOptions)

    return (
        <div className={classes.root}>

            <ExpansionPanel
                expanded={expandedMenu === 'Layout'}
                onChange={handleMenuChange('Layout')}
                disabled={!isDrawable}
            >
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
                            <ListItemText primary="Event description" />
                        </ListItem>
                        <ListItem>
                            <TextPartPicker
                                metadata={metaData}
                                setPicked={setEventDescription}
                                state={functors.eventDescs}
                                options={eventOptions}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemText primary="Event URL" />
                        </ListItem>
                        <ListItem>
                            <TextPartPicker
                                metadata={metaData}
                                setPicked={setEventURL}
                                state={functors.eventURLs}
                                options={eventOptions}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemText primary="Actor URL" />
                        </ListItem>
                        <ListItem>
                            <TextPartPicker
                                metadata={metaData}
                                setPicked={setActorURL}
                                state={functors.actorURLs}
                                options={actorOptions}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemText primary="Highlight actors" />
                        </ListItem>
                        <ListItem>
                            <Autocomplete
                                id="contains_some_actors"
                                style={{width: '100%'}}
                                disableListWrap
                                ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
                                getOptionLabel={(actor) => actor}
                                renderGroup={renderGroup}
                                options={stringifyActorsFromActorList(metaData.allActorsListSortAmt)}
                                renderInput={(params) => <TextField {...params} variant="outlined" label="Selected actors" />}
                                multiple
                                limitTags={2}
                                value={stringifyActorsFromID('highlight', storyGram, metaData)}
                                onChange={onChangeAutoComplete('highlight', setConfig, config)}
                            />
                        </ListItem>

                        <ListItem>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Actor color</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={functors.actorColor[0]}
                                    onChange={(event: React.ChangeEvent<{value: unknown}>) => {
                                        setActorColor(event.target.value as string)
                                    }}
                                >
                                    {dataOptions.map((option, key) =>
                                        <MenuItem key={key} value={option[0]}>{option[0]}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </ListItem>

                        <ListItem>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={storyGram.config.compact}
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
                                        checked={storyGram.config.continuous}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                            setConfig({...config, continuous: event.target.checked})}
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
                                    onChange={(event: React.ChangeEvent<{value: unknown}>) => {
                                        // @ts-ignore
                                        setConfig({...config, colorScheme: event.target.value});
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
                                    setConfig({...config, eventValueScaling: (newValue as number)})
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
                                    setConfig({...config, eventPadding: (newValue as number)})
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
                                    setConfig({...config, actorPadding: (newValue as number)})
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
                                    setConfig({...config, lineSize: (newValue as number)})
                                }
                                }
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                getAriaValueText={(value) => String(value)}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            Generation amount
                            </ListItem>
                        <ListItem>
                            <Slider
                                value={storyGram.config.generationAmt}
                                min={5}
                                max={100}
                                step={5}
                                onChange={(_, newValue) => {
                                    setConfig({...config, generationAmt: (newValue as number)})
                                }
                                }
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                getAriaValueText={(value) => String(value)}
                            />
                        </ListItem>

                        <Divider />
                        <ListItem>
                            Population size
                            </ListItem>
                        <ListItem>
                            <Slider
                                value={storyGram.config.populationSize}
                                min={5}
                                max={100}
                                step={5}
                                onChange={(_, newValue) => {
                                    setConfig({...config, populationSize: (newValue as number)})
                                }
                                }
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                getAriaValueText={(value) => String(value)}
                            />
                        </ListItem>

                        <Divider />
                        <ListItem>
                            Top margin
                            </ListItem>
                        <ListItem>
                            <Slider
                                value={storyGram.config.marginTop}
                                min={5}
                                max={1000}
                                step={5}
                                onChange={(_, newValue) => {
                                    setConfig({...config, marginTop: (newValue as number)})
                                }
                                }
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                getAriaValueText={(value) => String(value)}
                            />
                        </ListItem>

                        <Divider />
                        <ListItem>
                            Bottom margin
                            </ListItem>
                        <ListItem>
                            <Slider
                                value={storyGram.config.marginBottom}
                                min={5}
                                max={1000}
                                step={5}
                                onChange={(_, newValue) => {
                                    setConfig({...config, marginBottom: (newValue as number)})
                                }
                                }
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                getAriaValueText={(value) => String(value)}
                            />
                        </ListItem>

                        <Divider />
                        <ListItem>
                            Left margin
                            </ListItem>
                        <ListItem>
                            <Slider
                                value={storyGram.config.marginLeft}
                                min={5}
                                max={1000}
                                step={5}
                                onChange={(_, newValue) => {
                                    setConfig({...config, marginLeft: (newValue as number)})
                                }
                                }
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                getAriaValueText={(value) => String(value)}
                            />
                        </ListItem>

                        <Divider />
                        <ListItem>
                            Right margin
                            </ListItem>
                        <ListItem>
                            <Slider
                                value={storyGram.config.marginRight}
                                min={5}
                                max={1000}
                                step={5}
                                onChange={(_, newValue) => {
                                    setConfig({...config, marginRight: (newValue as number)})
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
