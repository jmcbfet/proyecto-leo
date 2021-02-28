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

const Comentarios = () => {

    const api = {
        id_comentario: '',
        comentario: ''
    }

    const formStyles = FormStyles();
    const modalStyles = ModalStyles();

    const dashboardContext = useContext(DashboardContext);
    const { comentarios, msg, ModificarComentario, EliminarComentario } = dashboardContext;

    const [ modalModificar, setModalModificar ] = useState(false);
    const [ comentarioSeleccionado, setComentarioSeleccionado ] = useState(api);

    const AbrirCerrarModalModificar = () => {
        setModalModificar(!modalModificar);
    }

    const ComentarioSeleccionado = (comentario) => {
        AbrirCerrarModalModificar();
        setComentarioSeleccionado(comentario);
    }

    const onSubmitModificar = (e) => {
        e.preventDefault();

        const { id_comentario, comentario } = comentarioSeleccionado;

        if (
            comentario === ''   
        ) {
            console.log('no haga nada mostrar una alerta')
        } else {
            const datos = { comentario }
            ModificarComentario(id_comentario, datos);
            console.log('mostrar otra alerta');
        }

    }

    const onChangeModificar = (e) => {
        setComentarioSeleccionado({
            ...comentarioSeleccionado,
            [e.target.name] : e.target.value
        });
    }

    const columnas = [
        {
            title: 'id',
            field: 'id_comentario'
        },
        {
            title: 'Plato',
            field: 'nombre'
        },
        {
            title: 'Comentario',
            field: 'comentario'
        }
    ]

    const bodyModificar = (
        <div className={modalStyles.modal}>
            <h3>Modificar sugerencia</h3>
            <form 
                onSubmit={onSubmitModificar}
            >
                <TextField
                    className={formStyles.input}
                    id="comentario"
                    name="comentario"
                    label="Comentario"
                    variant="outlined"
                    value={comentarioSeleccionado && comentarioSeleccionado.comentario}
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
            <MaterialTable
                columns={columnas}
                data={comentarios}
                title="Comentarios"
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Editar usuario',
                        onClick: (e, rowData) => {
                            ComentarioSeleccionado(rowData);
                        }
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Eliminar usuario',
                        onClick: (e, rowData) => {
                            EliminarComentario(rowData.id_comentario);
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
        </div>
    )
}

export default Comentarios
