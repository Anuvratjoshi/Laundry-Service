import React from 'react'
import { AiOutlineCopyright } from 'react-icons/ai'

const UserDashboardFooter = () => {
    return (
        <div className=' bg-[#212f3e] text-white flex gap-2 justify-center items-center py-2 font-light text-sm'>
            <span>2023</span>
            <span><AiOutlineCopyright /></span>
            <span>Laundry</span>
        </div>
    )
}

export default UserDashboardFooter