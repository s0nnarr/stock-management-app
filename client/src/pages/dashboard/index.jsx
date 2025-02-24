import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import './index.css'

function Dashboard() {

    const { data: user, loading: loadingUser, fetchData: fetchUser } = useFetch('user')

    return (
        <div className='dashboard-main'>
            {user ? <h1>Hello {user[0].name}</h1> : <h1>Loading...</h1>}
        </div >
    )
}

export default Dashboard