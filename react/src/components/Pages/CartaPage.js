import React, { useState ,useContext, useEffect } from 'react';
import Navbar from '../Layout/Navbar';
import Plato from '../Layout/Plato';
import DashboardContext from '../../context/dashboard/dashboardContext';

const CartaPage = () => {

    const dashboardContext = useContext(DashboardContext);
    const { platos, ListarPlatos } = dashboardContext;

    useEffect(() => {
        ListarPlatos();
    }, []);

    return (
        <div>
            <Navbar />
            {platos ?
                platos.map(plato => {
                    return (
                        <Plato 
                            key={plato.id_plato}
                            plato={plato}
                        />
                    )
                })
                : 
                    <p>No hay registros</p>
                }

        </div>
    )
}

export default CartaPage
