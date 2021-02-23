import React, { useReducer } from 'react';
import DashboardContext from './dashboardContext';
import DashboardReducer from './dashboardReducer';
import ClienteAxios from '../../config/axios';
import { 
    LISTAR_USUARIOS,
    MODIFICAR_USUARIO,
    ELIMINAR_USUARIO,
    AGREGAR_USUARIO
} from '../../types';
import tokenAuth from '../../config/token';

const DashboardState = (props) => {

    const initialState = {
        usuarios: null,
        msg: null
    }

    const [ state, dispatch ] = useReducer(DashboardReducer, initialState);

    const ListarUsuarios = async () => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const usuarios = await ClienteAxios.get('/user/find');
            console.log(usuarios.data);
            dispatch({
                type: LISTAR_USUARIOS,
                payload: usuarios.data
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const AgregarUsuario = async (datos) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const usuario = await ClienteAxios.post('/user/add', datos);
            if (datos.id_rol === 2) {
                datos.descripcion = "User"
            } else {
                datos.descripcion = "Admin"
            }
            console.log(datos);
            dispatch({
                type: AGREGAR_USUARIO,
                payload: datos
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const ModificarUsuario = async (id, datos) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const usuario = await ClienteAxios.put(`/user/update/${id}`, datos);
            datos.id_usuario = id;
            if (datos.id_rol === 2) {
                datos.descripcion = "User"
            } else {
                datos.descripcion = "Admin"
            }
            console.log(datos);
            dispatch({
                type: MODIFICAR_USUARIO,
                payload: datos
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const EliminarUsuario = async (id) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const usuario = await ClienteAxios.delete(`/user/delete/${id}`);
            dispatch({
                type: ELIMINAR_USUARIO,
                payload: id
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <DashboardContext.Provider
            value={{
                usuarios: state.usuarios,
                msg: state.msg,
                ListarUsuarios,
                ModificarUsuario,
                EliminarUsuario,
                AgregarUsuario
            }}
        >
            {props.children}
        </DashboardContext.Provider>
    );

}

export default DashboardState;