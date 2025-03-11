import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { usePost } from '../../../hooks/usePost'

function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const { postData: loginUser, data, error, loading } = usePost('user/login')

    const handleLogin = async (e) => {
        e.preventDefault()
        await loginUser({ email, password }, () => navigate('/myaccount'))
    }

    return (
        <>
            {
                error &&
                <p className='signup-p-error'>
                    {error}
                </p>
            }
            <form className='signup-form' onSubmit={handleLogin}>
                <div className='signup-div-wrapper'>
                    <p className='signup-p-title'>Log in</p>
                    <input placeholder='Email' onChange={e => { setEmail(e.target.value) }} />
                    <input type='password' placeholder='Password' onChange={e => { setPassword(e.target.value) }} />
                    <button disabled={loading}>Continue</button>
                    <a href='/signup'>Don't have an account</a>
                </div>
            </form>
        </>
    )
}

export default Login