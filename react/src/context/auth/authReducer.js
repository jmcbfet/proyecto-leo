import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    OBTENER_USUARIO,
    CERRAR_SESION
} from '../../types';

export default (state, action) => {

    switch (action.type) {

        default:
            return state

        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                auth: true,
                mensaje: null,
            }

        case OBTENER_USUARIO:
            return {
                ...state,
                auth: true,
                usuario: action.payload,
                rol: action.payload.id_rol,
            }

        case LOGIN_ERROR:
            return {
                ...state,
                mensaje: action.payload,
            }

        case CERRAR_SESION:
            localStorage.removeItem('token');
            return {
                ...state,
                auth: false,
                mensaje: null,
                usuario: null
            }
        
        
    }

}