import React, { useState } from 'react'


export default function Dropdown({ value1, value2 }) {
    const [selectedValue, setSelectedValue] = useState();
    return (
        <div>
            <select value={selectedValue} onChange={e => setSelectedValue(e.target.value)}>
                <option value={value1}> {value1} </option>
                <option value={value2}> {value2} </option>
            </select>
        </div>
    )
}
