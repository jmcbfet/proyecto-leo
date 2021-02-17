import React, { useContext } from 'react'
import { TextField, Button } from '@material-ui/core';
import { FormStyles } from '../../styles/Form';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AuthContext from '../../context/auth/authContext';

const Registro = () => {

    const authContext = useContext(AuthContext);

    const { ListarUsuarios } = authContext;

    const styles = FormStyles();

    const formValidation = yup.object({
        nombre:   yup.string().required("El nombre es obligatorio"),
        apellido: yup.string().required("El apellido es obligatorio"),
        correo:   yup.string().email("Correo no valido").required("El correo es obligatorio"),
        password: yup.string().min(6, "La Contraseña debe tener minimo 6 caracteres").required("La contraseña es obligatoria")
    })

    const formData = {
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        id_rol: 2,
    }

    const formik = useFormik({
        initialValues: formData,
        validationSchema: formValidation,
        onSubmit: (values) => {
            const json = JSON.stringify(values)
            console.log(json);
            ListarUsuarios();
        }
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    className={styles.input}
                    id="nombre"
                    name="nombre"
                    label="Nombre"
                    variant="outlined"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                    helperText={formik.touched.nombre && formik.errors.nombre}
                    onBlur={formik.handleBlur}
                />
                <TextField 
                    className={styles.input}
                    id="apellido"
                    name="apellido"
                    label="Apellido"
                    variant="outlined"
                    value={formik.values.apellido}
                    onChange={formik.handleChange}
                    error={formik.touched.apellido && Boolean(formik.errors.apellido)}
                    helperText={formik.touched.apellido && formik.errors.apellido}
                    onBlur={formik.handleBlur}
                />
                <TextField
                    className={styles.input}
                    id="correo"
                    name="correo"
                    label="Correo"
                    variant="outlined"
                    value={formik.values.correo}
                    onChange={formik.handleChange}
                    error={formik.touched.correo && Boolean(formik.errors.correo)}
                    helperText={formik.touched.correo && formik.errors.correo}
                    onBlur={formik.handleBlur}
                />
                <TextField
                    className={styles.input}
                    id="password"
                    name="password"
                    label="Contraseña"
                    variant="outlined"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    onBlur={formik.handleBlur}
                />
                <Button 
                    variant="contained" 
                    color="primary"
                    type="submit"
                    className={styles.buttonSubmit}
                >
                    Registrar
                </Button>
            </form>
        </div>
    )
}

export default Registro
