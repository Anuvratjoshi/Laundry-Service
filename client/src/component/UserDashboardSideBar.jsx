import React from 'react'
import { LiaHomeSolid } from "react-icons/lia"
import { BsPlusCircle } from "react-icons/bs"
import { FaListUl } from "react-icons/fa"
import { BiLogOutCircle } from "react-icons/bi"
import { toast } from 'react-toastify'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const UserDashboardSideBar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()

    const logout = () => {
        localStorage.removeItem("userInfo")
        toast.success("Successfully Logged Out", {
            position: toast.POSITION.TOP_CENTER
        })
        dispatch({
            type: "loggedIn",
            payload: false
        })
        dispatch({
            type: "currentRoute",
            payload: "/"
        })
        dispatch({
            type: "userName",
            payload: ""
        })
        return navigate("/")
    }
    return (
        <div className=' text-white flex flex-col items-center gap-4 h-screen bg-[#5861AE] py-4'>
            <div className={`cursor-pointer h-16 items-center w-full flex justify-center ${location.pathname == "/dashboard" ? "bg-white text-blue-800" : ""} `}>
                <Link to="/dashboard"><LiaHomeSolid size={30} /></Link>
            </div>
            <div className={`cursor-pointer h-16 items-center w-full flex justify-center ${location.pathname == "/order" ? "bg-white text-blue-800" : ""} `}>
                <Link to="/order"><BsPlusCircle size={30} /></Link>
            </div>

            <div className={`cursor-pointer h-16 items-center w-full flex justify-center ${location.pathname == "/view-order" ? "bg-white text-blue-800" : ""} `}>
                <Link to="/view-order"><FaListUl size={30} /></Link>
            </div>
            <div
                onClick={() => logout()}
                className='cursor-pointer'><BiLogOutCircle size={30} /></div>
        </div>
    )
}

export default UserDashboardSideBar