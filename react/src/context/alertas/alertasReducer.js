import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from '../../types';

export default (state, action) => {

    switch (action.type) {

        default:
            return state

        case MOSTRAR_ALERTA:
            return {
                ...state,
                alerta: action.payload
            }
        
        case OCULTAR_ALERTA:
            return {
                alerta: null
            }

    }

}