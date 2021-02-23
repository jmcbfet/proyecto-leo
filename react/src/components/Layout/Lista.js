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

            <NavLink to="/dashboard/usuarios">
                <ListItem
                    button
                >
                    <ListItemIcon>
                        <AddCircle />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                </ListItem>
            </NavLink>

            <NavLink to="/dashboard/platos">
                <ListItem
                    button
                >
                    <ListItemIcon>
                        <AddCircle />
                    </ListItemIcon>
                    <ListItemText primary="Platos" />
                </ListItem>
            </NavLink>

        </List>
    )
}

export default Lista
