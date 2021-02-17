import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

const Lista = () => {
    return (
        <List>
            <NavLink to="/dashboard/parte-1">
                <ListItem
                    button
                >
                    <ListItemIcon>
                        <AddCircle />
                    </ListItemIcon>
                    <ListItemText primary="dfwerfwe" />
                </ListItem>
            </NavLink>

            <NavLink to="/dashboard/parte-2">
                <ListItem
                    button
                >
                    <ListItemIcon>
                        <AddCircle />
                    </ListItemIcon>
                    <ListItemText primary="fdefeffefefef" />
                </ListItem>
            </NavLink>
        </List>
    )
}

export default Lista
