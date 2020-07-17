import React, {FC} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {ListItem, FormControl, InputLabel, Select, MenuItem, TextField} from '@material-ui/core';
import {Config, Storygram} from 'storygram';
import {StoryGramMetadata} from '../../../Util/storyGramHelpers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {TableData, FullConfig} from 'storygram/dist/Types';
import {SplitFunctionPicker} from '../TextPart/SplitFunctionPicker';
import {ModFunction, SplitModFunction} from '../TextPart/TextPartGenerator';
import {Functors} from '../../../App';

type TableFormatFormProps = {
    storyGram: Storygram,
    config: Config,
    setConfig: React.Dispatch<React.SetStateAction<Config>>,
    metaData: StoryGramMetadata,
    functors: Functors
}

export const TableFormatForm: FC<TableFormatFormProps> = ({storyGram, config, setConfig, metaData, functors}) => {

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
    const fullConfig = storyGram.config as (FullConfig & TableData)

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
                        {metaData.dataKeys.length ? metaData.dataKeys.map((key) =>
                            <MenuItem key={key} value={key}>{key}</MenuItem>) : "No selectable keys"}
                    </Select>
                </FormControl>
            </ListItem>

            <ListItem>
                    <Autocomplete
                        id="virtualize-demo"
                        style={{width: '100%'}}
                        options={metaData.dataKeys}
                        renderInput={(params) => <TextField {...params} variant="outlined" label="Selected actorfields" />}
                        multiple  
                        value={fullConfig.actorFields ? fullConfig.actorFields : []}
                        onChange={(_: any, newKey: string[]) => {
                            // @ts-ignore
                            setConfig({...config, actorFields: newKey});
                        }}
                    />
 
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
