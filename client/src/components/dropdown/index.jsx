import React, { useRef, useEffect, useState } from 'react'
import './index.css'

function Dropdown({ displayMenu, parentState, menuOptions }) {

    const dropmenuRef = useRef()

    //Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!dropmenuRef.current.contains(e.target)) {
                parentState(false)
            }
        }
        if (displayMenu) document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [displayMenu])

    return (
        <menu ref={dropmenuRef} className='dropdown-menu' style={{ display: displayMenu && 'flex' }}>
            <ul>
                {menuOptions.map(item =>
                    item && <li key={item.option} onClick={e => item.func()}>{item.option}</li>
                )}
            </ul>
        </menu>
    )
}

export default Dropdown