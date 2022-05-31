import React from 'react'
import { Navigate } from 'react-router-dom';


const ProtectedRoutesUser = ({ user, children }) => {

    if (!user){
        return <div>Authenticating...</div>
    }

    if (!user.allowedToBook){
        return <Navigate to='/' />
    };
    
    return children;
};

export default ProtectedRoutesUser;