import React, {FC} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import {ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, List, ListItem, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataIcon from '@material-ui/icons/Storage';
import {Config, Storygram} from 'storygram';
import {StoryGramMetadata} from '../../../Util/storyGramHelpers';
import {ArrayFormatForm} from './ArrayFormatForm';
import {TableFormatForm} from './TableFormatForm';
import {RangesFormatForm} from './RangesFormatForm';
import {dataSetNames} from '../../../Util/constants';
import {loadData} from '../../../Util/dataLoader';
import {SplitModFunction, ModFunction} from '../TextPart/TextPartGenerator';
import {Functors} from '../../../App';

type DataSettingsProps = {
    storyGram: Storygram,
    config: Config,
    setConfig: React.Dispatch<React.SetStateAction<Config>>,
    expandedMenu: boolean | "Data" | "Actors" | "Events" | "Filtering" | "Layout",
    handleMenuChange: (panel: any) => (event: any, isExpanded: boolean) => void,
    metaData: StoryGramMetadata,
    setData: React.Dispatch<React.SetStateAction<any[]>>,
    functors: Functors
}

export const DataSettings: FC<DataSettingsProps> = ({storyGram, config, setConfig, expandedMenu, handleMenuChange, metaData, setData, functors}) => {

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

    type AllowedDataFormat = "ranges" | "array" | "table"

    const [dataSource, setDataSource] = React.useState(dataSetNames.blockbuster)

    const classes = useStyles();
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
                    <List style={{width: '100%'}}>
                        <ListItem>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Data source</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={dataSource}
                                    onChange={(event: React.ChangeEvent<{value: unknown}>) => {
                                        const value = event.target.value as string
                                        const newDataSet = loadData(value, functors, setConfig) 
                                        setConfig(newDataSet.config);
                                        setData(newDataSet.data)
                                        setDataSource(value)
                                    }}
                                >
                                    <MenuItem value={dataSetNames.blockbuster}>{dataSetNames.blockbuster}</MenuItem>
                                    <MenuItem value={dataSetNames.metason} >{dataSetNames.metason}</MenuItem>
                                    <MenuItem value={dataSetNames.conflicts} >{dataSetNames.conflicts}</MenuItem>
                                    <MenuItem value={dataSetNames.bundesrat} >{dataSetNames.bundesrat}</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Data format</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={storyGram.config.dataFormat ? storyGram.config.dataFormat : "array"}
                                    onChange={(event: React.ChangeEvent<{value: unknown}>) => {
                                        // @ts-ignore
                                        setConfig({...config, dataFormat: event.target.value as AllowedDataFormat});
                                    }}
                                >

                                    <MenuItem value="array">Array</MenuItem>
                                    <MenuItem value="table" >Table</MenuItem>
                                    <MenuItem value="ranges" >Ranges</MenuItem>
                                </Select>
                            </FormControl>
                        </ListItem>

                        {storyGram.config.dataFormat === 'array' ?
                            <ArrayFormatForm
                                storyGram={storyGram}
                                config={config}
                                setConfig={setConfig}
                                metaData={metaData}
                                functors={functors}
                            /> :
                            storyGram.config.dataFormat === 'table' ?
                                <TableFormatForm
                                    storyGram={storyGram}
                                    config={config}
                                    setConfig={setConfig}
                                    metaData={metaData}
                                    functors={functors}
                                /> :
                                <RangesFormatForm
                                    storyGram={storyGram}
                                    config={config}
                                    setConfig={setConfig}
                                    metaData={metaData}
                                />
                        }
                    </List>

                </ExpansionPanelDetails>
            </ExpansionPanel>

        </div>
    );

}
