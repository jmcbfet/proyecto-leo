import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import ClienteAxios from '../../config/axios';
import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
} from '../../types';

const AuthState = (props) => {

    const initialState = {
        mensaje: null,
        auth: false,
        usuario: null,
        rol: null
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    const RegistrarUsuario = async (datos) => {
        try {
            const response = await ClienteAxios.post('/user/add', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: response.data.msg
            });
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.msg 
            });
        }
    }

    const IngresarUsuario = async (datos) => {
        try {
            const usuario = await ClienteAxios.post('/user/login', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: usuario.data
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg 
            });
            
        }
    }

    const UsuarioAutenticado = () => {
        const token = localStorage.getItem('token');
        if (token) {

        }
    }

    return (
        <AuthContext.Provider
            value={{
                mensaje: state.mensaje,
                auth: state.auth,
                usuario: state.usuario,
                rol: state.rol,
                RegistrarUsuario,
                IngresarUsuario
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState;