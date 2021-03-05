import { 
    USUARIO_CONSULTA_COMENTARIOS,
    USUARIO_CONSULTA_MESAS_DISPONIBLES,
    USUARIO_AGREGA_CUENTA,
    USUARIO_CONSULTA_CUENTA_MESA,
    USUARIO_CONSULTA_CUENTAS,
    USUARIO_ELIMINA_CUENTA,
    USUARIO_CONSULTA_TOTAL_CUENTA,
    ACTUALIZAR_CUENTA_ELIMINADA
} from '../../types';

export default (state, action) => {

    switch (action.type) {

        default:
            return state;

        case USUARIO_CONSULTA_CUENTAS:
            return {
                ...state,
                cuenta: action.payload
            }
        
        case USUARIO_CONSULTA_COMENTARIOS:
            return {
                ...state,
                comentarios: action.payload
            }

        case USUARIO_CONSULTA_MESAS_DISPONIBLES:
            return {
                ...state,
                mesas: action.payload
            }

        case USUARIO_CONSULTA_CUENTA_MESA:
            return {
                ...state,
                cuenta: action.payload
            }

        case USUARIO_AGREGA_CUENTA:
            return {
                ...state,
                cuenta: [...state.cuenta, action.payload],
                total: state.total + action.payload.precio 
            }

        case USUARIO_ELIMINA_CUENTA:
            return {
                ...state,
                cuenta: state.cuenta.filter(cuenta => cuenta.id_cuenta !== action.payload.id_cuenta),
                total: state.total - action.payload.precio
            }

        case USUARIO_CONSULTA_TOTAL_CUENTA:
            return {
                ...state,
                total: action.payload
            }

    }

}