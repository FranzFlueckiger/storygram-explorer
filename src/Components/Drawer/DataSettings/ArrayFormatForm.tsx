import React, {FC} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { ListItem, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import {Config, Storygram} from 'storygram';
import {StoryGramMetadata} from '../../../Util/storyGramHelpers';
import {ArrayData, FullConfig} from 'storygram/dist/Types';
import {SplitFunctionPicker} from '../TextPart/SplitFunctionPicker';
import {Functors} from '../../../App';

type ArrayFormatFormProps = {
    storyGram: Storygram,
    config: Config,
    setConfig: React.Dispatch<React.SetStateAction<Config>>,
    metaData: StoryGramMetadata,
    functors: Functors
}
 
export const ArrayFormatForm: FC<ArrayFormatFormProps> = ({storyGram, config, setConfig, metaData, functors}) => {

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
    const fullConfig = storyGram.config as (FullConfig & ArrayData)

    return (
        <div className={classes.root}>

            <ListItem>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Event field</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={fullConfig.eventField ? fullConfig.eventField : ''}
                        onChange={(event: React.ChangeEvent<{value: unknown}>) => {
                            // @ts-ignore
                            setConfig({...config, eventField: event.target.value});
                        }}
                    >
                        {metaData.dataKeys.map((key: string) =>
                            <MenuItem key={key} value={key}>{key}</MenuItem>)}
                    </Select>
                </FormControl>
            </ListItem>

            <ListItem>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Actor array field</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={fullConfig.actorArrayField ? fullConfig.actorArrayField : ''}
                        onChange={(event: React.ChangeEvent<{value: unknown}>) => {
                            // @ts-ignore
                            setConfig({...config, actorArrayField: event.target.value});
                        }}
                    >
                        {metaData.dataKeys.map((key: string) =>
                            <MenuItem key={key} value={key}>{key}</MenuItem>)}
                    </Select>
                </FormControl>
            </ListItem>

            <ListItem>
                <SplitFunctionPicker
                    setConfig={setConfig}
                    storyGram={storyGram}
                    functors={functors}
                >

                </SplitFunctionPicker>
            </ListItem>

        </div>
    );

} 
