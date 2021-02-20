import React, { useContext, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import AuthContext from '../../context/auth/authContext';

const HomePage = () => {

    const authContext = useContext(AuthContext);
    const { auth, CerrarSesion, UsuarioAutenticado } = authContext;

    useEffect(() => {
        if (auth) {
            UsuarioAutenticado();
        }
    }, [auth])

    return (
        <div>
            <Navbar />
        </div>
    )
}

export default HomePage;