import React, { useReducer } from 'react';
import AlertasContext from './alertasContext';
import AlertasReducer from './alertasReducer';
import { 
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA 
} from '../../types';

const AlertasState = (props) => {

    const initialState = {
        alerta: null,
    }

    const [state, dispatch] = useReducer(AlertasReducer, initialState)

    const mostrarAlerta = (mensaje, type) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                mensaje,
                type
            }
        })
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        }, 5000)
    }

    return (
        <AlertasContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </AlertasContext.Provider>
    );

}

export default AlertasState;