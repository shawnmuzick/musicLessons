import React from 'react'

export default function Header(props) {
    const {menuExpand, menuState} = props;
    return (
        <header className="App-header">
        <div id="App-header-wrapper">
          <button value={menuState} onClick={menuExpand}>
            {menuState}
          </button>
          <h1>Music Lessons</h1>
        </div>
      </header>
    )
}
