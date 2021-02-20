import React, { useContext } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Button
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Lista = () => {

    const authContext = useContext(AuthContext);
    const { CerrarSesion } = authContext;

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

            <Button
                variant="text"
                color="inherit"
                href="/"
                onClick={CerrarSesion}
            >
                Cerrar Sesion
            </Button>
        </List>
    )
}

export default Lista
