import React, { useContext, useEffect } from 'react'
import Navbar from '../Layout/Navbar'
import Mesa from '../Layout/Mesa';
import AuthContext from '../../context/auth/authContext';
import UsuarioContext from '../../context/usuarios/usuariosContext';

const ReservaPage = () => {

    const authContext = useContext(AuthContext);
    const { UsuarioAutenticado } = authContext;

    const usuarioContext = useContext(UsuarioContext);
    const { mesas, ConsultarMesasDisponibles } = usuarioContext;

    useEffect(() => {
        UsuarioAutenticado();
        ConsultarMesasDisponibles();
    }, [])

    return (
        <div>
            <Navbar />
            {mesas ?
                mesas.map(mesa => {
                    return (
                        <Mesa 
                            key={mesa.id_mesa}
                            mesa={mesa} 
                        />
                    );
                })
            : <p>No hay mesas</p>}
        </div>
    )
}

export default ReservaPage
