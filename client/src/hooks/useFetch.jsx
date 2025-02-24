import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'
axios.defaults.withCredentials = true

export const useFetch = (route) => {

    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchData = async (params, func) => {
        setLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${route}`, params)
            setData(res.data)
            if (func) func()
        } catch (error) {
            console.log(error)
            if (error.response.data.error === 'ExpiredRefreshToken') {
                navigate('/login')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [route])

    return { data, loading, fetchData }
}