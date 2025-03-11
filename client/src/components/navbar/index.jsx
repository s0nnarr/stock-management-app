import React, { useState } from 'react'
import './index.css'
import { AiOutlineBell } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import Dropdown from '../Dropdown';
import { usePost } from '../../hooks/usePost'
import { useNavigate } from "react-router-dom";

function Navbar() {

    const { postData: signoutUser, data, error, loading } = usePost('user/signout')

    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [dropmenu, setDropMenu] = useState(false)

    return (
        <nav className='navbar-nav'>
            <input className='navbar-input-search' placeholder='Search' />
            <div className='navbar-div-icons'>
                {user && <p>{user.email}</p>}
                <AiOutlineBell size={'1.7rem'} />
                <div className='navbar-div-user'>
                    <AiOutlineUser size={'1.7rem'} onClick={e => { setDropMenu(!dropmenu); }} />
                    <Dropdown menuOptions={[
                        {
                            option: 'My account',
                            func: () => navigate('/myaccount')
                        },
                        {
                            option: 'Logout',
                            func: () => signoutUser(undefined, () => navigate('/login'))
                        }
                    ]}
                        parentState={value => setDropMenu(value)}
                        displayMenu={dropmenu}
                    />
                </div>
            </div>
        </nav>
    )
}

export default Navbar