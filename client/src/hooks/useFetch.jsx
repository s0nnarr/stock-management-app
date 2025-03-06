import { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'
axios.defaults.withCredentials = true

export const useFetch = (route) => {

    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const errorTimeoutRef = useRef(null)

    const fetchData = async (params, func) => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${route}`, params)
            setData(res.data)
            if (func) func()
        } catch (error) {
            console.log(error)
            if (error.response?.data.error === 'ExpiredRefreshToken' || error.response?.data.error === 'Invalid Token') {
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

    useEffect(() => {
        fetchData()
    }, [route])

    return { fetchData, data, error, loading }
}