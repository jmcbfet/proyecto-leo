import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import Slider from '../Layout/Slider';

const UsuarioPage = () => {

    const authContext = useContext(AuthContext);
    const { UsuarioAutenticado } = authContext;

    useEffect(() => {
        UsuarioAutenticado();
    }, [])

    const history = useHistory();

    const goReservaPage = () => history.push('/reserva')
    const goCartaPage = () => history.push('/carta')

    return (
        <div>
            <Navbar />
            <Slider />
            <br />
            <Container>
                <Row>
                    <Col md="6">
                        <Button
                            variant="contained"
                            color="primary"
                            type="button"
                            onClick={goReservaPage}
                            style={{ width: '50%', height: '300px' }}
                        >
                            Reservar
                        </Button>
                    </Col>
                    <Col md="6">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={goCartaPage}
                            style={{ width: '50%', height: '300px' }}
                        >
                            Mirar Carta
                        </Button>
                    </Col>
                </Row>
            </Container>
            <br />
            <Footer />
        </div>
    )
}

export default UsuarioPage
