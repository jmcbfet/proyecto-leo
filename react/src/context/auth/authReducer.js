import { 
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    OCULTAR_MENSAJE,
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
                rol: action.payload.usuario.id_rol,
                usuario: action.payload.usuario
            }

        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                auth: false,
                mensaje: action.payload,
                rol: null,
            }

        case OCULTAR_MENSAJE:
            return {
                ...state,
                mensaje: null
            }
        
    }

}