import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import ClienteAxios from '../../config/axios';
import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    CERRAR_SESION
} from '../../types';
import tokenAuth from '../../config/token';

const AuthState = (props) => {

    const initialState = {
        mensaje: null,
        auth: null,
        usuario: null,
        rol: null,
        token: localStorage.getItem('token')
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
            console.log(error.response);
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
            UsuarioAutenticado();
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg 
            });
        }
    }

    const UsuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);
        
        try {
            const usuario = await ClienteAxios.get('/user/getdata');
            dispatch({
                type: OBTENER_USUARIO,
                payload: usuario.data
            });
        } catch (error) {
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    const CerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return (
        <AuthContext.Provider
            value={{
                mensaje: state.mensaje,
                auth: state.auth,
                usuario: state.usuario,
                rol: state.rol,
                cargando: state.cargando,
                RegistrarUsuario,
                IngresarUsuario,
                UsuarioAutenticado,
                CerrarSesion
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState;