import React, { Fragment, useState, useContext } from 'react';
import AlertasContext from '../../context/alertas/alertasContext';

const Login = () => {

    const alertasContext = useContext(AlertasContext);

    const { alerta, mostrarAlerta } = alertasContext;

    const [user, newUser] = useState({
        correo: '',
        password: ''
    });

    const { correo, password } = user;

    const onSubmit = (e) => {
        e.preventDefault();

        if (correo.trim() === '' || password.trim() === '') {
            mostrarAlerta("Todos los campos son obligatorios", "alert-danger")
            return;
        }

        

    }

    const onChange = (e) => {
        newUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    return (

        <div>
            <form
                onSubmit={onSubmit}
            >
                <div className="form-group">
                    <label>Correo: </label>
                    <input
                        type="text"
                        name="correo"
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        name="password"
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        value="Ingresar"
                        className="btn btn-primary"
                    />
                </div>

            </form>

            {alerta ?
                <div className={`alert alert-dismissible ${alerta.type} mt-4`}>
                    <strong>{alerta.mensaje}</strong>
                </div>
                : null}

        </div>
    )
}

export default Login;