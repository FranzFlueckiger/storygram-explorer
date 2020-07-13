/* eslint-disable no-use-before-define */
import React, { FC } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { StoryGramMetadata } from '../../../Util/storyGramHelpers';
import { generateTextPartGenerators, ModFunction } from './TextPartGenerator';
import { Actor, Event } from 'storygram/dist/Types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 500,
            '& > * + *': {
                marginTop: theme.spacing(3),
            },
        },
    }),
);

type TextPartPickerProps = {
    metadata: StoryGramMetadata,
    setPicked: (e: any) => void,
    state: ModFunction[]
}

export const TextPartPicker: FC<TextPartPickerProps> = ({ metadata, setPicked, state }) => {

    const classes = useStyles();

    const options = generateTextPartGenerators(metadata.dataKeys)

    const customFunc = (myString: string) => (text: string, event: Event, actor: Actor) => text + myString

    return (
        <div className={classes.root}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={options}
                getOptionLabel={(option) => option[0]}
                value={state}
                freeSolo
                onChange={(_: any, newFuncs: (string | ModFunction)[]) => setPicked(newFuncs)}
                renderInput={(params) => ( 
                    <TextField
                        {...params}
                        variant="outlined"
                        label=""
                        placeholder=""
                    />
                )}
            />
        </div>
    );
}