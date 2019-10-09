import React from 'react'
import Button from './components/Button';
export default function MainMenu(props) {
    const menuItems = ['Today','Faculty']

    const clickHandler = (e) =>{
       props.setView(e.target.value)
    }
    return (
        <div id="MainMenu">
            <h2>Main Menu</h2>
            {menuItems.map(item =>(<Button item={item} clickHandler={clickHandler}/>))}
        </div>
    )
}
