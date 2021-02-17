import React from 'react';
import Navbar from '../Layout/Navbar';
import { FormStyles } from '../../styles/Form';
import Registro from '../auth/Registro';

const RegistroPage = () => {

    const styles = FormStyles();

    return (
        <div>
            <Navbar />
            <div className={styles.caja}>
                <Registro />
            </div>
        </div>
    );
}

export default RegistroPage;