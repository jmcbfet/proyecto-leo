import { 
    USUARIO_ENVIA_SUGERENCIA
} from '../../types';

export default (state, action) => {

    switch (action.type) {

        default:
            return state

        case USUARIO_ENVIA_SUGERENCIA:
            return {
                ...state,
                datos: action.payload
            }

    }

}