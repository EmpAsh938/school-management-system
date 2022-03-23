import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useGlobalContext} from '../context'
import {postRequest} from '../api/fetchRequest'

export const Signup = () => {
    const { isError, errorMessage, handleError } = useGlobalContext()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (!firstName || !lastName || !email || !password) {
            handleError('Some fields are empty')
        } else if (password.length < 6 ){
            handleError('Password too short')
        } else {
            const result = await postRequest('user/create', {firstname: firstName, lastname: lastName, email, password
            })
            if (typeof result == 'object' && result !== null ) {
                navigate('/login')
            } else {
                handleError(result)
            }
        }
        setFirstName('')
        setEmail('')
        setPassword('')
        setLastName('')
    }

  return (
    <section className="login">
        <div className="login__center">
            {isError && <p className="login__error">{errorMessage}</p>}
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className="login__input">
                    <input type="text" name="firstname" value={firstName} onChange={e=>setFirstName(e.target.value)}/>
                    <span></span>
                    <label className={!firstName ? 'label': 'label active-label'}>firstname</label>
                </div>
                <div className="login__input">
                    <input type="text" name="lastname" value={lastName} onChange={e=>setLastName(e.target.value)}/>
                    <span></span>
                    <label className={!lastName ? 'label': 'label active-label'}>lastname</label>
                </div>
                <div className="login__input">
                    <input type="email" name="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                    <span></span>
                    <label className={!email ? 'label': 'label active-label'}>Email</label>
                </div>
                <div className="login__input">
                    <input type="password" name="password" value={password
                    } onChange={e=>setPassword(e.target.value)}/>
                    <span></span>
                    <label className={!password ? 'label': 'label active-label'}>Password</label>
                </div>
                <button className="login__btn" onClick={handleSubmit}>Signup</button>
                <p className="login__link">
                    <span>Already have an account?</span>
                    <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    </section>
  )
}

export default Signup;