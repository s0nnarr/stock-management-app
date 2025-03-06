import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import './index.css'
import Sidebar from '../../components/sidebar';

function Dashboard() {

    const { data: user, error: errorUser, loading: loadingUser, fetchData: fetchUser } = useFetch('user')

    return (
        loadingUser ?
            <div>
                Loading...
            </div> :
            <div>
                <Sidebar tab={'Dashboard'} />
                {
                    errorUser &&
                    <p className='signup-p-error'>
                        {errorUser}
                    </p>
                }
                <main className='dashboard-main'>
                    {user ? <h1>Hello {user[0].name}</h1> : <h1>No user...</h1>}
                </main >
            </div>
    )
}

export default Dashboard