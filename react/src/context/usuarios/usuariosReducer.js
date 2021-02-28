import { 
    USUARIO_CONSULTA_COMENTARIOS
} from '../../types';

export default (state, action) => {

    switch (action.type) {

        default:
            return state;
        
        case USUARIO_CONSULTA_COMENTARIOS:
            return {
                ...state,
                comentarios: action.payload
            }

    }

}