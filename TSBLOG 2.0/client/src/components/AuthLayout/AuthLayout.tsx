import React from 'react';
import {TOKEN_KEY} from "../../utils/localstorage";
import {Navigate, Outlet} from 'react-router-dom'
const AuthLayout = () => {
    const token = localStorage.getItem(TOKEN_KEY)

    if(token) {
        return <Navigate to='/'/>
    }

    return (
        <Outlet/>
    );
};

export default AuthLayout;