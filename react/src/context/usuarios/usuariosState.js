import React, { useReducer } from 'react';
import UsuariosContext from './usuariosContext';
import UsuariosReducer from './usuariosReducer';
import ClienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { 
    USUARIO_AGREGA_COMENTARIO,
    USUARIO_CONSULTA_COMENTARIOS
} from '../../types';

const UsuariosState = (props) => {

    const initialState = {
        comentarios: null
    }

    const [ state, dispatch ] = useReducer(UsuariosReducer, initialState)

    const AgregarComentario = (datos) => {
        try {
            const comentario = ClienteAxios.post('/comentarios/add', datos);
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

    return (
        <UsuariosContext.Provider
            value={{
                comentarios: state.comentarios,
                AgregarComentario,
                ConsultarComentarios
            }}
        >
            {props.children}
        </UsuariosContext.Provider>
    );
}

export default UsuariosState;