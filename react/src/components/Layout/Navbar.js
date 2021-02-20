import React, { useContext, useEffect } from 'react';
import { 
    AppBar,
    Toolbar,
    Button 
} from '@material-ui/core'
import { NavbarStyles } from '../../styles/Navbar';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {

    const authContext = useContext(AuthContext);
    const { auth, CerrarSesion } = authContext;

    const styles = NavbarStyles()

    return (
        <div>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Button 
                        className={styles.title}
                        variant="text" 
                        color="inherit"
                        href="/"
                    >
                        Titulo pagina
                    </Button>
                    {auth ? 
                        <Button 
                            variant="text" 
                            color="inherit"
                            href="/"
                            onClick={CerrarSesion}
                        >
                            Cerrar Sesion
                        </Button>
                    :
                        <div>
                            <Button 
                                variant="text" 
                                color="inherit"
                                href="/login"
                            >
                                Login
                            </Button>
                            <Button 
                                variant="text" 
                                color="inherit"
                                href="/registro"
                            >
                                Registro
                            </Button>
                        </div>
                    }
                </Toolbar>
            </AppBar>
            <div className={styles.offset}></div>
        </div>
    )
}

export default Navbar;