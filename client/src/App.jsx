import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Inventory from './pages/inventory'
import Orders from './pages/orders'
import Company from './pages/company'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import Myaccount from './pages/myaccount'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/myaccount' element={<Myaccount />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/company' element={<Company />} />
      </Routes>
    </>
  )
}

export default App
