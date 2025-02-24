import { useState } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'
axios.defaults.withCredentials = true

export const usePost = (route) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const postData = async (data, func) => {
        setLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/${route}`, data)
            console.log(res.status)
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

    return { postData, loading }
}