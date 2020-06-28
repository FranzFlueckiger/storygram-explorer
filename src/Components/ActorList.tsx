import React, { FC } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Box, Tabs, Tab, List, ListItem } from '@material-ui/core';
import { Storygram } from 'storygram';
import { FixedSizeList } from 'react-window';
import { Actor } from 'storygram/dist/Types';

type ActorListProps = {
    actors: Actor[]
};

export const ActorList: FC<ActorListProps> = ({ actors }) => {

    return (
        <div >
            <FixedSizeList height={400} width={300} itemSize={46}  itemCount={50000}>
                {actor =>
                    <ListItem>
                        Gagu
                    </ListItem>
                }
            </FixedSizeList>
        </div>
    );

}
