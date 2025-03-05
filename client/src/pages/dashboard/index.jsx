import React from 'react'
import { useFetch } from '../../hooks/useFetch';
import './index.css'

function Dashboard() {

    const { data: user, error: errorUser, loading: loadingUser, fetchData: fetchUser } = useFetch('user')

    return (
        loadingUser ?
            <div>
                Loading...
            </div> :
            <div>
                {
                    errorUser &&
                    <p className='signup_p_error'>
                        {errorUser}
                    </p>
                }
                <div className='dashboard-main'>
                    {user ? <h1>Hello {user[0].name}</h1> : <h1>No user...</h1>}
                </div >
            </div>
    )
}

export default Dashboard