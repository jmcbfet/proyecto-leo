import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import {
    Modal,
    TextField,
    Button,
    Typography
} from '@material-ui/core';
import { ModalStyles } from '../../styles/Modal';
import { FormStyles } from '../../styles/Form';
import DashboardContext from '../../context/dashboard/dashboardContext';

const Platos = () => {

    const api = {
        id_plato: '',
        nombre: '',
        precio: '',
        imagen: ''
    }

    const formStyles = FormStyles();
    const modalStyles = ModalStyles();

    const dashboardContext = useContext(DashboardContext);
    const { platos, msg, ModificarPlato, EliminarPlato, AgregarPlato } = dashboardContext;

    const [ modalInsertar, setModalInsertar ] = useState(false);
    const [ modalModificar, setModalModificar ] = useState(false);
    const [ agregarPlato, setAgregarPlato ] = useState(api)
    const [ platoSeleccionado, setPlatoSeleccionado ] = useState(api);

    const AbrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const AbrirCerrarModalModificar = () => {
        setModalModificar(!modalModificar);
    }

    const PlatoSeleccionado = (plato) => {
        AbrirCerrarModalModificar();
        setPlatoSeleccionado(plato);
    }

    const onSubmitModificar = (e) => {
        e.preventDefault();

        const { id_plato, nombre, precio, imagen } = platoSeleccionado;

        if (
            nombre.trim === ''   ||
            precio.trim === ''   ||
            imagen.trim === ''       
        ) {
            console.log('no haga nada mostrar una alerta')
        } else {
            console.log(id_plato);
            const precio_int = parseInt(precio);
            const datos = { nombre, precio: precio_int, imagen }
            ModificarPlato(id_plato, datos);
            console.log('mostrar otra alerta');
        }

    }

    const onSubmitAgregar = (e) => {
        e.preventDefault();

        const { nombre, precio, imagen } = agregarPlato;
        
        if (
            nombre.trim === ''   ||
            precio.trim === ''   ||
            imagen.trim === ''       
        ) {
            console.log('no haga nada mostrar una alerta')
        } else {
            const precio_int = parseInt(precio);
            const datos = { nombre, precio: precio_int, imagen }
            AgregarPlato(datos);
            setAgregarPlato(api);
            console.log('mostrar otra alerta');
        }
    }

    const onChangeAgregar = (e) => {
        setAgregarPlato({
            ...agregarPlato,
            [e.target.name] : e.target.value
        })
    }

    const onChangeModificar = (e) => {
        setPlatoSeleccionado({
            ...platoSeleccionado,
            [e.target.name] : e.target.value
        });
    }

    const columnas = [
        {
            title: 'id',
            field: 'id_plato'
        },
        {
            title: 'Nombre',
            field: 'nombre'
        },
        {
            title: 'Precio',
            field: 'precio'
        },
        {
            title: 'Imagen',
            field: 'imagen'
        }
    ]

    const bodyAgregar = (
        <div className={modalStyles.modal}>
            <h3>Nuevo plato</h3>
            <form 
                onSubmit={onSubmitAgregar}
            >
                <TextField
                    className={formStyles.input}
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    variant="outlined"
                    value={agregarPlato.nombre}
                    onChange={onChangeAgregar}
                />
                <TextField
                    className={formStyles.input}
                    id="precio"
                    name="precio"
                    label="Precio"
                    variant="outlined"
                    value={agregarPlato.precio}
                    onChange={onChangeAgregar}
                />
                <TextField
                    className={formStyles.input}
                    id="imagen"
                    name="imagen"
                    label="Imagen"
                    variant="outlined"
                    value={agregarPlato.imagen}
                    onChange={onChangeAgregar}
                />
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
            <h3>Modificar plato</h3>
            <form 
                onSubmit={onSubmitModificar}
            >
                <TextField
                    className={formStyles.input}
                    id="id_plato"
                    name="id_plato"
                    label="Id"
                    variant="outlined"
                    value={platoSeleccionado && platoSeleccionado.id_plato}
                    onChange={onChangeModificar}
                />
                <TextField
                    className={formStyles.input}
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    variant="outlined"
                    value={platoSeleccionado && platoSeleccionado.nombre}
                    onChange={onChangeModificar}
                />
                <TextField
                    className={formStyles.input}
                    id="precio"
                    name="precio"
                    label="Precio"
                    variant="outlined"
                    value={platoSeleccionado && platoSeleccionado.precio}
                    onChange={onChangeModificar}
                />
                <TextField
                    className={formStyles.input}
                    id="imagen"
                    name="imagen"
                    label="Imagen"
                    variant="outlined"
                    value={platoSeleccionado && platoSeleccionado.imagen}
                    onChange={onChangeModificar}
                />
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
                color="primary"
                variant="outlined"
            >
                Agregar Plato
            </Button>
            <MaterialTable
                columns={columnas}
                data={platos}
                title="Platos"
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar usuario',
                        onClick: (e, rowData) => {
                            PlatoSeleccionado(rowData);
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar usuario',
                        onClick: (e, rowData) => {
                            EliminarPlato(rowData.id_plato);
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

export default Platos
