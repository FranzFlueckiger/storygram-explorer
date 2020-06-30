import React, {FC} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, List, ListItem, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataIcon from '@material-ui/icons/Storage';
import {Config, Storygram} from 'storygram';
import {StoryGramMetadata} from '../../../Util/storyGramHelpers';

type RangesFormatFormProps = {
    storyGram: Storygram,
    config: Config,
    setConfig: React.Dispatch<React.SetStateAction<Config>>,
    metaData: StoryGramMetadata
}

export const RangesFormatForm: FC<RangesFormatFormProps> = ({storyGram, config, setConfig, metaData}) => {

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

    const classes = useStyles();
    const theme = useTheme();

    return (
        <div className={classes.root}>

            <ListItem>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Actor field</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // @ts-ignore
                        value={config.eventField}
                        onChange={(event: React.ChangeEvent<{value: unknown}>) => {
                            // @ts-ignore
                            setConfig({...config, eventField: event.target.value});
                        }}
                    >
                        // @ts-ignore 
                        {storyGram.data.events[0] ? metaData.eventDataKV.map((eventDataKV: Record<string, any>) =>
                            <MenuItem key={eventDataKV[0]} value={eventDataKV[0]}>{eventDataKV[0]}</MenuItem>) : "No selectable keys"}
                    </Select>
                </FormControl>
            </ListItem>

            <ListItem>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Start field</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // @ts-ignore
                        value={config.actorArrayField}
                        onChange={(event: React.ChangeEvent<{value: unknown}>) => {
                            // @ts-ignore
                            setConfig({...config, actorArrayField: event.target.value});
                        }}
                    >
                        {storyGram.data.events[0] ? metaData.eventDataKeys.map((eventDataKey: string) =>
                            <MenuItem key={eventDataKey} value={eventDataKey}>{eventDataKey}</MenuItem>) : "No selectable keys"}
                    </Select>
                </FormControl>
            </ListItem>

            <ListItem>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">End field</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // @ts-ignore
                        value={config.actorArrayField}
                        onChange={(event: React.ChangeEvent<{value: unknown}>) => {
                            // @ts-ignore
                            setConfig({...config, actorArrayField: event.target.value});
                        }}
                    >
                        {storyGram.data.events[0] ? metaData.eventDataKeys.map((eventDataKey: string) =>
                            <MenuItem key={eventDataKey} value={eventDataKey}>{eventDataKey}</MenuItem>) : "No selectable keys"}
                    </Select>
                </FormControl>
            </ListItem>

        </div>
    );

}
