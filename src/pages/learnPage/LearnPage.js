import React, { useEffect, useState } from 'react'
import './LearnPage.css'
import NavBar from '../../components/NavBar';


export default function LearnPage() {

    const [algorithm, setAlgorithm] = useState("Select an algorithm");
    const [theory, setTheory] = useState([]);
    const theory1 = [
        { "theoryLine": "prima linie" },
        { "theoryLine": "a doua linie" },
        { "theoryLine": "a treia linie" }
    ]

    function changeHandler(value) {
        setAlgorithm(value)
        const fileName = value
        fetch("http://localhost:8080/learn/getTheory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fileName)
        }).then(res => res.json())
            .then((result) => {
                console.log(result)
                setTheory(result)
                console.log(theory)
            })
    }
    return (
        <div>
            <NavBar />
            <div className="learnContainer">
                <div className='dropdownContainer'>
                    <select className="dropdown" value={algorithm} onChange={e => changeHandler(e.target.value)}>
                        <option value="RSA"> RSA </option>
                        <option value="DSA"> DSA </option>
                        <option value="DES"> DES </option>
                    </select>
                </div>
                <div className="infoSection">
                    <div className='title'> {algorithm} </div>
                    <div className='info'>
                        {theory.map(line => {
                            return (<p class="text">{line.theoryLine}</p>)

                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
