import { 
    LISTAR_USUARIOS,
    MODIFICAR_USUARIO,
    AGREGAR_USUARIO,
    ELIMINAR_USUARIO
} from '../../types';

export default (state, action) => {

    switch (action.type) {

        default:
            return state


        case LISTAR_USUARIOS:
            return {
                ...state,
                usuarios: action.payload
            }

        case MODIFICAR_USUARIO:
            return {
                ...state,
                usuarios: state.usuarios.map(usuario => usuario.id_usuario === action.payload.id_usuario ? 
                { ...usuario,
                    nombre: action.payload.nombre,
                    apellido: action.payload.apellido,
                    correo: action.payload.correo,
                    password: action.payload.password,
                    id_rol: action.payload.id_rol,
                    descripcion: action.payload.descripcion
                }
                : usuario )
            }
        
        case AGREGAR_USUARIO:
            return {
                ...state,
                usuarios: [...state.usuarios, action.payload]
            }

        case ELIMINAR_USUARIO:
            return {
                ...state,
                usuarios: state.usuarios.filter(usuario => usuario.id_usuario !== action.payload)
            }

    }

}