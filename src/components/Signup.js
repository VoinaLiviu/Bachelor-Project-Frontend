import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate, } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase-config'
import './Signup.css'

export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const navigate = useNavigate()
    const { signup, currentUser } = useAuth()

    const userStatsCollectionRef = collection(db, "userStats");

    async function handleSignup(e) {
        e.preventDefault()

        try {
            await signup(email, password).then(async (result) => {
                try {

                    const docRef = await addDoc(userStatsCollectionRef, { uid: result.user.uid, username: username, points: 0 })
                } catch (error) {
                    console.error(error)
                }
            })
            navigate("/")
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <div className='signup-container'>
            <h2>Sign up with email and password</h2>
            <input type='email' placeholder='Enter your email...' onChange={(e) => { setEmail(e.target.value) }}></input>
            <input type='password' placeholder='Enter your password...' onChange={(e) => { setPassword(e.target.value) }}></input>
            <input type='text' placeholder='Enter your username...' onChange={(e) => { setUsername(e.target.value) }}></input>
            <button onClick={(e) => handleSignup(e)}>Sign Up</button>
            <div className='loginContainer'>Already have an account? <Link to="/login"><p>Log In</p></Link></div>
        </div>
    )
}
