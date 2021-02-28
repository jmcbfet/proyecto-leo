import React, { useReducer } from 'react';
import DashboardContext from './dashboardContext';
import DashboardReducer from './dashboardReducer';
import ClienteAxios from '../../config/axios';
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

    LISTAR_COMENTARIOS,
    MODIFICAR_COMENTARIO,
    ELIMINAR_COMENTARIO,

    LISTAR_GALERIA,
    MODIFICAR_GALERIA,
    ELIMINAR_GALERIA,
    AGREGAR_GALERIA

} from '../../types';
import tokenAuth from '../../config/token';

const DashboardState = (props) => {

    const initialState = {
        usuarios: null,
        platos: null,
        mesas: null,
        sugerencias: null,
        comentarios: null,
        galeria: null,
        msg: null
    }

    const [ state, dispatch ] = useReducer(DashboardReducer, initialState);

    const ListarUsuarios = async () => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const usuarios = await ClienteAxios.get('/user/find');
            console.log(usuarios.data);
            dispatch({
                type: LISTAR_USUARIOS,
                payload: usuarios.data
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const AgregarUsuario = async (datos) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const usuario = await ClienteAxios.post('/user/add', datos);
            datos.id_usuario = usuario.data.id_usuario;
            if (datos.id_rol === 2) {
                datos.descripcion = "User"
            } else {
                datos.descripcion = "Admin"
            }
            console.log(datos);
            dispatch({
                type: AGREGAR_USUARIO,
                payload: datos
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const ModificarUsuario = async (id, datos) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const usuario = await ClienteAxios.put(`/user/update/${id}`, datos);
            datos.id_usuario = id;
            if (datos.id_rol === 2) {
                datos.descripcion = "User"
            } else {
                datos.descripcion = "Admin"
            }
            console.log(datos);
            dispatch({
                type: MODIFICAR_USUARIO,
                payload: datos
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const EliminarUsuario = async (id) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const usuario = await ClienteAxios.delete(`/user/delete/${id}`);
            dispatch({
                type: ELIMINAR_USUARIO,
                payload: id
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const ListarPlatos = async () => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const platos = await ClienteAxios.get('/platos/find');
            dispatch({
                type: LISTAR_PLATOS,
                payload: platos.data
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const AgregarPlato = async (datos) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const plato = await ClienteAxios.post('/platos/add', datos);
            console.log(plato.data.id_plato);
            datos.id_plato = plato.data.id_plato;
            dispatch({
                type: AGREGAR_PLATO,
                payload: datos
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const ModificarPlato = async (id, datos) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            datos.id_plato = id;
            const plato = await ClienteAxios.put(`/platos/update/${id}`, datos);
            console.log(datos);
            dispatch({
                type: MODIFICAR_PLATO,
                payload: datos
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const EliminarPlato = async (id) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const usuario = await ClienteAxios.delete(`/platos/delete/${id}`);
            dispatch({
                type: ELIMINAR_PLATO,
                payload: id
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const ListarMesas = async () => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const mesas = await ClienteAxios.get('/mesas/find');
            dispatch({
                type: LISTAR_MESAS,
                payload: mesas.data
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const AgregarMesa = async (datos) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const mesa = await ClienteAxios.post('/mesas/add', datos);
            datos.id_mesa = mesa.data.id_mesa;
            dispatch({
                type: AGREGAR_MESA,
                payload: datos
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const ModificarMesa = async (id, datos) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            datos.id_mesa = id;
            const mesa = await ClienteAxios.put(`/mesas/update/${id}`, datos);
            console.log(datos);
            dispatch({
                type: MODIFICAR_MESA,
                payload: datos
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const EliminarMesa = async (id) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const mesa = await ClienteAxios.delete(`/mesas/delete/${id}`);
            dispatch({
                type: ELIMINAR_MESA,
                payload: id
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const ListarSugerencias = async () => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const sugerencias = await ClienteAxios.get('/sugerencias/find');
            dispatch({
                type: LISTAR_SUGERENCIAS,
                payload: sugerencias.data
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const AgregarSugerencia = async (datos) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const sugerencia = await ClienteAxios.post('/sugerencias/add', datos);
            datos.id_sugerencia = sugerencia.data.id_sugerencia;
            dispatch({
                type: AGREGAR_SUGERENCIA,
                payload: datos
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const ModificarSugerencia = async (id, datos) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            datos.id_sugerencia = id;
            const sugerencia = await ClienteAxios.put(`/sugerencias/update/${id}`, datos);
            console.log(datos);
            dispatch({
                type: MODIFICAR_SUGERENCIA,
                payload: datos
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const EliminarSugerencia = async (id) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const sugerencia = await ClienteAxios.delete(`/sugerencias/delete/${id}`);
            dispatch({
                type: ELIMINAR_SUGERENCIA,
                payload: id
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const ListarComentarios = async () => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const comentarios = await ClienteAxios.get('/comentarios/find');
            dispatch({
                type: LISTAR_COMENTARIOS,
                payload: comentarios.data
            })
        } catch (error) {
           console.log(error.response) 
        }
    }

    const ModificarComentario = async (id, datos) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            datos.id_comentario = id;
            const comentario = await ClienteAxios.put(`/comentarios/update/${id}`, datos);
            dispatch({
                type: MODIFICAR_COMENTARIO,
                payload: datos
            });
        } catch (error) {
            console.log(error.response);
        }
    }

    const EliminarComentario = async (id) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const comentario = ClienteAxios.delete(`/comentarios/delete/${id}`)
            dispatch({
                type: ELIMINAR_COMENTARIO,
                payload: id
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const ListarGaleria = async () => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const galeria = await ClienteAxios.get('/galeria/find');
            dispatch({
                type: LISTAR_GALERIA,
                payload: galeria.data
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const AgregarGaleria = async (datos) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const galeria = await ClienteAxios.post('/galeria/add', datos)
            datos.id_galeria = galeria.data.id_galeria;
            dispatch({
                type: AGREGAR_GALERIA,
                payload: datos
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const ModificarGaleria = async (id, datos) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            datos.id_galeria = id
            const galeria = await ClienteAxios.put(`/galeria/update/${id}`, datos)
            dispatch({
                type: MODIFICAR_GALERIA,
                payload: datos
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    const EliminarGaleria = async (id) => {
        const token = localStorage.getItem('token');
        if(token) tokenAuth(token);

        try {
            const galeria = await ClienteAxios.delete(`/galeria/delete/${id}`);
            dispatch({
                type: ELIMINAR_GALERIA,
                payload: id
            })
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <DashboardContext.Provider
            value={{
                usuarios: state.usuarios,
                platos: state.platos,
                mesas: state.mesas,
                sugerencias: state.sugerencias,
                comentarios: state.comentarios,
                galeria: state.galeria,
                msg: state.msg,

                ListarUsuarios,
                AgregarUsuario,
                ModificarUsuario,
                EliminarUsuario,

                ListarPlatos,
                AgregarPlato,
                ModificarPlato,
                EliminarPlato,

                ListarMesas,
                AgregarMesa,
                ModificarMesa,
                EliminarMesa,

                ListarSugerencias,
                AgregarSugerencia,
                ModificarSugerencia,
                EliminarSugerencia,

                ListarComentarios,
                ModificarComentario,
                EliminarComentario,

                ListarGaleria,
                AgregarGaleria,
                ModificarGaleria,
                EliminarGaleria

            }}
        >
            {props.children}
        </DashboardContext.Provider>
    );

}

export default DashboardState;