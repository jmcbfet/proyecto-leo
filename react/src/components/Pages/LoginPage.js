import React, { useContext, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import { FormStyles } from '../../styles/Form';
import Login from '../auth/Login';
import AuthContext from '../../context/auth/authContext';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {

    const authContext = useContext(AuthContext);

    const { auth, mensaje, rol } = authContext;
    
    const history = useHistory();

    useEffect(() => {
        if (auth) {
            console.log(rol);
            if (rol == 1) history.push("/dashboard");
            if (rol == 2) history.push("/usuario");
        }
    }, [auth, rol]);
    
    const styles = FormStyles();

    return (
        <div>
            <Navbar />
            <div className={styles.caja}>
                <Login />
            </div>
        </div>
    );
}

export default LoginPage;