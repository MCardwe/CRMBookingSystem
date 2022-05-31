import React, { useContext } from 'react'
import { Navigate, Outlet, Routes, Route, Router } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'

const ProtectedRoutesAdmin = ({ user, children }) => {

    if (!user){
            return <div>Authenticating...</div>
        }

    if (!user.admin){
        return <Navigate to='/' />
    };
    
    return children;
};

export default ProtectedRoutesAdmin;