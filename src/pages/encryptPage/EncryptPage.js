import React, { useState } from 'react'
import './EncryptPage.css';
import '../../common.css'
import Modal from './Modal';
import NavBar from '../../components/NavBar';

export default function EncryptPage() {

    const [algorithm1, setAlgorithm1] = useState('DSA');
    const [algorithm2, setAlgorithm2] = useState('DSA');
    const [message, setMessage] = useState();
    const [key, setKey] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [cipher, setCipher] = useState();
    const [cipher2, setCipher2] = useState();
    const [time, setTime] = useState();
    const [time2, setTime2] = useState();
    const [double, setDouble] = useState(false);
    const [popularity, setPopularity] = useState();
    const [popularity2, setPopularity2] = useState();
    const [security, setSecurity] = useState();
    const [security2, setSecurity2] = useState();
    //const [type, setType] = useState('single');

    const handleClick = (e) => {
        e.preventDefault()
        if (double) {
            const toEncrypt = { algorithm1, algorithm2, key, message }
            console.log(toEncrypt)
            fetch("http://localhost:8080/encrypt/encryptMessageDouble", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(toEncrypt)
            })
                .then(res => res.json())
                .then((result) => {
                    console.log(result)
                    setCipher(result.ciphertext1)
                    setCipher2(result.ciphertext2)
                    setTime(result.runningTime1)
                    setTime2(result.runningTime2)
                    setPopularity(result.popularity1)
                    setPopularity2(result.popularity2)
                    setSecurity(result.security1)
                    setSecurity2(result.security2)
                    setIsOpen(true);
                })
        }
        else {
            const toEncrypt = { algorithm: algorithm1, key, message }
            console.log(toEncrypt)
            fetch("http://localhost:8080/encrypt/encryptMessage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(toEncrypt)
            })
                .then(res => res.json())
                .then((result) => {
                    console.log(result)
                    setCipher(result.ciphertext)
                    setTime(result.runningTime)
                    setPopularity(result.popularity)
                    setSecurity(result.security)
                    setIsOpen(true);
                })
        }
    }

    return (
        <div>
            <NavBar />
            <div className='encryptWrapper'>
                <div className="encryptContainer">
                    <h2> Select the algorithms that you want to compare.</h2>
                    <div className='algorithms'>
                        <div className='algorithm1'>
                            <p>Algorithm No. 1</p>
                            <select class="dropdown1" value={algorithm1} onChange={e => setAlgorithm1(e.target.value)}>
                                <option value="DSA"> DSA </option>
                                <option value="RSA"> RSA </option>
                                <option value="DES"> DES </option>
                            </select>
                        </div>
                        {double && (<div className='algorithm2'>
                            <p>Algorithm No. 2</p>
                            <select class="dropdown2" value={algorithm2} onChange={e => setAlgorithm2(e.target.value)}>
                                <option value="DSA"> DSA </option>
                                <option value="RSA"> RSA </option>
                                <option value="DES"> DES </option>
                            </select>
                        </div>)}
                    </div>
                    <div className='chooseTwo'>
                        <p>Do you want to choose a second algorithm?</p>
                        <input type="checkbox" className='check' onChange={(e) => { setDouble(!double) }}></input>
                    </div>
                    <div className='inputFields'>
                        <input type='text' placeholder='Enter the message that you want to encrypt...' onChange={(e) => { setMessage(e.target.value) }}></input>
                        <input type='text' placeholder='Enter the encryption key...' onChange={(e) => { setKey(e.target.value) }}></input>
                    </div>
                    <div className='submitContainer'>
                        <button onClick={(e) => { handleClick(e) }}>Submit</button>
                    </div>
                </div>
            </div>
            <div class="modalContainer">
                <Modal open={isOpen} cipherText={cipher} runTime={time} cipherText2={cipher2} runTime2={time2} double={double} security={security} security2={security2}
                    popularity={popularity} popularity2={popularity2} closeModal={() => setIsOpen(false)}>

                </Modal>
            </div>
        </div>
    )
}
