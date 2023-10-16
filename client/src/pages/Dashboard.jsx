import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ReactLoading from "react-loading"

const Dashboard = () => {
    const [totalUser, setTotalUser] = useState(0)
    const [showLoading, shouldShowLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        if (userInfo) {
            fetch("https://localhost:8080/getTotalOrder", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + userInfo.token
                },
            })
                .then(res => res.json())
                .then(result => {
                    shouldShowLoading(false)
                    if (result.error) {
                        toast.error(result.error, {
                            position: toast.POSITION.TOP_CENTER
                        })
                        localStorage.removeItem("userInfo")
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
                    return setTotalUser(result ? result : 0)
                })
        }

    })
    return (
        <div >
            {showLoading ? (
                <div className='w-full h-[600px] flex justify-center items-center'>
                    <ReactLoading type='spin' color='blue' height={30} width={30} />
                </div>
            ) : (
                <>
                    <h3 className='py-6 font-bold text-[#1E2022] text-lg'>Orders | {totalUser}</h3>
                    <div className='flex  flex-col gap-3 justify-center items-center h-96'>
                        <p className='text-[#222B45] font-light'>{totalUser ? "Create more order" : "No orders avaialble"}</p>
                        <Link to="/order">
                            <button className='border-2 border-[#5861AE] px-4 py-1 hover:bg-[#5861AE] hover:text-white '>Create</button>
                        </Link>
                    </div>
                </>
            )
            }

        </div>
    )
}

export default Dashboard