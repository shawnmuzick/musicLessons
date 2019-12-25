import React from 'react'

export default function EmpForm() {
    return (
        <form id ="EmpForm">
            <label><input type="checkbox" value='1'id='dayCheckbox'/>Monday</label><br/>
            <label><input type="checkbox" value='2'id='dayCheckbox'/>Tuesday</label><br/>
            <label><input type="checkbox" value='3'id='dayCheckbox'/>Wednesday</label><br/>
            <label><input type="checkbox" value='4'id='dayCheckbox'/>Thursday</label><br/>
            <label><input type="checkbox" value='5'id='dayCheckbox'/>Friday</label><br/>
            <label><input type="checkbox" value='6'id='dayCheckbox'/>Saturday</label><br/>
            <label><input type="checkbox" value='0'id='dayCheckbox'/>Sunday</label><br/>
            <input type="submit"/>
        </form>
    )
}
