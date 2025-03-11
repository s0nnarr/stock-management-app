import { useState, useRef, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { AuthContext } from '../context/authContext';
axios.defaults.withCredentials = true

export const useDelete = (route) => {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const errorTimeoutRef = useRef(null)
    const { dispatch } = useContext(AuthContext)

    const deleteData = async (params, func) => {
        setLoading(true)
        try {
            const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${route}`, { params })
            setData(res.data)
            //Update context
            if (route === 'user') dispatch({ type: 'LOGIN', payload: res.data })
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

    return { deleteData, data, error, loading }
}
