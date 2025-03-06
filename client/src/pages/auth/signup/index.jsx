import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { usePost } from '../../../hooks/usePost'
import './index.css'

function Signup() {

    const navigate = useNavigate()
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const { postData: postUser, data, error, loading } = usePost('user')

    return (
        <>
            {
                error &&
                <p className='signup-p-error'>
                    {error}
                </p>
            }
            <div className='signup-main'>
                <div className='signup-div-wrapper'>
                    <p className='signup-p-title'>Sign up</p>
                    <input placeholder='Full name' onChange={e => setName(e.target.value)} />
                    <input placeholder='Email' onChange={e => setEmail(e.target.value)} />
                    <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                    <button disabled={loading} onClick={() => postUser({ name, email, password }, () => navigate('/'))}>Create account</button>
                    <a href='/login'>Already have an account</a>
                </div>
            </div>
        </>
    )
}

export default Signup