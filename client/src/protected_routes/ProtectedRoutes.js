import React, { useContext } from 'react'
import { Navigate, Outlet, Routes, Route, Router } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext'

const ProtectedRoutes = ({ user, children }) => {

    if (!user.admin){
        return <Navigate to='/' />
    };
    
    return children;
};

export default ProtectedRoutes;