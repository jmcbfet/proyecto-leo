import React, { useContext, useEffect } from 'react'
import Navbar from '../Layout/Navbar'
import Mesa from '../Layout/Mesa';
import AuthContext from '../../context/auth/authContext';
import DashboardContext from '../../context/dashboard/dashboardContext';

const ReservaPage = () => {

    const authContext = useContext(AuthContext);
    const { UsuarioAutenticado } = authContext;

    const dashboardContext = useContext(DashboardContext);
    const { mesas, ListarMesas } = dashboardContext;

    useEffect(() => {
        UsuarioAutenticado();
        ListarMesas();
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
