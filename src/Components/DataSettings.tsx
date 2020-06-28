import React, { FC } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, List, ListItem, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataIcon from '@material-ui/icons/Storage';
import { Config, Storygram } from 'storygram';

type DataSettingsProps = {
    drawerWidth: number,
    storyGram: Storygram,
    config: Config,
    setConfig: React.Dispatch<React.SetStateAction<Config>>,
    expandedMenu: boolean | "Data" | "Actors" | "Events" | "Filtering" | "Layout",
    handleMenuChange: (panel: any) => (event: any, isExpanded: boolean) => void
}

    export const DataSettings: FC<DataSettingsProps> = ({ drawerWidth, storyGram, config, setConfig, expandedMenu, handleMenuChange }) => {

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
            
                <ExpansionPanel expanded={expandedMenu === 'Data'} onChange={handleMenuChange('Data')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <DataIcon />
                        <Typography className={classes.heading}>Data</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List style={{ width: '100%' }}>
                            <ListItem>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Data format</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={config.dataFormat}
                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                            // @ts-ignore
                                            setConfig({ ...config, dataFormat: event.target.value });
                                        }}
                                    >

                                        <MenuItem value="array">Array</MenuItem>
                                        <MenuItem value="table" >Table</MenuItem>
                                        <MenuItem value="ranges" >Ranges</MenuItem>
                                    </Select>
                                </FormControl>
                            </ListItem>

                            <ListItem>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Event field</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // @ts-ignore
                                        value={config.eventField}
                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                            // @ts-ignore
                                            setConfig({ ...config, eventField: event.target.value });
                                        }}
                                    >
                                        // @ts-ignore 
                                        {storyGram.data.events[0] ? Object.keys(storyGram.data.events[0].data).map(key =>
                                            <MenuItem value={key}>{key}</MenuItem>) : "No selectable keys"}
                                    </Select>
                                </FormControl>
                            </ListItem>

                            <ListItem>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Actor array field</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // @ts-ignore
                                        value={config.actorArrayField}
                                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                                            // @ts-ignore
                                            setConfig({ ...config, actorArrayField: event.target.value });
                                        }}
                                    >
                                        // @ts-ignore 
                                        {storyGram.data.events[0] ? Object.keys(storyGram.data.events[0].data).map(key =>
                                            <MenuItem value={key}>{key}</MenuItem>) : "No selectable keys"}
                                    </Select>
                                </FormControl>
                            </ListItem>
                        </List>

                    </ExpansionPanelDetails>
                </ExpansionPanel>

        </div>
    );

}
 