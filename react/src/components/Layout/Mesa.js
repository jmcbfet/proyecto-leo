import React, { useState, useContext, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardText,
    CardBody,
    CardTitle,
    Table
} from 'reactstrap';
import {
    Modal,
    Button,
    Select,
    MenuItem
} from '@material-ui/core';
import { FormStyles } from '../../styles/Form';
import { ModalStyles } from '../../styles/Modal';
import AuthContext from '../../context/auth/authContext'
import DashboardContext from '../../context/dashboard/dashboardContext';
import UsuarioContext from '../../context/usuarios/usuariosContext';

const Mesa = ({ mesa }) => {

    const authContext = useContext(AuthContext);
    const { usuario } = authContext;

    const dashboardContext = useContext(DashboardContext);
    const { platos, ListarPlatos } = dashboardContext;

    const usuarioContext = useContext(UsuarioContext);
    const { cuenta, total, AgregarCuenta, ConsultarReservaActual, EliminarCuenta, ConsultarTotalReserva } = usuarioContext;

    let api = {
        id_plato: ''
    }

    useEffect(() => {
        ListarPlatos();
    }, [])

    const [ modalReserva, setModalReserva ] = useState(false);
    const [ nuevoPlato, setNuevoPlato ] = useState(api);

    const AbrirCerrarModal = () => {
        setModalReserva(!modalReserva);
        ConsultarReservaActual(usuario.id_usuario, mesa.id_mesa);
        ConsultarTotalReserva(usuario.id_usuario, mesa.id_mesa);
    }

    const formStyles = FormStyles();
    const modalStyles = ModalStyles();

    const onChange = (e) => {
        setNuevoPlato({
            ...nuevoPlato,
            [e.target.name]: e.target.value
        })
    }

    const AgregarPlatoCuenta = (e) => {
        e.preventDefault();

        const { id_plato } = nuevoPlato;

        if (id_plato === '') {
            console.log('error');
        } else {
            console.log(usuario.id_usuario);
            const datos = {
                id_mesa: mesa.id_mesa,
                id_plato,
                id_usuario: usuario.id_usuario
            }
            console.log(datos);
            AgregarCuenta(datos, id_plato)
            setNuevoPlato(api);
        }
    }

    const EliminarPlatoCuenta = (id_cuenta) => {
        EliminarCuenta(id_cuenta, mesa.id_mesa, usuario.id_usuario)
    }

    const bodyReserva = (
        <div className={modalStyles.modalReserva}>
            <h3>Reserva {mesa.descripcion}</h3>
            <h6>Escoja sus platos: </h6>
            <form>
                <Select
                    className={formStyles.input}
                    id="id_plato"
                    name="id_plato"
                    label="Plato"
                    variant="outlined"
                    value={nuevoPlato.id_plato}
                    onChange={onChange}
                >

                    {platos ?
                        platos.map(plato => {
                            return (
                                <MenuItem value={plato.id_plato}>
                                    {plato.nombre}
                                </MenuItem>
                            )
                        })
                        : null}

                </Select>

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={formStyles.buttonSubmit}
                    onClick={AgregarPlatoCuenta}

                >
                    Agregar Plato
                </Button>

            </form>

            <Table>
                <thead>
                    <tr>
                        <th>Plato</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {cuenta ?
                        cuenta.map(cuenta => {
                            return (
                                <tr key={cuenta.id_cuenta}>
                                    <td>{cuenta.nombre}</td>
                                    <td>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            className={formStyles.buttonSubmit}
                                            onClick={() => EliminarPlatoCuenta(cuenta.id_cuenta)}

                                        >
                                            Eliminar
                                            </Button>
                                    </td>
                                </tr>
                            )
                        })
                        : null}
                </tbody>
            </Table>

            {total ? 
                <h1>Total: {total}</h1>
            : null}

        </div>
    )

    return (
        <div>
            <Container>
                <Row md={4}>
                    <Col md={12}>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">{mesa.id_mesa}</CardTitle>
                                <CardText>Mesa: {mesa.descripcion} </CardText>
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
