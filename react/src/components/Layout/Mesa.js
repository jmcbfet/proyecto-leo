import React, { useState, useContext } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardText,
    CardBody,
    CardTitle,
} from 'reactstrap';
import {
    Modal,
    TextField,
    Button
} from '@material-ui/core';
import { FormStyles } from '../../styles/Form';
import { ModalStyles } from '../../styles/Modal';
import AuthContext from '../../context/auth/authContext'

const Mesa = ({ mesa }) => {

    const [ modalReserva, setModalReserva ] = useState(false);

    const authContext = useContext(AuthContext);
    const { usuario } = authContext;

    const AbrirCerrarModal = () => {
        setModalReserva(!modalReserva);
    }

    const formStyles = FormStyles();
    const modalStyles = ModalStyles();

    const onSubmit = (e) => {
        e.preventDefault();


    }

    const onChange = (e) => {

    }

    const bodyReserva = (
        <div className={modalStyles.modal}>
            <h3>Reserva {mesa.descripcion}</h3>
            <form
                onSubmit={onSubmit}
            >
                {usuario ? 
                    <TextField
                        className={formStyles.input}
                        id="id_usuario"
                        name="id_usuario"
                        label="Id"
                        value={usuario.id_usuario}
                        variant="outlined"
                        onChange={onChange}
                    />
                : null}
                
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
    )

    console.log(mesa);

    return (
        <div>
            <Container>
                <Row md={4}>
                    <Col md={12}>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">{mesa.id_mesa}</CardTitle>
                                <CardText>Descripcion: {mesa.descripcion} </CardText>
                                <Row>
                                    <Col md="12">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="button"
                                            onClick={AbrirCerrarModal}
                                        >
                                            Reservar
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal
                open={modalReserva}
                onClose={AbrirCerrarModal}
            >
                {bodyReserva}
            </Modal>

        </div>
    )
}

export default Mesa;
