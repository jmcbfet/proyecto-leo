import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import ClienteAxios from '../../config/axios';
import { 
    CORREO_EXISTENTE,
    USUARIO_AGREGADO
} from '../../types';

const AuthState = (props) => {

    const initialState = {
        mensaje: null
    }

    const [ state, dispatch ] = useReducer(AuthReducer, initialState);

    const ListarUsuarios = async () => {
        try {
            const usuarios = await ClienteAxios.get('/user/find')
            console.log(usuarios);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth: state.auth,
                ListarUsuarios
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState;