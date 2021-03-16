import React, { useState, useEffect } from 'react';
import { 
    Select,
    Button,
    MenuItem
} from '@material-ui/core';
import { FormStyles } from '../../styles/Form';
import ClienteAxios from '../../config/axios';

const Cuentas = () => {

    /* TODO: /cuentas/grafica/:year/:month parasarlo al method POST */

    let api = {
        ano: ''
    }

    let data = []

    const formStyles = FormStyles();

    const [ grafica, setGrafica ] = useState(api) 

    useEffect( async () =>  {
        for(let mes = 1; mes <= 12; mes++) {
            console.log(mes)
            const resultados = await ClienteAxios.get(`/cuentas/grafica/${grafica.ano}/${mes}`)
            try {
                console.log(resultados.data)
            } catch (error) {
                console.log(error.response.status);
            }
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        const { ano } = grafica;

        if (ano === '') {
            console.log("mostar alerta")
        } else {
            console.log('a')
        }
    }

    const onChange = (e) => {
        setGrafica({
            ...grafica,
            [e.target.name] : e.target.value
        })
    }

    return (
        <div>
            <form 
                onSubmit={onSubmit}
            >
                <Select
                    className={formStyles.input}
                    id="ano"
                    name="ano"
                    label="Año"
                    variant="outlined"
                    value={grafica.ano}
                    onChange={onChange}
                >
                    <MenuItem value={2021}>2021</MenuItem>
                    <MenuItem value={2022}>2022</MenuItem> 
                </Select>
                <div align="right">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={formStyles.buttonSubmit}
                    >
                        Buscar
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Cuentas
