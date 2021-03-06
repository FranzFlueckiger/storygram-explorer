import React, {FC} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, List, ListItem, Divider, ListItemText, TextField} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Config, Storygram} from 'storygram';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {ListboxComponent, renderGroup} from './ActorAutoComplete';
import {StoryGramMetadata} from '../../Util/storyGramHelpers';
import {onChangeAutoComplete, stringifyActorsFromID, stringifyActorsFromActorList} from '../../Util/actorCodec';

type FilterSettingsProps = {
    drawerWidth: number,
    storyGram: Storygram,
    config: Config,
    setConfig: React.Dispatch<React.SetStateAction<Config>>,
    expandedMenu: boolean | "Data" | "Actors" | "Events" | "Filtering" | "Layout",
    handleMenuChange: (panel: any) => (event: any, isExpanded: boolean) => void,
    metaData: StoryGramMetadata,
    isDrawable: boolean
}

export const FilterSettings: FC<FilterSettingsProps> = ({drawerWidth, storyGram, config, setConfig, expandedMenu, handleMenuChange, metaData, isDrawable}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            //display: 'flex',
            width: '100%'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
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

    return (
        <div className={classes.root}>

            <ExpansionPanel
                expanded={expandedMenu === 'Filtering'}
                onChange={handleMenuChange('Filtering')}
            >
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
                        {
                            storyGram.config.inferredEventType === 'datestring' ?
                                <>
                                    <ListItem>
                                        <TextField
                                            id="date"
                                            label="From"
                                            type="date"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={storyGram.config.filterEventValue![0]! as number}
                                            onChange={(event: any) => {
                                                setConfig({...config, filterEventValue: [event.target.value, storyGram.config.filterEventValue![1]!]});
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
                                            value={storyGram.config.filterEventValue![1]! as number}
                                            onChange={(event: any) => {
                                                setConfig({...config, filterEventValue: [storyGram.config.filterEventValue![0]!, event.target.value]});
                                            }}
                                        />
                                    </ListItem>
                                </>
                                :
                                <>
                                    <ListItem>
                                        <TextField
                                            id="standard-number"
                                            label="From"
                                            type="number"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={storyGram.config.filterEventValue[0] ? storyGram.config.filterEventValue![0] as number : metaData.firstEvent}
                                            onChange={(event: any) => {
                                                let value = Number(event.target.value)
                                                const minValue = metaData.firstEvent?.eventXValue as number
                                                const maxValue = metaData.lastEvent?.eventXValue as number
                                                if(typeof value !== 'number' || value < minValue) value = minValue
                                                else if(value > maxValue) value = maxValue
                                                setConfig({
                                                    ...config,
                                                    filterEventValue: [value, storyGram.config.filterEventValue![1]]
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
                                            value={storyGram.config.filterEventValue[1] ? storyGram.config.filterEventValue![1] as number : metaData.lastEvent}
                                            onChange={(event: any) => {
                                                let value = Number(event.target.value)
                                                const minValue = metaData.firstEvent?.eventXValue as number
                                                const maxValue = metaData.lastEvent?.eventXValue as number
                                                if(typeof value !== 'number' || value > maxValue) value = maxValue
                                                else if(value < minValue) value = minValue
                                                setConfig({
                                                    ...config,
                                                    filterEventValue: [storyGram.config.filterEventValue![0], value]
                                                })
                                            }}
                                        />
                                    </ListItem>
                                </>}
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Group size" />
                        </ListItem>
                        <ListItem>
                            <TextField
                                id="standard-number"
                                label="From"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={storyGram.config.filterGroupSize[0] ? storyGram.config.filterGroupSize![0] as number : 1}
                                onChange={(event: any) => {
                                    let value = event.target.value
                                    const maxSize = metaData.biggestGroup
                                    if(value < 1) value = 1
                                    else if(!value || value > maxSize) value = 1
                                    setConfig({
                                        ...config,
                                        filterGroupSize: [value, storyGram.config.filterGroupSize![1]]
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
                                value={storyGram.config.filterGroupSize[1] ? storyGram.config.filterGroupSize![1] as number : metaData.biggestGroup}
                                onChange={(event: any) => {
                                    let value = event.target.value
                                    const maxSize = metaData.biggestGroup
                                    if(!value || value < 1) value = 1
                                    else if(value > maxSize) value = maxSize
                                    setConfig({
                                        ...config,
                                        filterGroupSize: [storyGram.config.filterGroupSize![0], value]
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
                                value={storyGram.config.filterGroupAmt[0] ? storyGram.config.filterGroupAmt![0] as number : 1}
                                onChange={(event: any) => {
                                    let value = event.target.value
                                    const maxSize = metaData.maxGroupedActor
                                    if(value < 1) value = 1
                                    else if(!value || value > maxSize) value = 1
                                    setConfig({
                                        ...config,
                                        filterGroupAmt: [value, storyGram.config.filterGroupAmt![1]]
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
                                value={storyGram.config.filterGroupAmt[1] ? storyGram.config.filterGroupAmt![1] as number : metaData.maxGroupedActor}
                                onChange={(event: any) => {
                                    let value = event.target.value
                                    const maxSize = metaData.maxGroupedActor
                                    if(!value || value < 1) value = 1
                                    else if(value > maxSize) value = maxSize
                                    setConfig({
                                        ...config,
                                        filterGroupAmt: [storyGram.config.filterGroupAmt![0], value]
                                    })
                                }}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText primary="Event contains some actors" />
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
                                value={stringifyActorsFromID('shouldContain', storyGram, metaData)}
                                onChange={onChangeAutoComplete('shouldContain', setConfig, config)}
                            />
                        </ListItem>

                        <Divider />
                        <ListItem>
                            <ListItemText primary="Event contains all actors" />
                        </ListItem>
                        <ListItem>
                            <Autocomplete
                                id="contains_all_actors"
                                style={{width: '100%'}}
                                disableListWrap
                                ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
                                getOptionLabel={(actor) => actor}
                                renderGroup={renderGroup}
                                options={stringifyActorsFromActorList(metaData.allActorsListSortAmt)}
                                renderInput={(params) => <TextField {...params} variant="outlined" label="Selected actors" />}
                                multiple
                                limitTags={2}
                                value={stringifyActorsFromID('mustContain', storyGram, metaData)}
                                onChange={onChangeAutoComplete('mustContain', setConfig, config)}
                            />
                        </ListItem>
                    </List>

                </ExpansionPanelDetails>
            </ExpansionPanel> 

        </div >
    );

}
