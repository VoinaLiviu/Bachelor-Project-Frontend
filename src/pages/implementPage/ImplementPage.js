import React, { useEffect, useState } from 'react'
import './ImplementPage.css'
import '../../common.css'
import CopyToClipboard from 'react-copy-to-clipboard';
import NavBar from '../../components/NavBar';


export default function ImplementPage() {
    const [language, setLanguage] = useState('java');
    const [algorithm, setAlgorithm] = useState('dsa');
    const [code, setCode] = useState([]);


    function getCode(alg, lng) {
        const fileName = lng + "-" + alg
        fetch("http://localhost:8080/implement/getCode", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fileName)
        }).then(res => res.json())
            .then((result) => {
                console.log(result);
                setCode(result);
            })
    }

    return (
        <div>
            <NavBar />
            <div className='implementContainer'>
                <div className='dropdowns'>
                    <select class="dropdown1" value={language} onChange={(e) => {
                        setLanguage(e.target.value)
                        getCode(algorithm, e.target.value)
                    }}>
                        <option value="java"> Java </option>
                        <option value="python"> Python </option>
                    </select>
                    <select class="dropdown2" value={algorithm} onChange={(e) => {
                        setAlgorithm(e.target.value)
                        getCode(e.target.value, language)
                    }}>
                        <option value="rsa"> RSA </option>
                        <option value="dsa"> DSA </option>
                        <option value="des"> DES </option>
                    </select>
                </div>
                <div className='codeSection'>
                    <CopyToClipboard text={code}>
                        <button className='copyBtn'>Copy</button>
                    </CopyToClipboard>
                    <div className='code'>
                        {code.map(line => {
                            return (<p class="text">{line.codeLine}</p>)

                        })}
                    </div>
                </div>

            </div>

        </div>
    )
}
