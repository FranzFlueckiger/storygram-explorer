import React, {FC} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {Config, Storygram} from 'storygram';
import {DataSettings} from './DataSettings/DataSettings';
import {LayoutSettings} from './Layoutsettings';
import {FilterSettings} from './FilterSettings';
import {List, ListItem, ExpansionPanel, ExpansionPanelSummary, Typography, Button} from '@material-ui/core';
import {appBarHeight, drawerWidth} from '../../Util/constants';
import {StoryGramMetadata} from '../../Util/storyGramHelpers';
import {ModFunction, SplitModFunction} from './TextPart/TextPartGenerator';
import {Functors} from '../../App';
import InfoIcon from '@material-ui/icons/InfoOutlined';

type MyDrawerProps = {
    storyGram: Storygram,
    config: Config,
    setConfig: React.Dispatch<React.SetStateAction<Config>>,
    metaData: StoryGramMetadata,
    setData: React.Dispatch<React.SetStateAction<any[]>>,
    isDrawable: boolean,
    functors: Functors
}

export const MyDrawer: FC<MyDrawerProps> = ({storyGram, config, setConfig, metaData, setData, isDrawable, functors}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            top: appBarHeight + 'px',
            position: 'relative',
            width: drawerWidth,
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
    }));

    const [expandedMenu, setExpandedMenu] = React.useState<boolean | 'Data' | 'Actors' | 'Events' | 'Filtering' | 'Layout'>(false);

    const handleMenuChange = (panel: any) => (event: any, isExpanded: boolean) => {
        setExpandedMenu(isExpanded ? panel : false);
    };

    const classes = useStyles(drawerWidth);
    const theme = useTheme();

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
            >
                <div className={classes.drawerPaper}>
                    <List>
                        <ListItem>
                            <DataSettings
                                storyGram={storyGram}
                                config={config}
                                setConfig={setConfig}
                                expandedMenu={expandedMenu}
                                handleMenuChange={handleMenuChange}
                                metaData={metaData}
                                setData={setData}
                                functors={functors}
                            />
                        </ListItem>
                        <ListItem>
                            {
                                isDrawable ?
                                    <FilterSettings
                                        drawerWidth={drawerWidth}
                                        storyGram={storyGram}
                                        config={config}
                                        setConfig={setConfig}
                                        expandedMenu={expandedMenu}
                                        handleMenuChange={handleMenuChange}
                                        metaData={metaData}
                                        isDrawable={isDrawable}
                                    /> :
                                    <div>
                                        <ExpansionPanel
                                            expanded={expandedMenu === 'Filtering'}
                                            onChange={handleMenuChange('Filtering')}
                                            disabled={!isDrawable}
                                        >
                                            <></>
                                        </ExpansionPanel>
                                    </div>
                            }
                        </ListItem>
                        <ListItem>
                            {
                                isDrawable ?
                                    <LayoutSettings
                                        drawerWidth={drawerWidth}
                                        storyGram={storyGram}
                                        config={config}
                                        setConfig={setConfig}
                                        expandedMenu={expandedMenu}
                                        handleMenuChange={handleMenuChange}
                                        metaData={metaData}
                                        isDrawable={isDrawable}
                                        functors={functors}
                                    /> :
                                    <div>
                                        <ExpansionPanel
                                            expanded={expandedMenu === 'Layout'}
                                            onChange={handleMenuChange('Layout')}
                                            disabled={!isDrawable}
                                        >
                                            <></>
                                        </ExpansionPanel>
                                    </div>
                            }
                        </ListItem>
                        <ListItem>
                            <ExpansionPanel>
                                <Button href='https://storygram.netlify.app/' target='blank'>
                                    <ExpansionPanelSummary 
                                    aria-controls="panel4bh-content"
                                    id="panel4bh-header" 
                                    >
                                        <InfoIcon /> 
                                        <Typography className={classes.heading}>Help</Typography>
                                    </ExpansionPanelSummary>
                                </Button>
                            </ExpansionPanel>


                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div >
    );

}
