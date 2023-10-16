import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const UserDashboardHeader = () => {
    const location = useLocation();
    const { name } = useSelector(state => state.user)

    return (
        <div>
            <nav className='flex justify-between items-center border h-16 font-Montserrat'>
                <div className='flex justify-center items-center h-16 px-6 font-semibold text-xl text-[#5861AE]'>
                    <p>Laundry</p>
                </div>
                <div className='flex justify-between text-sm'>
                    <Link to="/pricing">
                        <p className={`border h-16 px-6 xxl:flex xl:flex lg:flex md:flex xxl:justify-center xl:justify-center lg:justify-center md:justify-center xxl:items-center xl:items-center lg:items-center md:items-center
                            sm:hidden es:hidden ${location.pathname === "/pricing" ? "bg-[#5861AE] text-white" : ""}`}>
                            Pricing
                        </p>
                    </Link>

                    <div>
                        <Link to="/career">
                            <p className={`border flex justify-center items-center h-16 px-6 xxl:flex xl:flex lg:flex md:flex xxl:justify-center xl:justify-center lg:justify-center md:justify-center xxl:items-center xl:items-center lg:items-center md:items-center
                                sm:hidden es:hidden ${location.pathname === "/career" ? "bg-[#5861AE] text-white" : ""}`}>
                                Career
                            </p>
                        </Link>
                    </div>

                    <div>
                        <Link to="/dashboard">
                            <div className={`border flex justify-center items-center h-16 px-6 ${location.pathname === "/dashboard" ? "bg-[#5861AE] text-white" : ""} `}>
                                {name ? name : "User Name"}
                            </div>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default UserDashboardHeader;
