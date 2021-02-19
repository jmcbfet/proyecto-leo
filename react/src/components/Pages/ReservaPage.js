import React, { useContext, useEffect } from 'react'
import Navbar from '../Layout/Navbar'
import AuthContext from '../../context/auth/authContext';

const ReservaPage = () => {

    const authContext = useContext(AuthContext);

    const { auth } = authContext;

    return (
        <div>
            <Navbar />
            <h1>wfkweofkweofkowekfowekf</h1>
        </div>
    )
}

export default ReservaPage
