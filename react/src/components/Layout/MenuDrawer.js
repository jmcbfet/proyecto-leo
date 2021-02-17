import React from 'react';
import { Divider } from '@material-ui/core';
import Lista from './Lista';
import { DashboardStyles } from '../../styles/Dashboard';

const MenuDrawer = () => {

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