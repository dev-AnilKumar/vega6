import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = ({ token }) => {

    return token ?
        <Outlet /> :
        <Navigate to="login" />
}

export default ProtectRoute