import React, {FC} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, List, ListItem, Divider, ListItemText, Slider, TextField, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PhotoFilterIcon from '@material-ui/icons/PhotoFilter';
import {Config, Storygram} from 'storygram';
import {Actor, Event} from 'storygram/dist/Types';
import {generateSplitters, ModFunction, SplitModFunction, generateNoneSplitAccessor} from '../TextPart/TextPartGenerator';
import {Functors} from '../../../App';

type SplitFunctionPickerProps = {
    setConfig: React.Dispatch<React.SetStateAction<Config>>,
    storyGram: Storygram,
    functors: Functors
}

export const SplitFunctionPicker: FC<SplitFunctionPickerProps> = ({setConfig, storyGram, functors}) => {

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

    const splitters = generateSplitters()
    const noneSplitOption = generateNoneSplitAccessor()

    const options = splitters.concat(noneSplitOption)

    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Actor split function</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={functors.actorSplitFunc[0]}
                    onChange={(event: React.ChangeEvent<{value: unknown}>) => {
                        const key = event.target.value
                        const func: SplitModFunction = options.find(splitter => splitter[0] === key)!
                        const defFunc = (text: string) => func[1](text)
                        setConfig({...storyGram.config, actorSplitFunction: defFunc})
                        functors.setActorSplitFunc([func])
                        console.log(storyGram.config.actorSplitFunction)
                        console.log(defFunc)
                        console.log(functors.actorSplitFunc)
                        console.log(func)
                    }}
                > 
                    {options.map((option, key) =>
                        <MenuItem key={key} value={option[0]}>{option[0]}</MenuItem>)}
                </Select>
            </FormControl> 
        </>
    );

}
