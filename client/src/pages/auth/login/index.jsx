import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { usePost } from '../../../hooks/usePost'

function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const { postData: loginUser, data, error, loading } = usePost('user/login')

    return (
        <>
            {
                error &&
                <p className='signup-p-error'>
                    {error}
                </p>
            }
            <main className='signup-main'>
                <div className='signup-div-wrapper'>
                    <p className='signup-p-title'>Log in</p>
                    <input placeholder='Email' onChange={e => { setEmail(e.target.value) }} />
                    <input type='password' placeholder='Password' onChange={e => { setPassword(e.target.value) }} />
                    <button disabled={loading} onClick={() => loginUser({ email, password }, () => navigate('/'))}>Continue</button>
                    <a href='/signup'>Don't have an account</a>
                </div>
            </main>
        </>
    )
}

export default Login