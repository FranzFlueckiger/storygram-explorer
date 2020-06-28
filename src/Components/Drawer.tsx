import React, { FC } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Config, Storygram } from 'storygram';
import { DataSettings } from './DataSettings';
import { LayoutSettings } from './Layoutsettings';
import { FilterSettings } from './FilterSettings';
import { List, ListItem } from '@material-ui/core';
import { appBarHeight, drawerWidth } from '../Util/constants';

type MyDrawerProps = {
    storyGram: Storygram,
    config: Config,
    setConfig: React.Dispatch<React.SetStateAction<Config>>
}

export const MyDrawer: FC<MyDrawerProps> = ({ storyGram, config, setConfig }) => {

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
                                drawerWidth={drawerWidth}
                                storyGram={storyGram}
                                config={config}
                                setConfig={setConfig}
                                expandedMenu={expandedMenu}
                                handleMenuChange={handleMenuChange}
                            />
                        </ListItem>
                        <ListItem>
                            <FilterSettings
                                drawerWidth={drawerWidth}
                                storyGram={storyGram}
                                config={config}
                                setConfig={setConfig}
                                expandedMenu={expandedMenu}
                                handleMenuChange={handleMenuChange}
                            />
                        </ListItem>
                        <ListItem>
                            <LayoutSettings
                                drawerWidth={drawerWidth}
                                storyGram={storyGram}
                                config={config}
                                setConfig={setConfig}
                                expandedMenu={expandedMenu}
                                handleMenuChange={handleMenuChange}
                            />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div >
    );

}
