import React, { useContext } from 'react'
import './index.css'
import { AuthContext } from '../../context/authContext';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import { useFetch } from '../../hooks/useFetch';

function Dashboard() {

    const { user } = useContext(AuthContext)

    return (
        <div>
            <Sidebar tab={'Dashboard'} />
            <Navbar />
            <main className='dashboard-main'>
                {user ? <h1>Welcome to {user.currentCompany.name}</h1> : <h1>No user...</h1>}
            </main >
        </div>
    )
}

export default Dashboard