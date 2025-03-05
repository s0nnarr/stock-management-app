import { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
axios.defaults.withCredentials = true

export const usePost = (route) => {
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const errorTimeoutRef = useRef(null)

    const postData = async (data, func) => {
        setLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${route}`, data)
            setData(res.data)
            if (func) func()
        } catch (error) {
            console.log(error)
            if (error.response?.data?.error === 'ExpiredRefreshToken') {
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

    return { postData, data, error, loading }
}
