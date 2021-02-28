import React, { useReducer } from 'react';
import FooterContext from './footerContext';
import FooterReducer from './footerReducer';
import ClienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';
import { 
    USUARIO_ENVIA_SUGERENCIA
} from '../../types';

const FooterState = (props) => {

    const initialState = {
        datos: null
    }

    const [ state, dispatch ] = useReducer(FooterReducer, initialState)

    const AgregarSugerencia = async (datos) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const sugerencia = await ClienteAxios.post('/sugerencias/add', datos);
            datos.id_sugerencia = sugerencia.data.id_sugerencia;
            dispatch({
                type: USUARIO_ENVIA_SUGERENCIA,
                payload: datos
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <FooterContext.Provider
            value={{
                datos: state.datos,
                AgregarSugerencia
            }}
        >
            {props.children}
        </FooterContext.Provider>
    )
}

export default FooterState;