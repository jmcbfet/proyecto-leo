import React from 'react';
import { 
    AppBar,
    Toolbar,
    Button 
} from '@material-ui/core'
import { NavbarStyles } from '../../styles/Navbar';

const Navbar = () => {

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
                </Toolbar>
            </AppBar>
            <div className={styles.offset}></div>
        </div>
    )
}

export default Navbar;