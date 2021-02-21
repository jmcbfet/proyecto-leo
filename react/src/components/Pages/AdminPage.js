import React, { useState, useContext, useEffect } from 'react';
import {
    AppBar,
    CssBaseline,
    Drawer,
    Hidden,
    IconButton,
    Toolbar,
    Typography,
    Button
} from '@material-ui/core';
import {
    Menu,
} from '@material-ui/icons';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { DashboardStyles } from '../../styles/Dashboard';
import MenuDrawer from '../Layout/MenuDrawer';
import AuthContext from '../../context/auth/authContext';
import Parte1 from '../Dashboard/Parte1';
import Parte2 from '../Dashboard/Parte2';

const AdminPage = (props) => {

    const authContext = useContext(AuthContext);
    const { UsuarioAutenticado, CerrarSesion, usuario } = authContext;

    useEffect(() => {
        UsuarioAutenticado();
    }, [])

    const { window } = props;
    const classes = DashboardStyles();
    const theme = useTheme();
    const [ mobileOpen, setMobileOpen ] = useState(false);
    
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <Menu />
                        </IconButton>
                        {usuario ?
                            <Typography variant="h6" noWrap>
                                {usuario.nombre} {usuario.apellido}
                            </Typography>
                        : null
                        }
                        <div className={classes.offset}></div>
                        <Button 
                            variant="text" 
                            color="inherit"
                            href="/"
                            onClick={CerrarSesion}
                        >
                            Cerrar Sesion
                        </Button>
                    </Toolbar>
                </AppBar>

                <nav className={classes.drawer} aria-label="mailbox folders">
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            <MenuDrawer />
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            <MenuDrawer />
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Route exact path='/dashboard/parte-1' component={Parte1} />
                    <Route exact path='/dashboard/parte-2' component={Parte2} />
                </main>
            </div>
        </Router>
    )
}

export default AdminPage
