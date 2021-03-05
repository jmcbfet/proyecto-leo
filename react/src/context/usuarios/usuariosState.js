import React, { useReducer } from 'react';
import UsuariosContext from './usuariosContext';
import UsuariosReducer from './usuariosReducer';
import ClienteAxios from '../../config/axios';
import { 
    USUARIO_AGREGA_COMENTARIO,
    USUARIO_CONSULTA_COMENTARIOS,
    USUARIO_CONSULTA_MESAS_DISPONIBLES,
    USUARIO_AGREGA_CUENTA,
    USUARIO_CONSULTA_CUENTA_MESA,
    USUARIO_CONSULTA_CUENTAS,
    USUARIO_ELIMINA_CUENTA,
    USUARIO_CONSULTA_TOTAL_CUENTA,
} from '../../types';

const UsuariosState = (props) => {

    const initialState = {
        comentarios: null,
        mesas: null,
        cuenta: null,
        total: 0
    }

    const [ state, dispatch ] = useReducer(UsuariosReducer, initialState)

    const AgregarComentario = async (datos) => {
        try {
            const comentario = await ClienteAxios.post('/comentarios/add', datos);
            dispatch({
                type: USUARIO_AGREGA_COMENTARIO
            });
        } catch (error) {
            console.log(error.response)
        }
    }

    const ConsultarComentarios = async (id) => {
        try {
            const comentarios = await ClienteAxios.get(`/comentarios/find/${id}`);
            dispatch({
                type: USUARIO_CONSULTA_COMENTARIOS,
                payload: comentarios.data
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const ConsultarMesasDisponibles = async () => {
        try {
            const mesas = await ClienteAxios.get('/mesas/find/disponibles');
            dispatch({
                type: USUARIO_CONSULTA_MESAS_DISPONIBLES,
                payload: mesas.data
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const ConsultarReservas = async () => {
        try {
            const reservas = await ClienteAxios.get('/cuentas/find');
            dispatch({
                type: USUARIO_CONSULTA_CUENTAS,
                payload: reservas.data
            })
        } catch (error) {
            console.log(error.response)
        }
    }
    
    const AgregarCuenta = async (datos, id_plato) => {
        try {
            const cuenta = await ClienteAxios.post('/cuentas/add', datos);
            const plato = await ClienteAxios.get(`/cuentas/find/${id_plato}`);
            dispatch({
                type: USUARIO_AGREGA_CUENTA,
                payload: plato.data[0]
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const ConsultarReservaActual = async (id_usuario, id_mesa) => {
        try {
            const cuenta = await ClienteAxios.get(`/cuentas/modal/${id_usuario}/${id_mesa}`);
            dispatch({
                type: USUARIO_CONSULTA_CUENTA_MESA,
                payload: cuenta.data
            })
        } catch (error) {
            console.log(error.response)
        }
    }

    const EliminarCuenta = async (id_cuenta, id_mesa, id_usuario) => {
        try {

            console.log(id_cuenta, id_mesa, id_usuario);

            const precio = await ClienteAxios.get(`/cuentas/total/${id_usuario}/${id_mesa}/${id_cuenta}`);
            const cuenta = await ClienteAxios.delete(`/cuentas/delete/${id_cuenta}`);
            dispatch({
                type: USUARIO_ELIMINA_CUENTA,
                payload: {
                    id_cuenta,
                    precio: precio.data[0].total
                }
            })
            
        } catch (error) {
            console.log(error.response)
        }
    }

    const ConsultarTotalReserva = async (id_usuario, id_mesa) => {
        try {
            console.log(id_usuario, id_mesa);
            const total = await ClienteAxios.get(`/cuentas/cuenta/${id_usuario}/${id_mesa}`);
            console.log(total)
            dispatch({
                type: USUARIO_CONSULTA_TOTAL_CUENTA,
                payload: total.data[0].total
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <UsuariosContext.Provider
            value={{
                comentarios: state.comentarios,
                mesas: state.mesas,
                cuenta: state.cuenta,
                total: state.total,
                AgregarComentario,
                ConsultarComentarios,
                ConsultarMesasDisponibles,
                ConsultarReservas,
                AgregarCuenta,
                ConsultarReservaActual,
                EliminarCuenta,
                ConsultarTotalReserva
            }}
        >
            {props.children}
        </UsuariosContext.Provider>
    );
}

export default UsuariosState;