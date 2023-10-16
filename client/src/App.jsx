import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import LoginRegisterLayout from './layout/LoginRegisterLayout'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from './layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Order from './pages/Order'
import { AddNewAddress } from './pages/AddNewAddress'
import ViewOrder from './pages/ViewOrder'
import Pricing from './pages/Pricing'
import Career from './pages/Career'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Routing = () => {
  const navigate = useNavigate()
  const { isLoggedIn, route } = useSelector(state => state.user)


  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo")
    if (!userInfo && !isLoggedIn || !userInfo) {
      return navigate("/")
    }
    else {
      return navigate(route)
    }
  }, [])

  return <Routes>
    <Route path='/' element={<LoginRegisterLayout />}>
      <Route index path='/' element={<UserLogin />} />
      <Route index path='/user-register' element={<UserRegister />} />
    </Route>
    <Route path="/" element={<DashboardLayout />} >
      <Route index path='/dashboard' element={<Dashboard />} />
      <Route index path='/order' element={<Order />} />
      <Route index path='/add-new-address' element={<AddNewAddress />} />
      <Route index path='/view-order' element={<ViewOrder />} />
      <Route index path='/pricing' element={<Pricing />} />
      <Route index path='/career' element={<Career />} />
    </Route>
  </Routes>
}

function App() {

  return (
    <BrowserRouter>
      <Routing />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
