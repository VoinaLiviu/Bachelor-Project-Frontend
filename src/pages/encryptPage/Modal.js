import React from 'react'
import ReactDom from 'react-dom'
import Rating from './Rating'
import './EncryptPage.css'
import './Modal.css'

export default function Modal({ cipherText, runTime, cipherText2, runTime2, open, closeModal, double, security, security2, popularity, popularity2 }) {
    if (!open) return null

    return (
        <>
            <div class="overlay" onClick={closeModal}></div>
            <div class="modal">
                <div class="closeButton" onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
                <div class="left">
                    <p>The resulting chipertext is: {cipherText}</p>
                    <p>The running time is: {runTime}</p>
                    <Rating popularity={popularity} security={security} />
                </div>
                {double &&
                    <div class="right">
                        <p>The resulting chipertext is: {cipherText2}</p>
                        <p>The running time is: {runTime2}</p>
                        <Rating popularity={popularity2} security={security2} />
                    </div>
                }
            </div>
        </>
    )
}
