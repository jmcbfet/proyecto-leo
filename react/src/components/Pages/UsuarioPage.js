import React, { useContext, useEffect } from 'react'
import Navbar from '../Layout/Navbar';
import AuthContext from '../../context/auth/authContext';

const UsuarioPage = () => {

    const authContext = useContext(AuthContext);
    const { UsuarioAutenticado } = authContext;

    useEffect(() => {
        UsuarioAutenticado();
    }, [])

    return (
        <div>
            <Navbar />
        </div>
    )
}

export default UsuarioPage
