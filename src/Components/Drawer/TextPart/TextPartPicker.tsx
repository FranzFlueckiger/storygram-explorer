/* eslint-disable no-use-before-define */
import React, { FC } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { ModFunction } from './TextPartGenerator';

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
    setPicked: (e: any) => void,
    state: ModFunction[],
    options: ModFunction[],
    name: string
}

export const TextPartPicker: FC<TextPartPickerProps> = ({setPicked, state, options, name }) => {

    const classes = useStyles();
    
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
                        label={name}
                        placeholder={name}
                    />
                )}
            />
        </div>
    );
}
