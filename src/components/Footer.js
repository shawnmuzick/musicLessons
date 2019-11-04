import React from 'react'

export default function Footer() {
    const date = new Date();
    return (
        <footer className="App-header">&#169; {date.getFullYear()}</footer>
    )
}
