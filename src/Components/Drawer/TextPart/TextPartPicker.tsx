/* eslint-disable no-use-before-define */
import React, { FC } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { StoryGramMetadata } from '../../../Util/storyGramHelpers';
import { generateTextPartGenerators } from './TextPartGenerator';
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
    setPicked: (e: any) => void
}

export const TextPartPicker: FC<TextPartPickerProps> = ({ metadata, setPicked }) => {

    const classes = useStyles();

    const options = Object.entries(generateTextPartGenerators(metadata.dataKeys))

    const customFunc = (myString: string) => (text: string, event: Event, actor: Actor) => text + myString

    return (
        <div className={classes.root}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={options}
                getOptionLabel={(option) => option[0]}
                defaultValue={[]}
                freeSolo
                onChange={(_: any, newFuncs: any) =>
                    setPicked(newFuncs.map((func: any) => func[1]))}
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