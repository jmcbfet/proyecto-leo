import { 

    LISTAR_USUARIOS,
    MODIFICAR_USUARIO,
    ELIMINAR_USUARIO,
    AGREGAR_USUARIO,

    LISTAR_PLATOS,
    MODIFICAR_PLATO,
    ELIMINAR_PLATO,
    AGREGAR_PLATO,

    LISTAR_MESAS,
    MODIFICAR_MESA,
    ELIMINAR_MESA,
    AGREGAR_MESA,

    LISTAR_SUGERENCIAS,
    MODIFICAR_SUGERENCIA,
    ELIMINAR_SUGERENCIA,
    AGREGAR_SUGERENCIA,

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
        
        case LISTAR_PLATOS:
            return {
                ...state,
                platos: action.payload
            }

        case LISTAR_MESAS:
            return {
                ...state,
                mesas: action.payload
            }

        case LISTAR_SUGERENCIAS:
            return {
                ...state,
                sugerencias: action.payload
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
        
        case MODIFICAR_PLATO:
            return {
                ...state,
                platos: state.platos.map(plato => plato.id_plato === action.payload.id_plato ?
                    {  ...plato,
                        nombre: action.payload.nombre,
                        precio: action.payload.precio,
                        imagen: action.payload.imagen
                    }
                : plato )
            }

        case MODIFICAR_MESA:
            return {
                ...state,
                mesas: state.mesas.map(mesa => mesa.id_mesa === action.payload.id_mesa ?
                    {   ...mesa,
                        descripcion: action.payload.descripcion
                    }
                : mesa )
            }

        case MODIFICAR_SUGERENCIA:
            return {
                ...state,
                sugerencias: state.sugerencias.map(sugerencia => sugerencia.id_sugerencia === action.payload.id_sugerencia ? 
                    {   ...sugerencia,
                        correo: action.payload.correo,
                        descripcion: action.payload.descripcion
                    }
                : sugerencia )
            }
        
        case AGREGAR_USUARIO:
            return {
                ...state,
                usuarios: [...state.usuarios, action.payload]
            }
        
        case AGREGAR_PLATO:
            return {
                ...state,
                platos: [...state.platos, action.payload]
            }

        case AGREGAR_MESA:
            return {
                ...state,
                mesas: [...state.mesas, action.payload]
            }

        case AGREGAR_SUGERENCIA:
            return {
                ...state,
                sugerencias: [...state.sugerencias, action.payload]
            }

        case ELIMINAR_USUARIO:
            return {
                ...state,
                usuarios: state.usuarios.filter(usuario => usuario.id_usuario !== action.payload)
            }
        
        case ELIMINAR_PLATO:
            return {
                ...state,
                platos: state.platos.filter(plato => plato.id_plato !== action.payload)
            }

        case ELIMINAR_MESA:
            return {
                ...state,
                mesas: state.mesas.filter(mesa => mesa.id_mesa !== action.payload)
            }
        
        case ELIMINAR_SUGERENCIA:
            return {
                ...state,
                sugerencias: state.sugerencias.filter(sugerencia => sugerencia.id_sugerencia !== action.payload)
            }


    }

}