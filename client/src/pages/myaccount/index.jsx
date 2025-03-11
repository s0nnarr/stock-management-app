import React, { useContext, useState } from 'react'
import './index.css'
import { AuthContext } from '../../context/authContext';
import { useFetch } from '../../hooks/useFetch'
import { usePost } from '../../hooks/usePost'
import { useNavigate } from 'react-router-dom'
import { usePut } from '../../hooks/usePut';
import { useDelete } from '../../hooks/useDelete';

function Myaccount() {

    const { postData: signoutUser, error: errorSignout, loading: loadingSignout } = usePost('user/signout')
    const { data: companies, error: errorCompanies, loading: loadingCompanies, fetchData: fetchCompanies } = useFetch('user/companies')
    const { putData: putUser, error: errorUserUpdate, loading: loadingUserUpdate } = usePut('user')
    const { deleteData: deleteCompany, error: errorCompanyDelete, loading: loadingCompanyDelete } = useDelete('company')
    const { postData: postCompany, error: errorCompanyPost, loading: loadingCompanyPost } = usePost('company')

    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    const [menu, setMenu] = useState('companies')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [currency, setCurrency] = useState('')

    const handleAddCompany = async (e) => {
        e.preventDefault()
        await postCompany({ name, address, phone, currency }, () => fetchCompanies())
        setMenu('companies')
    }

    return (
        loadingSignout || loadingCompanies || loadingUserUpdate || loadingCompanyDelete || loadingCompanyPost ?
            <div>
                Loading...
            </div> :
            <>
                {
                    errorSignout || errorCompanies || errorUserUpdate || errorCompanyDelete || errorCompanyPost &&
                    <p className='signup-p-error'>
                        {errorSignout}
                        {errorCompanies}
                        {errorUserUpdate}
                        {errorCompanyDelete}
                        {errorCompanyPost}
                    </p>
                }
                <div className='myaccount-div-center'>
                    {user && <div className='myaccount-div-wrapper'>
                        <h1>Hello {user.name}!</h1>
                        <div className='myaccount-div-menu'>
                            <ol>
                                <li onClick={() => setMenu('companies')}>Companies</li>
                                <li onClick={() => setMenu('add company')}>Add company</li>
                                <li onClick={() => signoutUser(undefined, () => navigate('/login'))}>Sign out</li>
                            </ol>
                        </div>
                        {companies &&
                            <div className='myaccount-div-companies' style={{ display: menu !== 'companies' && 'none' }}>
                                {companies.map((company) =>
                                    <div className='myaccount-div-company'>
                                        <p onClick={() => putUser({ currentCompany: company.id }, () => navigate('/'))}>
                                            {company.id.name}
                                        </p>
                                        <button onClick={() => deleteCompany({ id: company.id._id }, () => fetchCompanies())}>
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>}
                        <div className='myaccount-div-addCompany' style={{ display: menu !== 'add company' && 'none' }}>
                            <form onSubmit={handleAddCompany}>
                                <input placeholder='Name' onChange={(e) => setName(e.target.value)} />
                                <input placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
                                <input placeholder='Phone' onChange={(e) => setPhone(e.target.value)} />
                                <input placeholder='Currency' onChange={(e) => setCurrency(e.target.value)} />
                                <button disabled={loadingCompanyPost}>Add</button>
                            </form>
                        </div>
                    </div>}
                </div >
            </>
    )
}

export default Myaccount