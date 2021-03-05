import React, { useState, useContext } from 'react';
import MaterialTable from 'material-table';
import {
    Modal,
    TextField,
    Button,
    Typography,
    Select,
    MenuItem
} from '@material-ui/core';
import { ModalStyles } from '../../styles/Modal';
import { FormStyles } from '../../styles/Form';
import DashboardContext from '../../context/dashboard/dashboardContext';

const Mesas = () => {

    const api = {
        id_mesa: '',
        descripcion: '',
        disponible: ''
    }

    const formStyles = FormStyles();
    const modalStyles = ModalStyles();

    const dashboardContext = useContext(DashboardContext);
    const { mesas, msg, ModificarMesa, EliminarMesa, AgregarMesa } = dashboardContext;

    const [ modalInsertar, setModalInsertar ] = useState(false);
    const [ modalModificar, setModalModificar ] = useState(false);
    const [ agregarMesa, setAgregarMesa ] = useState(api)
    const [ mesaSeleccionado, setMesaSeleccionado ] = useState(api);

    const AbrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const AbrirCerrarModalModificar = () => {
        setModalModificar(!modalModificar);
    }

    const MesaSeleccionada = (mesa) => {
        AbrirCerrarModalModificar();
        console.log(mesa)
        setMesaSeleccionado(mesa);
    }

    const onSubmitModificar = (e) => {
        e.preventDefault();

        const { id_mesa, descripcion, disponible } = mesaSeleccionado;

        if (
            descripcion === '' ||
            disponible === ''      
        ) {
            console.log('no haga nada mostrar una alerta')
        } else {
            const datos = { descripcion, disponible }
            ModificarMesa(id_mesa, datos);
            console.log('mostrar otra alerta');
        }

    }

    const onSubmitAgregar = (e) => {
        e.preventDefault();

        const { descripcion } = agregarMesa;
        
        if (
            descripcion.trim === ''    
        ) {
            console.log('no haga nada mostrar una alerta')
        } else {
            const datos = { descripcion }
            AgregarMesa(datos);
            setAgregarMesa(api);
            console.log('mostrar otra alerta');
        }
    }

    const onChangeAgregar = (e) => {
        setAgregarMesa({
            ...agregarMesa,
            [e.target.name] : e.target.value
        })
    }

    const onChangeModificar = (e) => {
        setMesaSeleccionado({
            ...mesaSeleccionado,
            [e.target.name] : e.target.value
        });
    }

    const columnas = [
        {
            title: 'id',
            field: 'id_mesa'
        },
        {
            title: 'Descripcion',
            field: 'descripcion'
        },
        {
            title: 'Disponible',
            field: 'disponible'
        }
    ]

    const bodyAgregar = (
        <div className={modalStyles.modal}>
            <h3>Nueva mesa</h3>
            <form 
                onSubmit={onSubmitAgregar}
            >
                <TextField
                    className={formStyles.input}
                    id="descripcion"
                    name="descripcion"
                    label="Descripcion"
                    variant="outlined"
                    value={agregarMesa.descripcion}
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
            <h3>Modificar mesa</h3>
            <form 
                onSubmit={onSubmitModificar}
            >
                <TextField
                    className={formStyles.input}
                    id="id_mesa"
                    name="id_mesa"
                    label="Id"
                    variant="outlined"
                    value={mesaSeleccionado && mesaSeleccionado.id_mesa}
                    onChange={onChangeModificar}
                />
                 <TextField
                    className={formStyles.input}
                    id="descripcion"
                    name="descripcion"
                    label="Descripcion"
                    variant="outlined"
                    value={mesaSeleccionado && mesaSeleccionado.descripcion}
                    onChange={onChangeModificar}
                />
                <Select
                    className={formStyles.input}
                    id="disponible"
                    name="disponible"
                    label="Rol"
                    variant="outlined"
                    value={mesaSeleccionado && mesaSeleccionado.disponible}
                    onChange={onChangeModificar}
                >
                    <MenuItem value={1}>Disponible</MenuItem>
                    <MenuItem value={0}>No disponible</MenuItem> 
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
                color="primary"
                variant="outlined"
            >
                Agregar Mesa
            </Button>
            <MaterialTable
                columns={columnas}
                data={mesas}
                title="Mesas"
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar usuario',
                        onClick: (e, rowData) => {
                            MesaSeleccionada(rowData);
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar usuario',
                        onClick: (e, rowData) => {
                            EliminarMesa(rowData.id_mesa);
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

export default Mesas
