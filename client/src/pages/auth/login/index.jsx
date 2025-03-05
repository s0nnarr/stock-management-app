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
                <p className='signup_p_error'>
                    {error}
                </p>
            }
            <div className='signup_div_main'>
                <div className='signup_div_signup'>
                    <h1 className='signup_p_title'>Log in</h1>
                    <input placeholder='Email' onChange={e => { setEmail(e.target.value) }} />
                    <input type='password' placeholder='Password' onChange={e => { setPassword(e.target.value) }} />
                    <button disabled={loading} onClick={() => loginUser({ email, password }, () => navigate('/'))}>Continue</button>
                    <a href='/signup'>Don't have an account</a>
                </div>
            </div>
        </>
    )
}

export default Login