import React from 'react'
import "./filter.css"
export default function Filter({children}) {
    return (
        <div className={"filter"}>
            {children}
        </div>
    )
}
