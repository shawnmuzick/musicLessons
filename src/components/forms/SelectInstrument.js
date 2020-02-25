import React from 'react'
import {instrumentList} from './instrumentList';
export default function SelectInstrument({fn}) {
    return (
        <select name="instrument" onChange={fn}>
            <option value="">Select An Instrument</option>
            {instrumentList.map(i=>(
            <option name="instrument" value={i}>{i}</option>
            ))}
        </select>
    )
}
