import React, { useState, useContext } from 'react';
import MaterialTable from 'material-table';
import {
    Modal,
    TextField,
    Button,
    Select,
    MenuItem,
    Typography
} from '@material-ui/core';
import { ModalStyles } from '../../styles/Modal';
import { FormStyles } from '../../styles/Form';
import DashboardContext from '../../context/dashboard/dashboardContext';

const Usuarios = () => {

    const formStyles = FormStyles();
    const modalStyles = ModalStyles();

    const dashboardContext = useContext(DashboardContext);
    const { usuarios, msg, ModificarUsuario, EliminarUsuario, AgregarUsuario } = dashboardContext;

    const [ modalInsertar, setModalInsertar ] = useState(false);
    const [ modalModificar, setModalModificar ] = useState(false);
    const [ usuarioSeleccionado, setUsuarioSeleccionado ] = useState({
        id_usuario: '',
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        id_rol: 2,

    });

    const { id_usuario, nombre, apellido, correo, password, id_rol } = usuarioSeleccionado;

    const AbrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const AbrirCerrarModalModificar = () => {
        setModalModificar(!modalModificar);
    }

    const UsuarioSeleccionado = (usuario) => {
        AbrirCerrarModalModificar();
        setUsuarioSeleccionado(usuario)
    }

    const onSubmitModificar = (e) => {
        e.preventDefault();

        if (
            id_usuario.trim === '' ||
            nombre.trim === ''     ||
            apellido.trim === ''   ||
            correo.trim === ''     ||
            password.trim === ''   ||
            id_rol.trim === ''     
        ) {
            console.log('no haga nada mostrar una alerta')
        } else {
            const datos = { nombre, apellido, correo, password, id_rol }
            ModificarUsuario(id_usuario, datos);
            console.log('mostrar otra alerta');
        }

    } 

    const onSubmitAgregar = (e) => {
        e.preventDefault();
        
        if (
            nombre.trim === ''     ||
            apellido.trim === ''   ||
            correo.trim === ''     ||
            password.trim === ''   ||
            id_rol.trim === ''     
        ) {
            console.log('no haga nada mostrar una alerta')
        } else {
            const datos = { nombre, apellido, correo, password, id_rol }
            console.log(datos);
            AgregarUsuario(datos);
            console.log('mostrar otra alerta');
        }
    }

    const onChange = (e) => {
        setUsuarioSeleccionado({
            ...usuarioSeleccionado,
            [e.target.name] : e.target.value
        });
    }

    const columnas = [
        {
            title: 'Nombre',
            field: 'nombre'
        },
        {
            title: 'Apellido',
            field: 'apellido'
        },
        {
            title: 'Correo',
            field: 'correo'
        },
        {
            title: 'Contraseña',
            field: 'password'
        },
        {
            title: 'Rol',
            field: 'descripcion'
        },
    ]

    const bodyAgregar = (
        <div className={modalStyles.modal}>
            <h3>Nuevo usuario</h3>
            <form 
                onSubmit={onSubmitAgregar}
            >
                <TextField
                    className={formStyles.input}
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    variant="outlined"
                    value={nombre}
                    onChange={onChange}
                />
                <TextField
                    className={formStyles.input}
                    id="apellido"
                    name="apellido"
                    label="Apellido"
                    variant="outlined"
                    value={apellido}
                    onChange={onChange}
                />
                <TextField
                    className={formStyles.input}
                    id="correo"
                    name="correo"
                    label="Correo"
                    variant="outlined"
                    value={correo}
                    onChange={onChange}
                />
                <TextField
                    className={formStyles.input}
                    id="password"
                    name="password"
                    label="Contraseña"
                    variant="outlined"
                    value={password}
                    onChange={onChange}
                />
                <Select
                    className={formStyles.input}
                    id="id_rol"
                    name="id_rol"
                    label="Rol"
                    variant="outlined"
                    value={id_rol}
                    onChange={onChange}
                >
                    <MenuItem value={1}>Admin</MenuItem>
                    <MenuItem value={2}>User</MenuItem> 
                </Select>
                <div align="right">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={formStyles.buttonSubmit}
                    >
                        Agregar
                    </Button>
                </div>
            </form>
        </div>
    );

    const bodyModificar = (
        <div className={modalStyles.modal}>
            <h3>Modificar usuario</h3>
            <form 
                onSubmit={onSubmitModificar}
            >
                <TextField
                    className={formStyles.input}
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    variant="outlined"
                    value={usuarioSeleccionado && usuarioSeleccionado.nombre}
                    onChange={onChange}
                />
                <TextField
                    className={formStyles.input}
                    id="apellido"
                    name="apellido"
                    label="Apellido"
                    variant="outlined"
                    value={usuarioSeleccionado && usuarioSeleccionado.apellido}
                    onChange={onChange}
                />
                <TextField
                    className={formStyles.input}
                    id="correo"
                    name="correo"
                    label="Correo"
                    variant="outlined"
                    value={usuarioSeleccionado && usuarioSeleccionado.correo}
                    onChange={onChange}
                />
                <TextField
                    className={formStyles.input}
                    id="password"
                    name="password"
                    label="Contraseña"
                    variant="outlined"
                    value={usuarioSeleccionado && usuarioSeleccionado.password}
                    onChange={onChange}
                />
                <Select
                    className={formStyles.input}
                    id="id_rol"
                    name="id_rol"
                    label="Rol"
                    variant="outlined"
                    value={usuarioSeleccionado && usuarioSeleccionado.id_rol}
                    onChange={onChange}
                >
                    <MenuItem value={1}>Admin</MenuItem>
                    <MenuItem value={2}>User</MenuItem> 
                </Select>
                <div align="right">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={formStyles.buttonSubmit}
                    >
                        Modificar
                    </Button>
                    {msg ? <Typography>{msg}</Typography> : null}
                </div>
            </form>
        </div>
    );

    return (
        <div>
            <Button
                onClick={AbrirCerrarModalInsertar}
            >
                Agregar usuario
            </Button>
            <MaterialTable
                columns={columnas}
                data={usuarios}
                title="Usuarios"
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar usuario',
                        onClick: (e, rowData) => {
                            UsuarioSeleccionado(rowData);
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar usuario',
                        onClick: (e, rowData) => {
                            EliminarUsuario(rowData.id_usuario);
                        }
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                localization={{
                    header: {
                        actions: 'Acciones'
                    }
                }}
            />
            <Modal
                open={modalInsertar}
                onClose={AbrirCerrarModalInsertar}
            >
                {bodyAgregar}
            </Modal>
            <Modal
                open={modalModificar}
                onClose={AbrirCerrarModalModificar}
            >
                {bodyModificar}
            </Modal>
        </div>
    )
}

export default Usuarios
