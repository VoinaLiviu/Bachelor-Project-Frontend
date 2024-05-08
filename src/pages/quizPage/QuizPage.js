import React, { useEffect, useState } from 'react'
import './quizPage.css'
import Quiz from './Quiz';
import NavBar from '../../components/NavBar';
import { useAuth } from '../../contexts/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { Quizzes } from './questions';

export default function QuizPage() {
    const [quizOpen, setQuizOpen] = useState(false);
    const [quizNumber, setQuizNumber] = useState(0);
    const [solvedQuizzes, setSolvedQuizzes] = useState([])
    const [quizzes, setQuizzes] = useState(Quizzes)

    const { currentUser } = useAuth()

    const quizzesCollectionRef = collection(db, "quizScores")

    function startQuiz(number) {
        setQuizNumber(number)
        setQuizOpen(true)
    }

    function endQuiz() {
        setQuizOpen(false);
        window.location.reload()
    }

    useEffect(() => {
        const getQuizzes = async () => {
            let solvedArray = []
            const q = query(quizzesCollectionRef, where("uid", "==", currentUser.uid))
            try {
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((doc) => {
                    solvedArray.push(doc.data().quizNO)
                })
                setSolvedQuizzes(solvedArray)
            } catch (error) {
                console.error(error)
            }
        }

        getQuizzes()
    }, [])

    return (
        <>
            <NavBar />
            <div className='quiz-grid'>
                {quizzes.map((quiz, index) => {
                    if (solvedQuizzes.includes(index + 1)) return <div className='quiz-thumbnail inactive' key={index + 1}>{index + 1}</div>
                    else return <div className='quiz-thumbnail' key={index + 1} onClick={() => { startQuiz(index + 1) }}>{index + 1}</div>
                })}
            </div>

            <Quiz open={quizOpen} quizNo={quizNumber} close={endQuiz} />
        </>
    )
}
