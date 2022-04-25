import React, { useEffect } from 'react'
import { 
    BrowserRouter, 
    Routes, 
    Route,
} from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Class from './pages/Class'
import Section from './pages/Section'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Student from './pages/Student'
import { ProtectedRoute, PublicRoute } from './helper/routes-helper'
import { LOCAL_STORAGE_KEY, useGlobalContext } from './context'

const App = () => {
    const { loginSuccess } = useGlobalContext()
    const getStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    useEffect(() => {
        if (getStorage) {
            const {email, username} = getStorage
            loginSuccess(email, username)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const {isUser} = useGlobalContext()
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <ProtectedRoute isUser={isUser}>
                        <Home />
                    </ProtectedRoute>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path='class' element={<Class />} />
                    <Route path='section' element={<Section />} />
                    <Route path='student' element={<Student />} />
                </Route>
                <Route path='login' element={
                    <PublicRoute isUser={isUser}>
                        <Login /> 
                    </PublicRoute>
                } />
                <Route path='signup' element={
                    <PublicRoute isUser={isUser}>
                    <Signup /> 
                    </PublicRoute>
                }/>
            </Routes>
        </BrowserRouter>
    )
}

export default App