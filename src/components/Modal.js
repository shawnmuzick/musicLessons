import React from 'react'
import {Modal as M} from '@material-ui/core/';
export default function Modal({children}) {
    return (
        <M>
            {children}
        </M>
    )
}
