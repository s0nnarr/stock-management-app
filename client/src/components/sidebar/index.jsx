import React from 'react'
import './index.css'

function Sidebar({ tab }) {
    return (
        <nav className='sidebar-nav'>
            <h1 className='sidebar-h1-logo'>IMSoft</h1>
            <ul className='sidebar-ul-tabs'>
                <li><a style={{ fontWeight: tab === 'Dashboard' && 600 }} href='/'>Dashboard</a></li>
                <li><a style={{ fontWeight: tab === 'Inventory' && 600 }} href='inventory'>Inventory</a></li>
                <li><a style={{ fontWeight: tab === 'Orders' && 600 }} href='orders'>Orders</a></li>
                <li><a style={{ fontWeight: tab === 'Company' && 600 }} href='company'>Company</a></li>
            </ul>
        </nav >
    )
}

export default Sidebar