import { createContext, useReducer, useEffect, Children } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'SIGNOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    const location = useLocation();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/${'user/current'}`)
                if (location.pathname !== '/myaccount' && !res.data.currentCompany) {
                    window.location.replace(`${import.meta.env.VITE_REACT_APP_FRONTEND_URL}/${'myaccount'}`)
                }
                dispatch({ type: 'LOGIN', payload: res.data })
            } catch (error) {
                if (error.response?.data.error === 'ExpiredRefreshToken' || error.response?.data.error === 'Invalid Token') {
                    window.location.replace(`${import.meta.env.VITE_REACT_APP_FRONTEND_URL}/${'login'}`)
                }
                else {
                    console.log('Context error', error)
                }
            }
        }
        if (location.pathname !== '/login' && location.pathname !== '/signup') fetchUser()
    }, [])


    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}