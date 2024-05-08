import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import './SignOutButton.css'

export default function SignOutButton() {

    const navigate = useNavigate()
    const { signout } = useAuth()

    async function handleSignOut(e) {
        e.preventDefault()
        try {
            await signout()
            navigate("/login")
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <button className='signoutBtn' onClick={(e) => { handleSignOut(e) }}> Sign Out </button>
    )
}
