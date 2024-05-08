import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import NavBar from '../../components/NavBar'
import { Link } from 'react-router-dom'
import './HomePage.css'

export default function HomePage() {

    return (
        <div>
            <NavBar />
            <div className='homePageContainer'>
                <div className='homePageGrid'>
                    <Link to="/encrypt"><div className='homePageElement'>EncryptIT</div></Link>
                    <Link to="/learn"><div className='homePageElement'>LearnIT</div></Link>
                    <Link to="/implement"><div className='homePageElement'>ImplementIT</div></Link>
                    <Link to="/quizzes"><div className='homePageElement'>QuizIT</div></Link>
                </div>
            </div>
        </div>
    )
}
