import React, { useState, useContext } from 'react';
import {
    TextField,
    Button,
} from '@material-ui/core';
import { FormStyles } from '../../styles/Form';
import FooterContext from '../../context/footer/footerContext';

const Footer = () => {

    const footerContext = useContext(FooterContext);
    const { AgregarSugerencia } = footerContext;

    let api = {
        correo: '',
        descripcion: ''
    }

    const [ sugerencia, setSugerencia ] = useState(api)

    const formStyles = FormStyles();

    const onChange = (e) => {
        setSugerencia({
            ...sugerencia,
            [e.target.name] : e.target.value
        });
    }

    const onSubmit = (e) => {

        e.preventDefault()

        const { correo, descripcion } = sugerencia;

        if (correo === '' || descripcion === '') {
            console.log('no haga nada');
        } else {
            const datos = { correo, descripcion };
            AgregarSugerencia(datos);
            console.log('http');
        }

    }

    return (
        <div className={formStyles.caja}>
            <h1>Formulario de sugerencias </h1>
            <form 
                onSubmit={onSubmit}
            >
                <TextField
                    className={formStyles.input}
                    id="correo"
                    name="correo"
                    label="Correo"
                    variant="outlined"
                    value={sugerencia.correo}
                    onChange={onChange}
                />
                <TextField
                    className={formStyles.input}
                    id="descripcion"
                    name="descripcion"
                    label="Descripcion"
                    variant="outlined"
                    value={sugerencia.descripcion}
                    onChange={onChange}
                />
                <div align="right">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={formStyles.buttonSubmit}
                    >
                        Enviar Sugerencia
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Footer
