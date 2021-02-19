import React, { useContext, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import { FormStyles } from '../../styles/Form';
import Login from '../auth/Login';
import AuthContext from '../../context/auth/authContext';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const LoginPage = () => {

    const authContext = useContext(AuthContext);

    const { auth, mensaje, rol } = authContext;
    
    const history = useHistory();

    useEffect(() => {
        if (auth) {
            if (rol === 2) {
                history.push("/")
            } else {
                history.push("/dashboard")
            }
        }
    }, [auth, rol]);
    
    const styles = FormStyles();

    return (
        <div>
            <Navbar />
            <div className={styles.caja}>
                <Login />
                {mensaje ? <Typography>{mensaje}</Typography> : null}
            </div>
        </div>
    );
}

export default LoginPage;