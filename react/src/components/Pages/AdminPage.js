import React, { useState, useContext, useEffect } from 'react';
import {
    AppBar,
    CssBaseline,
    Drawer,
    Hidden,
    IconButton,
    Toolbar,
    Button
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { DashboardStyles } from '../../styles/Dashboard';
import MenuDrawer from '../Layout/MenuDrawer';
import AuthContext from '../../context/auth/authContext';
import DashboardContext from '../../context/dashboard/dashboardContext';
import Usuarios from '../Dashboard/Usuarios';
import Platos from '../Dashboard/Platos';
import Mesas from '../Dashboard/Mesas';
import Sugerencias from '../Dashboard/Sugerencias';
import Comentarios from '../Dashboard/Comentarios';
import Galeria from '../Dashboard/Galeria';
import Cuentas from '../Dashboard/Cuentas';

const AdminPage = (props) => {

    const authContext = useContext(AuthContext);
    const { CerrarSesion, usuario, UsuarioAutenticado } = authContext;

    const dashboardContext = useContext(DashboardContext);
    const { ListarMesas, ListarPlatos, ListarUsuarios, ListarSugerencias, ListarComentarios, ListarGaleria } = dashboardContext;

    const { window } = props;
    const classes = DashboardStyles();
    const theme = useTheme();
    const [ mobileOpen, setMobileOpen ] = useState(false);

    useEffect(() => {
        UsuarioAutenticado();
        ListarMesas();
        ListarPlatos();
        ListarUsuarios();
        ListarSugerencias();
        ListarComentarios();
        ListarGaleria();
    }, [])

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
                    <Route exact path='/dashboard/usuarios' component={Usuarios} />
                    <Route exact path='/dashboard/platos' component={Platos} />
                    <Route exact path='/dashboard/mesas' component={Mesas} />
                    <Route exact path='/dashboard/sugerencias' component={Sugerencias} />
                    <Route exact path='/dashboard/comentarios' component={Comentarios} />
                    <Route exact path='/dashboard/galeria' component={Galeria} />
                    <Route exact path='/dashboard/cuentas' component={Cuentas} />
                </main>
            </div>
        </Router>
    )
}

export default AdminPage
