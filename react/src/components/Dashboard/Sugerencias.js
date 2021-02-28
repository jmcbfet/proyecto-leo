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

const Sugerencias = () => {

    const api = {
        id_sugerencia: '',
        correo: '',
        descripcion: ''
    }

    const formStyles = FormStyles();
    const modalStyles = ModalStyles();

    const dashboardContext = useContext(DashboardContext);
    const { sugerencias, msg, ModificarSugerencia, EliminarSugerencia, AgregarSugerencia } = dashboardContext;

    const [ modalInsertar, setModalInsertar ] = useState(false);
    const [ modalModificar, setModalModificar ] = useState(false);
    const [ agregarSugerencia, setAgregarSugerencia ] = useState(api)
    const [ sugerenciaSeleccionado, setSugerenciaSeleccionado ] = useState(api);

    const AbrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const AbrirCerrarModalModificar = () => {
        setModalModificar(!modalModificar);
    }

    const SugerenciaSeleccionada = (sugerencia) => {
        AbrirCerrarModalModificar();
        setSugerenciaSeleccionado(sugerencia);
    }

    const onSubmitModificar = (e) => {
        e.preventDefault();

        const { id_sugerencia, correo, descripcion } = sugerenciaSeleccionado;

        if (
            descripcion.trim === '' ||
            correo.trim === ''     
        ) {
            console.log('no haga nada mostrar una alerta')
        } else {
            const datos = { correo ,descripcion }
            ModificarSugerencia(id_sugerencia, datos);
            console.log('mostrar otra alerta');
        }

    }

    const onSubmitAgregar = (e) => {
        e.preventDefault();

        const { correo, descripcion } = agregarSugerencia;
        
        if (
            descripcion.trim === '' ||
            correo.trim === ''    
        ) {
            console.log('no haga nada mostrar una alerta')
        } else {
            const datos = { correo, descripcion }
            AgregarSugerencia(datos);
            setAgregarSugerencia(api);
            console.log('mostrar otra alerta');
        }
    }

    const onChangeAgregar = (e) => {
        setAgregarSugerencia({
            ...agregarSugerencia,
            [e.target.name] : e.target.value
        })
    }

    const onChangeModificar = (e) => {
        setSugerenciaSeleccionado({
            ...sugerenciaSeleccionado,
            [e.target.name] : e.target.value
        });
    }

    const columnas = [
        {
            title: 'id',
            field: 'id_sugerencia'
        },
        {
            title: 'Correo',
            field: 'correo'
        },
        {
            title: 'Descripcion',
            field: 'descripcion'
        }
    ]

    const bodyAgregar = (
        <div className={modalStyles.modal}>
            <h3>Nueva sugerencia</h3>
            <form 
                onSubmit={onSubmitAgregar}
            >
                <TextField
                    className={formStyles.input}
                    id="correo"
                    name="correo"
                    label="Correo"
                    variant="outlined"
                    value={agregarSugerencia.correo}
                    onChange={onChangeAgregar}
                />
                <TextField
                    className={formStyles.input}
                    id="descripcion"
                    name="descripcion"
                    label="Descripcion"
                    variant="outlined"
                    value={agregarSugerencia.descripcion}
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
            <h3>Modificar sugerencia</h3>
            <form 
                onSubmit={onSubmitModificar}
            >
                <TextField
                    className={formStyles.input}
                    id="id_sugerencia"
                    name="id_sugerencia"
                    label="Id"
                    variant="outlined"
                    value={sugerenciaSeleccionado && sugerenciaSeleccionado.id_sugerencia}
                    onChange={onChangeModificar}
                />
                <TextField
                    className={formStyles.input}
                    id="correo"
                    name="correo"
                    label="Correo"
                    variant="outlined"
                    value={sugerenciaSeleccionado && sugerenciaSeleccionado.correo}
                    onChange={onChangeModificar}
                />
                <TextField
                    className={formStyles.input}
                    id="descripcion"
                    name="descripcion"
                    label="Descripcion"
                    variant="outlined"
                    value={sugerenciaSeleccionado && sugerenciaSeleccionado.descripcion}
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
                Agregar Sugerencia
            </Button>
            <MaterialTable
                columns={columnas}
                data={sugerencias}
                title="Sugerencias"
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar usuario',
                        onClick: (e, rowData) => {
                            SugerenciaSeleccionada(rowData);
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar usuario',
                        onClick: (e, rowData) => {
                            EliminarSugerencia(rowData.id_sugerencia);
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

export default Sugerencias
