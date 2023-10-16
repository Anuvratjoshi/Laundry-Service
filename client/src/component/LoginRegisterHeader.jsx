import React from 'react';
import Logo from "../assets/logo.png"
import { Link, useLocation } from 'react-router-dom';
const LoginRegisterHeader = () => {
    const location = useLocation()
    return (
        <div>
            <div className='flex xxl:justify-between xl:justify-between lg:justify-between md:justify-between sm:justify-center es:justify-center bg-[#FFFFFF]'>
                <div className='font-Montserrat font-bold text-2xl text-[#5861AE] h-20 flex items-center xxl:block xl:block lg:block md:block sm:hidden es:hidden'><img className='h-20' src={Logo} />
                </div>
                <div className='font-Montserrat text-[#5861AE] h-20  xxl:hidden xl:hidden lg:hidden md:hidden sm:block es:block'>
                    <img className='h-20 w-36' src={Logo} />
                </div>

                <div className='flex  text-sm font-Montserrat cursor-pointer'>
                    <div className='xxl:w-32 xl:w-32 lg:w-32 md:w-24 xxl:flex xxl:justify-center xxl:items-center xl:flex xl:justify-center xl:items-center lg:flex lg:justify-center lg:items-center md:flex md:justify-center md:items-center sm:hidden es:hidden border border-b-0 h-20 hover:bg-[#5861AE] hover:text-white'>Home</div>
                    <div className='xxl:w-32 xl:w-32 lg:w-32 md:w-24 xxl:flex xxl:justify-center xxl:items-center xl:flex xl:justify-center xl:items-center lg:flex lg:justify-center lg:items-center md:flex md:justify-center md:items-center sm:hidden es:hidden h-20 hover:bg-[#5861AE] hover:text-white flex justify-center items-center'>Pricing</div>
                    <div className='xxl:w-32 xl:w-32 lg:w-32 md:w-24 xxl:flex xxl:justify-center xxl:items-center xl:flex xl:justify-center xl:items-center lg:flex lg:justify-center lg:items-center md:flex md:justify-center md:items-center sm:hidden es:hidden border border-b-0 h-20 hover:bg-[#5861AE] hover:text-white flex justify-center items-center'>Career</div>
                    <Link to="/">
                        <div className={`xxl:w-32 xl:w-32 lg:w-32 md:w-24 xxl:flex xxl:justify-center xxl:items-center xl:flex xl:justify-center xl:items-center lg:flex lg:justify-center lg:items-center md:flex md:justify-center md:items-center sm:hidden es:hidden border border-b-0 h-20 hover:bg-[#5861AE] hover:text-white flex justify-center items-center ${location.pathname === "/" ? "bg-[#5861AE] text-white" : ""}`}>Signin</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginRegisterHeader;
