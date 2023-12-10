import { useState } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from './login/components/Login';
import Shopping from './dashboard/pages/Shopping';
import Home from './dashboard/pages/Home';
import Analytics from './dashboard/pages/Analytics';
import Informe from './dashboard/pages/Informe';
import Settings from './dashboard/pages/Settings';
import Products from './dashboard/pages/products/Products';
import User from './dashboard/pages/users/User';
export const AppRouter = () => {

    return (
        <>
            <Routes>
                {/* RUTAS PRINCIPALES */}
                <Route path="/" element={<Login></Login>}></Route>

                {/* RUTAS USUARIO */}
                <Route path="/dashboard" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/clientes" element={<User />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/resultados" element={<Informe />} />
            </Routes>
        </>
    )
}
