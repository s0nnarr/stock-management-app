import { useState, useRef, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { AuthContext } from '../context/authContext';
axios.defaults.withCredentials = true

export const usePut = (route) => {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const errorTimeoutRef = useRef(null)
    const { dispatch } = useContext(AuthContext)

    const putData = async (data, func, params) => {
        setLoading(true)
        try {
            const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${route}`, data, params)
            setData(res.data)
            //Update context
            if (route === 'user' || route === 'user/login') dispatch({ type: 'LOGIN', payload: res.data })
            if (route === 'user/signout') dispatch({ type: 'SIGNOUT' })
            //Follow-up function
            if (func) func()
        } catch (error) {
            console.log(error)
            if (error.response?.data?.error === 'ExpiredRefreshToken' || error.response?.data.error === 'Invalid Token') {
                navigate('/login')
            } else {
                setError(error.response?.data?.error || "An error occurred")
                //Clear previous timeout if exists
                if (errorTimeoutRef.current) {
                    clearTimeout(errorTimeoutRef.current)
                }
                errorTimeoutRef.current = setTimeout(() => {
                    setError(null)
                }, 8000)
            }
        } finally {
            setLoading(false)
        }
    }

    return { putData, data, error, loading }
}
