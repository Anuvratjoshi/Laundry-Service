import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactLoading from "react-loading"

export const AddNewAddress = () => {
    const [address, setAddress] = useState("")
    const [loading, showLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        showLoading(true)
        fetch("https://localhost:8080/addNewAddress", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userInfo.token
            },
            body: JSON.stringify({ address })
        }).then(res => res.json())
            .then(result => {
                showLoading(false)
                if (result.error) {
                    toast.error(result.error, {
                        position: toast.POSITION.TOP_CENTER,
                    });
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
                toast.success(result.message, {
                    position: toast.POSITION.TOP_CENTER
                })
                return navigate("/order")
            })
    }
    return (
        <div className="flex justify-center items-center h-3/4 font-Montserrat">
            <form
                onSubmit={handleSubmit}
                className="w-1/3 bg-white p-6 shadow-xl drop-shadow-2xl rounded-md">
                <h2 className="text-3xl font-bold mb-4">Enter Your New Address</h2>
                <div className="mb-4">
                    <label htmlFor="address" className="text-lg font-semibold mb-2 block">Address:</label>
                    <textarea
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Type your address here..."
                        value={address}
                    ></textarea>
                </div>
                <div className='flex justify-between'>
                    {!loading ? (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Save Address
                        </button>
                    ) : (
                        <div
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-[132px] flex justify-center items-center"
                        >
                            <ReactLoading type='spin' color='blue' height={20} width={20} />
                        </div>
                    )
                    }


                    <Link to="/order">
                        <button
                            disabled={loading ? true : false}
                            className={` text-white px-4 py-2 rounded-md ${loading ? "bg-slate-400 cursor-not-allowed" : "hover:bg-blue-600 bg-blue-500 focus:outline-none focus:ring focus:border-blue-300`"} `}>
                            Go back
                        </button>
                    </Link>
                </div>

            </form>
        </div>
    );
};
