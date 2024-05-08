import React, { useState } from 'react'
import '../../common.css'
import { Quizzes } from './questions'
import { useAuth } from '../../contexts/AuthContext';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase-config';

export default function Quiz({ open, close, quizNo }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState("A");
    const [showScore, setShowScore] = useState(false);

    const userStatsCollectionRef = collection(db, "userStats")
    const quizScoresCollectionRef = collection(db, "quizScores")

    const questions = Quizzes[quizNo - 1];

    const { currentUser } = useAuth()

    const verifyAnswer = () => {
        if (currentAnswer === questions[currentQuestion].answer) {
            setScore(score + 1);
        }
    }

    const nextQuestion = () => {
        verifyAnswer();
        setCurrentQuestion(currentQuestion + 1);
    }

    const finishQuiz = async () => {
        verifyAnswer();

        try {
            const q = query(userStatsCollectionRef, where("uid", "==", currentUser.uid))
            const querySnapshot = await getDocs(q);
            const oldScore = querySnapshot.docs[0].data().points
            const newScore = oldScore + score

            const statsRef = doc(db, "userStats", querySnapshot.docs[0].id);

            await updateDoc(statsRef, {
                points: newScore
            });

            const docRef = await addDoc(quizScoresCollectionRef, { quizNO: quizNo, score: 2, uid: currentUser.uid })

        } catch (error) {
            console.error(error)
        }

        setShowScore(true);
    }

    const exitQuiz = () => {
        setCurrentQuestion(0)
        setScore(0)
        setShowScore(false)
        close()
    }


    if (!open) return null

    return (
        <>
            <div className='overlay' onClick={close}></div>
            <div className='quiz-window'>
                {showScore === false ? (
                    <div className='quiz-info'>
                        <div className='quizTitle'>
                            <h1>{questions[currentQuestion].question}</h1>
                        </div>

                        <button className='option' onClick={() => { setCurrentAnswer("A") }}>{questions[currentQuestion].optionA}</button>
                        <button className='option' onClick={() => { setCurrentAnswer("B") }}>{questions[currentQuestion].optionB}</button>
                        <button className='option' onClick={() => { setCurrentAnswer("C") }}>{questions[currentQuestion].optionC}</button>
                        <button className='option' onClick={() => { setCurrentAnswer("D") }}>{questions[currentQuestion].optionD}</button>
                        {currentQuestion === questions.length - 1 ? (<button onClick={finishQuiz}>Finish</button>) : (
                            <div className='quizButtons'>
                                <button onClick={nextQuestion}>Next</button>
                                <button onClick={close}>Cancel</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className='results'>
                        <h1>Your final score:</h1>
                        <h2>{score}/{questions.length}</h2>
                        <button onClick={exitQuiz}>Exit</button>
                    </div>
                )}
            </div>
        </>
    )
}
