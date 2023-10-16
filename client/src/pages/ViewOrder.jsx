import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineClose, AiOutlineEye } from 'react-icons/ai';
import { toast } from 'react-toastify';
import ReactLoading from "react-loading"
import { useNavigate } from 'react-router-dom';

const ViewOrder = () => {
    const [orderData, setOrderData] = useState([]);
    const [showSlidingBar, shouldShowSlidingBar] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState(null);
    const [popUp, showPopUp] = useState(false);
    const [cancelOrderId, setCancelOrderId] = useState("")
    const [initialLoading, showInitialLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const navigate = useNavigate()
    const popUpRef = useRef(null);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            fetch('https://localhost:8080/getAllOrder', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + userInfo.token,
                },
            })
                .then((res) => res.json())
                .then((result) => {
                    showInitialLoading(false)
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
                    } else {
                        setOrderData(result);
                        console.log(result);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    useEffect(() => {
        if (popUp) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popUp]);

    const handleClickOutside = (event) => {
        if (popUpRef.current && !popUpRef.current.contains(event.target)) {
            showPopUp(false);
        }
    };

    const viewSummary = (data) => {
        shouldShowSlidingBar(true);
        setAddress(data.shippingAddress);
        setOrderDetails(data.orderDetails);
        setPrice(data.totalPrice);
    };

    const cancelOrder = (data) => {
        showPopUp(true);
        setCancelOrderId(data._id)
    };

    const handleCancel = () => {
        showInitialLoading(true)
        showPopUp(false)
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        console.log(cancelOrderId);
        fetch("https://localhost:8080/cancelorder", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userInfo.token
            },
            body: JSON.stringify({ _id: cancelOrderId })
        })
            .then(res => res.json())
            .then(result => {
                showInitialLoading(false)
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
                    return navigate("/")
                }
                else {
                    toast.success("Order canceled successfully", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    setOrderData(result)
                }
            })
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orderData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (indexOfLastItem < orderData.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            {popUp && (
                <div
                    ref={popUpRef}
                    className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-50 p-6 rounded-lg shadow-md drop-shadow-lg h-48  font-Montserrat 
                    xxl:text-base xl:text-base lg:text-sm sm:text-xs es:text-xs xxl:w-96 xl:w-96 lg:w-80 md:w-80 sm:w-72 es:w-64 '
                >
                    <p className='font-semibold py-3 mb-4'>
                        Are you sure you want to cancel the order?
                    </p>
                    <div className='flex justify-end'>
                        <button onClick={handleCancel} className='px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'>
                            Confirm
                        </button>
                        <button
                            onClick={() => showPopUp(false)}
                            className='px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 focus:outline-none focus:shadow-outline-gray'
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {showSlidingBar && (
                <div className={`absolute w-3/4 bg-slate-100 h-full right-0 font-Montserrat`}>
                    <div
                        style={{ "width": "100%" }}
                        className='flex justify-between px-8 bg-[#5861AE] text-white font-semibold xxl:py-5 xl:py-5 lg:py-2 md:py-2 sm:py-2 es:py-2 xxl:w-96 xl:text-base lg:text-sm sm:text-xs es:text-xs'>
                        <h4>Summary</h4>
                        <AiOutlineClose
                            onClick={() => shouldShowSlidingBar(false)}
                            className='cursor-pointer'
                        />
                    </div>
                    <div className=' flex items-center px-8 bg-[#F4F9FF] border-2 justify-between xxl:py-6 xl:py-6 lg:py-2 md:py-2 sm:py-1 es:py-1'>
                        <div className='text-[#1B2734] xxl:text-base xl:text-base lg:text-sm md:text-xs sm:text-xs es:text-xs xxl:block xl:block lg:block md:block sm:hidden es:hidden'>
                            <h4 className='font-semibold'>Your Address:</h4>
                            <p className='font-light'>{address ? address : 'Loading...'}</p>
                        </div>
                        <div className='text-[#1B2734] xxl:text-base xl:text-base lg:text-sm md:text-xs sm:text-xs es:text-xs xxl:hidden xl:hidden lg:hidden md:hidden sm:block es:block'>
                            <h4 className='font-semibold'>Your Address:</h4>
                            <p className='font-light'>
                                {address ? address.slice(0, 22) + '...' : 'Loading...'}
                            </p>
                        </div>
                        <div
                            className='text-[#1B2734] xxl:text-base xl:text-base lg:text-sm md:text-xs sm:text-sm es:text-xs'>
                            <h4 className='font-semibold'>Phone</h4>
                            <p className='font-light'>9557115385</p>
                        </div>
                    </div>
                    <div className='px-8 py-4 border-b-2'>
                        <h4 className='font-semibold text-[#3B3737] xxl:text-lg xl:text-lg lg:text-sm md:text-sm sm:text-xs es:text-xs'>Order Details</h4>
                        {orderDetails.map((item, i) => (
                            <div key={i} className='grid grid-cols-4 xxl:py-3 xl:py-3 lg:py-3 md:py-3 sm:py-2 es:py-2 text-[#1B2734]'>
                                <div className='flex items-center font-semibold border-b-2 xxl:text-lg xl:text-lg lg:text-sm md:text-sm sm:text-xs es:text-xs'>{item.productName}</div>
                                <div className='flex items-center border-b-2 xxl:text-lg xl:text-lg lg:text-sm md:text-sm sm:text-xs es:text-[10px]'>{item.serviceType.join(', ')}</div>
                                <div className='font-semibold flex items-center  col-span-2 text-right border-b-2 '>
                                    <span className='w-1/2 font-normal xxl:text-right xl:text-right lg:text-right md:text-right sm:text-left es:text-left xxl:text-base xl:text-base lg:text-base md:text-sm sm:text-xs es:text-[10px]'>{`${item.price} X ${item.quantity} =`}</span>
                                    <span className='w-1/2 items-start text-center text-[#5861AE] xxl:text-lg xl:text-lg lg:text-base md:text-base sm:text-xs es:text-xs'>{`${item.totalPrice}`}</span>
                                </div>
                            </div>
                        ))}
                        <div className='grid grid-cols-4 py-2'>
                            <div></div>
                            <div></div>
                            <div className='flex items-center font-semibold col-span-2 text-right border-b-2'>
                                <span className='w-1/2 text-[#1B2734] xxl:text-lg xl:text-lg lg:text-base md:text-sm sm:text-sm es:text-[12px]'>Subtotal</span>
                                <span className='w-1/2 text-center xxl:text-lg xl:text-lg lg:text-base md:text-base sm:text-sm es:text-xs'>{price ? price - 90 : 'Calculating...'}</span>
                            </div>
                        </div>
                        <div className='grid grid-cols-4 py-2 text-right'>
                            <div></div>
                            <div></div>
                            <div className='flex items-center font-semibold col-span-2 border-b-2'>
                                <span className='w-1/2 text-[#1B2734] xxl:text-lg xl:text-lg lg:text-base md:text-sm sm:text-sm es:text-[12px]'>Pickup Charges</span>
                                <span className='w-1/2 text-center xxl:text-lg xl:text-lg lg:text-base md:text-base sm:text-sm es:text-xs'>90</span>
                            </div>
                        </div>
                        <div className='grid xxl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 es:grid-cols-1 xxl:py-2 xl:py-2 lg:py-2 md:py-2 sm:py-1 es:py-1 text-right bg-[#5861AE]'>
                            <div></div>
                            <div></div>
                            <div className='flex items-center col-span-2 font-semibold text-white text-lg'>
                                <span className='w-1/2 xxl:text-lg xl:text-lg lg:text-base md:text-sm sm:text-sm es:text-sm'>Total Price</span>
                                <span className='w-1/2 text-center xxl:text-lg xl:text-lg lg:text-base md:text-sm sm:text-sm es:text-sm'>₹ {price ? price : 'Calculating...'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {initialLoading ? (
                <div className='w-full h-[600px] flex justify-center items-center'>
                    <ReactLoading type='spin' height={30} width={30} color='blue' />
                </div>
            ) : (
                <>
                    <div className='font-Montserrat py-6'>
                        <div className='grid text-white bg-[#383737] px-2 py-4 xxl:grid-cols-8 xl:grid-cols-8 lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 es:grid-cols-4 xxl:text-sm xl:text-sm lg:text-sm md:text-sm sm:text-xs es:text-xs'>
                            <div>Order Id</div>
                            <div className='xxl:block xl:block lg:block md:block sm:hidden es:hidden'>Order Date & Time</div>
                            <div className='xxl:block xl:block lg:block md:hidden sm:hidden es:hidden'>Delivery Location</div>
                            <div className='text-center xxl:block xl:block lg:block md:hidden sm:hidden es:hidden'>Phone</div>
                            <div className='text-center xxl:block xl:block lg:block md:hidden sm:hidden es:hidden'>Price</div>
                            <div className='text-center'>Total Items</div>
                            <div className='text-center'>View</div>
                        </div>
                        <div>
                            {currentItems.map((item, i) => (
                                <div key={i} className='grid text-sm py-4 border-2 px-2 hover:bg-[#5861AE] hover:text-white hover:cursor-default hover:font-semibold
                        xxl:grid-cols-8 xl:grid-cols-8 lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 es:grid-cols-4  xxl:text-sm xl:text-sm lg:text-sm md:text-sm sm:text-xs es:text-xs'>
                                    <div>{item.orderId}</div>
                                    <div className='xxl:block xl:block lg:block md:block sm:hidden es:hidden'>{item.paymentTiming}</div>
                                    <div className='truncate xxl:block xl:block lg:block md:hidden sm:hidden es:hidden'>{item.shippingAddress}</div>
                                    <div className='text-center xxl:block xl:block lg:block md:hidden sm:hidden es:hidden'>{item.contactNumber}</div>
                                    <div className='text-center xxl:block xl:block lg:block md:hidden sm:hidden es:hidden'>₹{item.totalPrice}</div>
                                    <div className='text-center'>{item.orderDetails.length} </div>
                                    <div
                                        onClick={() => viewSummary(item)}
                                        className='flex justify-center cursor-pointer'><AiOutlineEye /></div>
                                    {item.status === "canceled" ? (
                                        <div className='text-red-500'>{item.status}</div>
                                    ) : (
                                        <div onClick={() => cancelOrder(item)} className='cursor-pointer'>Cancel Order</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handlePrevPage}
                            className={`px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100 focus:outline-none focus:shadow-outline-gray ${currentPage === 1 ? 'invisible' : ''
                                }`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNextPage}
                            className={`px-4 py-2 ${indexOfLastItem >= orderData.length
                                ? 'bg-slate-400 cursor-not-allowed'
                                : 'bg-blue-500'
                                } text-white rounded-md mr-2 ${indexOfLastItem >= orderData.length
                                    ? ''
                                    : 'hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'
                                }`}
                            disabled={indexOfLastItem >= orderData.length}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

        </>
    );
};

export default ViewOrder;
