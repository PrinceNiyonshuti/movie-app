import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'

function Layout() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/Dashboard" element={<Dashboard/>}/>
                <Route path="/AddMovie" element={<Login/>}/>
            </Routes>
        </div>
    )
}

export default Layout
