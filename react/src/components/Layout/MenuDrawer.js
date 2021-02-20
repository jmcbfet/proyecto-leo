import React, { useContext } from 'react';
import { Divider } from '@material-ui/core';
import Lista from './Lista';
import { DashboardStyles } from '../../styles/Dashboard';
import AuthContext from '../../context/auth/authContext';
import {
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

const MenuDrawer = () => {

    const authContext = useContext(AuthContext);
    const { CerrarSesion } = authContext;

    const classes = DashboardStyles();

    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <Lista />
        </div>
    );
}

export default MenuDrawer;