import React, { useState, useContext, useEffect } from 'react'
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Container,
    Row,
    Col,
} from 'reactstrap';
import {
    Button,
    Modal,
    TextField
} from '@material-ui/core';
import { ModalStyles } from '../../styles/Modal';
import { FormStyles } from '../../styles/Form';
import UsuariosContext from '../../context/usuarios/usuariosContext';

const Plato = ({ plato }) => {

    let api = {
        comentario: ''
    }

    const [ modalComentarios, setModalComentarios ] = useState(false);
    const [ modalInsertarComentario, setModalInsertarComentario ] = useState(false);

    const [ nuevoComentario, setNuevoComentario ] = useState(api);

    const usuariosContext = useContext(UsuariosContext);
    const { AgregarComentario, ConsultarComentarios, comentarios } = usuariosContext;

    const modalStyles = ModalStyles();
    const formStyles = FormStyles();

    const AbrirCerrarModal = () => {
        setModalComentarios(!modalComentarios);
        ConsultarComentarios(plato.id_plato)
    }

    const AbrirCerrarModalInsertar = () => {
        setModalInsertarComentario(!modalInsertarComentario);
    }

    const onChange = (e) => {
        setNuevoComentario({
            ...nuevoComentario,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const { comentario } = nuevoComentario;

        if (
            comentario === '' 
        ) {
            console.log('no haga nada');
        } else {
            const datos = { id_plato: plato.id_plato, comentario }
            AgregarComentario(datos);
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col md="9">
                        <Card>
                            <CardImg top width="200" height="400" src={plato.imagen} alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5">{plato.nombre}</CardTitle>
                                <CardText>Precio {plato.precio} </CardText>
                                <CardText>Id {plato.id_plato} </CardText>
                                <Row>
                                    <Col md="6">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="button"
                                            onClick={AbrirCerrarModal}
                                        >
                                            Mirar Comentarios
                                        </Button>
                                    </Col>
                                    <Col md="6">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="button"
                                            onClick={AbrirCerrarModalInsertar}
                                        >
                                            Agregar Comentario
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal
                open={modalInsertarComentario}
                onClose={AbrirCerrarModalInsertar}
            >
                <div className={modalStyles.modal}>
                    <h3>Nuevo Comentario</h3>
                    <form
                        onSubmit={onSubmit}
                    >
                        <TextField
                            className={formStyles.input}
                            id="comentario"
                            name="comentario"
                            label="Comentario"
                            variant="outlined"
                            value={nuevoComentario.comentario}
                            onChange={onChange}
                        />

                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={formStyles.buttonSubmit}
                        >
                            Agregar Comentario
                    </Button>
                    </form>
                </div>
            </Modal>

            <Modal
                open={modalComentarios}
                onClose={AbrirCerrarModal}
            >
                <div className={modalStyles.modal}>
                    <h3>Comentarios</h3>
                    {comentarios ? 
                        comentarios.map(comentario => {
                            return (
                                <ul>
                                    <li>{comentario.comentario}</li>
                                </ul>
                            );
                        })
                    : <p>No hay comentarios</p>}
                </div>
            </Modal>

        </div>
    )
}

export default Plato
