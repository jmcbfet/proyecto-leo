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

const Galeria = () => {

    const api = {
        id_galeria: '',
        src: '',
        altText: '',
        caption: ''
    }

    const formStyles = FormStyles();
    const modalStyles = ModalStyles();

    const dashboardContext = useContext(DashboardContext);
    const { galeria, msg, ModificarGaleria, EliminarGaleria, AgregarGaleria } = dashboardContext;

    const [ modalInsertar, setModalInsertar ] = useState(false);
    const [ modalModificar, setModalModificar ] = useState(false);
    const [ agregarGaleria, setAgregarGaleria ] = useState(api)
    const [ galeriaSeleccionado, setGaleriaSeleccionado ] = useState(api);

    const AbrirCerrarModalModificar = () => {
        setModalModificar(!modalModificar);
    }

    const AbrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const GaleriaSeleccionada = (galeria) => {
        AbrirCerrarModalModificar();
        setGaleriaSeleccionado(galeria);
    }

    const onSubmitModificar = (e) => {
        e.preventDefault();

        const { id_galeria, src, altText, caption } = galeriaSeleccionado;

        if (
            src === ''      ||
            altText === ''  ||
            caption === ''   
        ) {
            console.log('no haga nada mostrar una alerta')
        } else {
            const datos = { src, altText, caption }
            ModificarGaleria(id_galeria, datos);
            console.log('mostrar otra alerta');
        }

    }

    const onSubmitAgregar = (e) => {
        e.preventDefault();

        const { src, altText, caption } = agregarGaleria;
        
        if (
            src === ''      ||
            altText === ''  ||
            caption === ''  
        ) {
            console.log('no haga nada mostrar una alerta')
        } else {
            const datos = { src, altText, caption }
            AgregarGaleria(datos);
            setAgregarGaleria(api);
            console.log('mostrar otra alerta');
        }
    }

    const onChangeModificar = (e) => {
        setGaleriaSeleccionado({
            ...galeriaSeleccionado,
            [e.target.name] : e.target.value
        });
    }

    const onChangeAgregar = (e) => {
        setAgregarGaleria({
            ...agregarGaleria,
            [e.target.name] : e.target.value
        })
    }

    const columnas = [
        {
            title: 'imagen',
            field: 'src'
        },
        {
            title: 'Descripcion 1',
            field: 'altText'
        },
        {
            title: 'Descripcion 2',
            field: 'caption'
        }
    ]

    const bodyModificar = (
        <div className={modalStyles.modal}>
            <h3>Modificar foto</h3>
            <form 
                onSubmit={onSubmitModificar}
            >
                <TextField
                    className={formStyles.input}
                    id="src"
                    name="src"
                    label="Imagen"
                    variant="outlined"
                    value={galeriaSeleccionado && galeriaSeleccionado.src}
                    onChange={onChangeModificar}
                />
                <TextField
                    className={formStyles.input}
                    id="altText"
                    name="altText"
                    label="Descripcion 1"
                    variant="outlined"
                    value={galeriaSeleccionado && galeriaSeleccionado.altText}
                    onChange={onChangeModificar}
                />
                <TextField
                    className={formStyles.input}
                    id="caption"
                    name="caption"
                    label="Descripcion 2"
                    variant="outlined"
                    value={galeriaSeleccionado && galeriaSeleccionado.caption}
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

    const bodyAgregar = (
        <div className={modalStyles.modal}>
            <h3>Nueva foto</h3>
            <form 
                onSubmit={onSubmitAgregar}
            >
                <TextField
                    className={formStyles.input}
                    id="src"
                    name="src"
                    label="Imagen"
                    variant="outlined"
                    value={agregarGaleria.src}
                    onChange={onChangeAgregar}
                />
                <TextField
                    className={formStyles.input}
                    id="altText"
                    name="altText"
                    label="Descripcion 1"
                    variant="outlined"
                    value={agregarGaleria.altText}
                    onChange={onChangeAgregar}
                />
                <TextField
                    className={formStyles.input}
                    id="caption"
                    name="caption"
                    label="Descripcion 2"
                    variant="outlined"
                    value={agregarGaleria.caption}
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


    return (
        <div>
            <Button
                onClick={AbrirCerrarModalInsertar}
                color="primary"
                variant="outlined"
            >
                Agregar Foto
            </Button>
            <MaterialTable
                columns={columnas}
                data={galeria}
                title="Galeria"
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar usuario',
                        onClick: (e, rowData) => {
                            GaleriaSeleccionada(rowData);
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar usuario',
                        onClick: (e, rowData) => {
                            EliminarGaleria(rowData.id_galeria);
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
                open={modalModificar}
                onClose={AbrirCerrarModalModificar}
            >
                {bodyModificar}
            </Modal>
            <Modal
                open={modalInsertar}
                onClose={AbrirCerrarModalInsertar}
            >
                {bodyAgregar}
            </Modal>
        </div>
    )
}

export default Galeria
