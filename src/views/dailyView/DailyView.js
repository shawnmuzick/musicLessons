import React from 'react'

export default function DailyView() {
    let date = new Date();
    date = date.toDateString();
    return (
        <div id="DailyView" className={'view'}>
            <h2>Today: {date}</h2>
        </div>
    )
}
