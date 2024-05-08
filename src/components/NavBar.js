import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import SignOutButton from './SignOutButton'
import { Link } from 'react-router-dom'
import "./NavBar.css"
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '../firebase-config'

export default function NavBar() {
    const [username, setUsername] = useState("")
    const [points, setPoints] = useState(0)

    const userStatsCollectionRef = collection(db, "userStats")

    const { currentUser } = useAuth()

    useEffect(() => {
        const getUsername = async () => {
            const q = query(userStatsCollectionRef, where("uid", "==", currentUser.uid))
            try {
                const querySnapshot = await getDocs(q)
                setUsername(querySnapshot.docs[0].data().username)
                setPoints(querySnapshot.docs[0].data().points)
            } catch (error) {
                console.error(error)
            }

        }

        getUsername()
    }, [])

    return (
        <div className="navbar">
            <Link to="/">
                <h1 className="navbarTitle">EncryptIT</h1>
            </Link>

            <div className='navbarRight'>
                <div className='userStats'>
                    <div className='username'><p>Hello, </p> <p>{username}!</p></div>
                    <div className='points'> <p>Points: </p>  <p>{points}</p></div>
                </div>
                <SignOutButton />
            </div>
        </div>
    )
}
