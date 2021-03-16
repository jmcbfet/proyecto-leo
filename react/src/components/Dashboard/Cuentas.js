import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2'
import {
    Select,
    Button,
    MenuItem
} from '@material-ui/core';
import { FormStyles } from '../../styles/Form';
import clienteAxios from '../../config/axios';

const Cuentas = () => {

    let api = {
        year: ''
    }

    const [ grafica, setGrafica ] = useState(api)
    const [ chartData, setChartData ] = useState({})
    const [ data, setData ] = useState([])

    const formStyles = FormStyles();

    const onSubmit = async (e) => {
        e.preventDefault();

        const { year } = grafica;

        if (year === '') {
            console.log("mostar alerta")
            return
        } else {

            setData([])

            for(let mes = 1; mes <= 12; mes++) {
                const response = await clienteAxios.post(`/cuentas/grafica/${mes}`, { year: grafica.year })
                if (response.data == null) {
                    data.push(0)
                } else {
                    data.push(response.data[0].total_mes)
                }
                console.log(data)
            }

            setChartData({
                labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                datasets: [
                  {
                    label: "level of thiccness",
                    data: data,
                    backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                    borderWidth: 4
                  }
                ]
              });

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
                    id="year"
                    name="year"
                    label="Año"
                    variant="outlined"
                    value={grafica.year}
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
            <Line 
                width={600}
                height={600}
                data={chartData}
            />
        </div>
    )
}

export default Cuentas
