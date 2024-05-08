import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
    const { login, currentUser } = useAuth()

    async function handleLogin(e) {
        try {
            await login(email, password)
            navigate("/")
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='login-container'>
            <h2>Login into your account</h2>
            <input type='email' placeholder='Enter your email...' onChange={(e) => { setEmail(e.target.value) }}></input>
            <input type='password' placeholder='Enter your password...' onChange={(e) => { setPassword(e.target.value) }}></input>
            <button onClick={(e) => handleLogin(e)}>Log in</button>
            <div className='signupContainer'>Don't have an account? <Link to="/signup"> <p className='singupText'>Sign Up</p></Link> </div>
        </div>
    )
}
