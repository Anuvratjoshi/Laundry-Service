import React from 'react'
import UserDashboardHeader from '../component/userDashboardHeader'
import UserDashboardSideBar from '../component/UserDashboardSideBar'
import UserDashboardFooter from '../component/UserDashboardFooter'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div>
      <div>
        <UserDashboardHeader />
      </div>
      <div className='flex h-screen'>
        <div className='xxl:w-[5%] xl:w-[5%] lg:w-[5%] md:w-[10%] sm:w-[10%] es:w-[15%]'>
          <UserDashboardSideBar />
        </div>
        <div className='xxl:w-px-8 xl:w-px-8 lg:w-px-8 md:px-8 sm:px-2 es:px-2 xxl:w-[95%] xl:w-[95%] lg:w-[95%] md:w-[90%] sm:w-[90%] es:w-[85%]'>
          <Outlet />
        </div>
      </div>
      <div>
        <UserDashboardFooter />
      </div>
    </div>
  )
}

export default DashboardLayout