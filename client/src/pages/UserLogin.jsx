import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiLockPasswordLine } from "react-icons/ri"
import { toast } from 'react-toastify';
import ReactLoading from "react-loading"
import { useDispatch } from 'react-redux';
const UserLogin = () => {
    const [passwordType, showPassWordType] = useState("password")
    const [loginId, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, showLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        showLoading(true)
        fetch("https://localhost:8080/user-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ loginId, password })
        })
            .then(res => res.json())
            .then(result => {
                showLoading(false)
                if (result.error) {
                    return toast.error(result.error, {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
                localStorage.setItem("userInfo", JSON.stringify(result))
                toast.success(result.message, {
                    position: toast.POSITION.TOP_CENTER
                })
                dispatch({
                    type: "loggedIn",
                    payload: true
                })
                dispatch({
                    type: "currentRoute",
                    payload: "/dashboard"
                })
                dispatch({
                    type: "userName",
                    payload: result.name
                })
                return navigate("/dashboard")
            })
    }
    return (
        <div className='flex justify-between'>
            <div className='xxl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 py-36  xxl:block xl:block lg:block md:block sm:hidden es:hidden  bg-[#c2b9b90f] border-2 border-[#c2b9b90f]'>
                <div className='flex justify-center'>


                    <div className='font-Montserrat font-bold text-[#5861AE] px-6'>
                        <div className='text-7xl'>Laundry</div>
                        <div className='text-7xl mt-4'>Service</div>
                        <div className='text-[#565657] mt-5 text-sm'>
                            Doorstep Wash & Dryclean Service
                        </div>
                        <div className='text-[#565657] mt-11 text-xs'>Don't Have An Account?</div>
                        <div className='text-[#4552C1] mt-3'>
                            <Link to="/user-register">
                                <button className='border border-[#4552C1] w-28 h-10 rounded-sm hover:bg-[#5861AE] hover:text-white'>
                                    <span className='text-xs'>Register</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='xxl:w-1/2 xl:w-1/2 lg:w-1/2 md:w-full es:w-full sm:w-full bg-[#B9C0FD1A] border-2 border-[#B9C0FD1A] border-l-0'>

                <div className='py-36 px-10 font-Montserrat'>
                    <div className='text-3xl text-[#4552C1] font-bold'>SIGN IN</div>
                    <form onSubmit={submitHandler} className='es:w-full sm:w-full'>
                        <div className='py-4'>
                            <label className='block text-[#5861AE] text-sm'>Mobile / Email</label>
                            <input
                                onChange={e => setEmail(e.target.value)}
                                value={loginId}
                                required type='text' className='bg-transparent border-b-2 border-[#5861AE] w-full p-2 focus:outline-none' placeholder='johndoe@gmail.com' />
                        </div>
                        <div className='py-4'>

                            <label className='block text-[#5861AE] text-sm'>Password</label>
                            <span
                                onClick={() => showPassWordType(passwordType == "text" ? "password" : "text")}
                                className='flex justify-end cursor-pointer'>
                                <RiLockPasswordLine className='h-6 w-6 relative top-6' />

                            </span>
                            <input
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                required type={`${passwordType}`} className={`bg-transparent border-b-2 border-[#5861AE] w-full p-2 focus:outline-none`} placeholder='*****' />
                        </div>
                        <div className='text-right text-sm text-[#4552C1]'>Forgot Password ?</div>
                        <div className=' text-center mt-10'>
                            <button
                                disabled={loading ? true : false}
                                type='submit' className={`w-24 py-2 text-sm rounded-sm text-white  ${loading ? "bg-[#6d74b1] cursor-not-allowed" : "bg-[#4552C1]"}`}>
                                {loading ? <span className='flex w-full justify-center'>
                                    <ReactLoading type='spin' height={18} width={18} />
                                </span> : "Sign in"}
                            </button>
                        </div>
                        <Link to="/user-register">
                            <div className='mt-4 text-center text-blue-700 text-xs xxl:hidden xl:hidden lg:hidden md:hidden sm:block es:block'>Don't Have An Account?</div>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;
