import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE_KEY, useGlobalContext } from '../context'
import { postRequest } from '../api/fetchRequest'

export const Login = () => {
    const {isError, errorMessage, loginSuccess, handleError} = useGlobalContext()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (!username || !password) {
            handleError('Some fields are empty')
        } else if (password.length < 6){
            setPassword('')
            handleError('Password too short')
        } else {
            setUsername('')
            setPassword('')
            
            const result = await postRequest('user/get',{email:username, password})
            if (Array.isArray(result)) {
                const {email, firstname} = result[0]
                loginSuccess(email,firstname)
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({email, username:firstname}))
                navigate('/')
            } else {
                handleError(result)
            }
        }
    }

  return (
    <section className="login">
        <div className="login__center">
            {isError && <p className="login__error">{errorMessage}</p>}
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="login__input">
                    <input 
                    type="text" 
                    name="username"
                    value={username}
                    onChange={e=>setUsername(e.target.value)}
                    />
                    <label className={!username ? 'label': 'label active-label'}>Email</label>
                </div>
                <div className="login__input">
                    <input 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    />
                    <label className={!password ? 'label': 'label active-label'}>Password</label>
                </div>
                <button className="login__btn" onClick={handleSubmit}>Login</button>
                <p className="login__link">
                    <span>Not a member?</span>
                    <Link to="/signup">Signup</Link>
                </p>
            </form>
        </div>
    </section>
  )
}

export default Login;