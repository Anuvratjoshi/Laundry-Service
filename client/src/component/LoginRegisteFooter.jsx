import React from 'react'
import fb from "../assets/facebook.svg"
import Insta from "../assets/instagram.svg"
import LinkedIn from "../assets/linkedin.svg"
import { AiOutlineCopyright } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
const LoginRegisteFooter = () => {

    const handleClick = (type) => {
        toast.warn(`Login to see the ${type} page`, {
            position: toast.POSITION.TOP_CENTER
        })
    }
    return (
        <div>
            <div className='text-center font-Montserrat bg-[#F8F9FF] border-t-2 border-b-[#0000000B] border-b-4 p-5 border-[#5861AE]'>
                <p className='text-[#5861AE] font-semibold xxl:text-3xl xl:text-3xl lg:text-3xl md:text-2xl sm:text-lg es:text-sm'>Now Refer & Earn ₹500 for every referral*</p>
                <p className='text-xs'>* Terms and conditions will be applied</p>
            </div>
            <div className='py-4 flex justify-between text-[#182838] font-semibold font-Montserrat xxl:text-base xl:text-base lg:text-base md:text-base sm:text-xs es:text-xs px-3'>
                <div className='w-1/4'>
                    <div>ABOUT US</div>
                    <div className='text-[#3D3D43] font-light py-2'>Doorstep Wash & Dryclean Service</div>
                </div>
                <div>
                    <div>Home</div>
                    <Link to="/">
                        <div className='text-[#3D3D43] font-light py-2'>Sign In</div>
                    </Link>
                    <Link to="/user-register">
                        <div className='text-[#3D3D43] font-light py-2'>Register</div>
                    </Link>
                </div>
                <div
                    className='cursor-pointer'
                    onClick={() => handleClick("pricing")} >Pricing</div>
                <div className='xxl:block xl:block lg:block md:block sm:hidden es:hidden'>
                    <div
                        className='cursor-pointer'
                        onClick={() => handleClick("career")}>Career</div>
                    <div className='text-[#3D3D43] font-light py-2'>Blogs</div>
                    <div className='text-[#3D3D43] font-light py-2'>Create</div>
                </div>
                <div>Contact</div>
                <div>
                    <div>Social Media</div>
                    <div className='flex xxl:gap-4 xl:gap-4 lg:gap-4 md:gap-3 sm:gap-2 es:gap-2 py-2 cursor-pointer '>
                        <div className='h-4 w-4'><img src={fb} /></div>
                        <div className='h-4 w-4'><img src={Insta} /></div>
                        <div className='h-4 w-4'><img src={LinkedIn} /></div>
                    </div>
                </div>
            </div>
            <div className=' bg-[#212f3e] text-white flex gap-2 justify-center items-center py-2 font-light text-sm'>
                <span>2023</span>
                <span><AiOutlineCopyright /></span>
                <span>Laundry</span>
            </div>
        </div>
    )
}

export default LoginRegisteFooter