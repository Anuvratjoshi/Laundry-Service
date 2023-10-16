import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import washingMachine from '../assets/washing-machine.svg';
import washingMachineColored from '../assets/washing-machine-2.svg';
import ironColored from '../assets/ironing-2.svg';
import bleachColored from '../assets/bleach-2.svg';
import bleach from '../assets/bleach.svg';
import ironing from '../assets/ironing.svg';
import tshirtImage from "../assets/tshirt.webp"
import shirtImage from "../assets/shirt.png"
import suitImage from "../assets/suit.png"
import joggersImage from "../assets/joggers.jpg"
import boxersImage from "../assets/boxers.png"
import jeansImage from "../assets/jeans.jpg"
import pantsImage from "../assets/pants.jpg"
import { toast } from 'react-toastify';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import ReactLoading from "react-loading"
import { useDispatch } from 'react-redux';
// import { orderData, shippingAddress } from "../store/slices/userSlice"

const Order = () => {
    const [productArray, setProductArray] = useState([
        { productImage: shirtImage, productName: 'Shirt', price: [10, 20, 30, 40], productDescription: 'A classic cotton shirt for everyday wear.' },
        { productImage: tshirtImage, productName: 'TShirt', price: [100, 200, 300, 400], productDescription: 'Comfortable and stylish T-shirt for casual occasions.' },
        { productImage: pantsImage, productName: 'Pants', price: [10, 20, 30, 40], productDescription: 'Versatile pants suitable for various occasions.' },
        { productImage: jeansImage, productName: 'Jeans', price: [10, 20, 30, 40], productDescription: 'Durable and fashionable denim jeans.' },
        { productImage: boxersImage, productName: 'Boxers', price: [10, 20, 30, 40], productDescription: 'Soft and breathable boxers for everyday comfort.' },
        { productImage: joggersImage, productName: 'Joggers', price: [10, 20, 30, 40], productDescription: 'Casual joggers perfect for lounging or light activities.' },
        { productImage: suitImage, productName: 'Suit', price: [10, 20, 30, 40], productDescription: 'Elegant suit for formal occasions and events.' },
    ]);
    const [loading, showLoading] = useState(true)
    const [addressArray, setAddressArray] = useState([])
    const [showSlidingBar, shouldShowSlidingBar] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
    const [address, setAddress] = useState("")
    const [backgroundIndex, setBackGroundIndex] = useState(0)
    const [confirmLoading, showConfirmOrderLoading] = useState(false)
    const navigate = useNavigate()

    const initialState = {
        quantity: '',
        price: 0,
        services: [],
    };

    const [shirt, setShirt] = useState({ ...initialState });
    const [tShirt, setTShirt] = useState({ ...initialState });
    const [pants, setPants] = useState({ ...initialState });
    const [Jeans, setJeans] = useState({ ...initialState });
    const [Boxers, setBoxers] = useState({ ...initialState });
    const [Joggers, setJoggers] = useState({ ...initialState });
    const [Suit, setSuit] = useState({ ...initialState });

    useEffect(() => {

        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        if (userInfo) {
            fetch("https://localhost:8080/getAddress", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + userInfo.token
                },
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
                    else {
                        console.log(result);
                        setAddressArray(result)
                    }
                })
        }

    }, [backgroundIndex])

    const calculatePrice = (productName, value) => {
        switch (productName) {
            case 'Shirt':
                setShirt((prev) => ({ ...prev, quantity: value }));
                break;
            case 'TShirt':
                setTShirt((prev) => ({ ...prev, quantity: value }));
                break;
            case 'Pants':
                setPants((prev) => ({ ...prev, quantity: value }));
                break;
            case 'Jeans':
                setJeans((prev) => ({ ...prev, quantity: value }));
                break;
            case 'Boxers':
                setBoxers((prev) => ({ ...prev, quantity: value }));
                break;
            case 'Joggers':
                setJoggers((prev) => ({ ...prev, quantity: value }));
                break;
            case 'Suit':
                setSuit((prev) => ({ ...prev, quantity: value }));
                break;
            default:
                break;
        }
    };

    const handleServiceClick = (productName, serviceIndex, price) => {
        const handleService = (prev) => {
            const updatedServices = [...prev.services];
            const serviceIndexInArray = updatedServices.indexOf(serviceIndex);

            if (serviceIndexInArray !== -1) {
                updatedServices.splice(serviceIndexInArray, 1);
            } else {
                updatedServices.push(serviceIndex);
            }

            return {
                ...prev,
                services: updatedServices,
                price: prev.price + (serviceIndexInArray !== -1 ? -price : price),
            };
        };

        switch (productName) {
            case 'Shirt':
                setShirt((prev) => handleService(prev));
                break;
            case 'TShirt':
                setTShirt((prev) => handleService(prev));
                break;
            case 'Pants':
                setPants((prev) => handleService(prev));
                break;
            case 'Jeans':
                setJeans((prev) => handleService(prev));
                break;
            case 'Boxers':
                setBoxers((prev) => handleService(prev));
                break;
            case 'Joggers':
                setJoggers((prev) => handleService(prev));
                break;
            case 'Suit':
                setSuit((prev) => handleService(prev));
                break;
            default:
                break;
        }
    };

    const handleReset = (productName) => {
        switch (productName) {
            case 'Shirt':
                setShirt({ ...initialState, quantity: '' });
                break;
            case 'TShirt':
                setTShirt({ ...initialState, quantity: '' });
                break;
            case 'Pants':
                setPants({ ...initialState, quantity: '' });
                break;
            case 'Jeans':
                setJeans({ ...initialState, quantity: '' });
                break;
            case 'Boxers':
                setBoxers({ ...initialState, quantity: '' });
                break;
            case 'Joggers':
                setJoggers({ ...initialState, quantity: '' });
                break;
            case 'Suit':
                setSuit({ ...initialState, quantity: '' });
                break;
            default:
                break;
        }
    };


    const handleProceed = () => {
        const selectedItems = [];
        const addSelectedItems = (productName, services, price, quantity) => {
            if (quantity !== '' && services.length > 0) {
                selectedItems.push({
                    productName: productName,
                    serviceType: services.map((index) => {
                        if (index === 0) return 'washing';
                        if (index === 1) return 'ironing';
                        if (index === 2) return 'bleach';
                        return '';
                    }),
                    price: price,
                    quantity: parseInt(quantity),
                    totalPrice: quantity * price,
                });
            }
        };

        addSelectedItems('Shirt', shirt.services, shirt.price, shirt.quantity);
        addSelectedItems('TShirt', tShirt.services, tShirt.price, tShirt.quantity);
        addSelectedItems('Pants', pants.services, pants.price, pants.quantity);
        addSelectedItems('Jeans', Jeans.services, Jeans.price, Jeans.quantity);
        addSelectedItems('Boxers', Boxers.services, Boxers.price, Boxers.quantity);
        addSelectedItems('Joggers', Joggers.services, Joggers.price, Joggers.quantity);
        addSelectedItems('Suit', Suit.services, Suit.price, Suit.quantity);

        if (!selectedItems.length) {
            return toast.warn("Please choose the quantity and wash type to proceed.", {
                position: toast.POSITION.TOP_CENTER
            });
        } else {
            if (selectedItems.length > 4) {
                return toast.warn("You can not select more than 4 items", {
                    position: toast.POSITION.TOP_CENTER
                })
            }
            setSelectedItem(selectedItems)
            shouldShowSlidingBar(true)
            // console.log(selectedItems);
        }
    };


    const handleClose = () => {
        shouldShowSlidingBar(false);
    };

    const calculateTotalPrice = (itemArr, type) => {
        let sum = 0
        for (let i = 0; i < itemArr.length; i++) {
            let inp = itemArr[i]
            sum += inp.totalPrice
        }
        if (type == "grandTotal") {

            return sum + 90
        }
        else {
            return sum
        }
    }

    const handleChange = (e) => {
        setAddress(e.target.value)
        const selectedIndex = e.target.selectedIndex;
        setBackGroundIndex(selectedIndex);
        console.log(selectedIndex);
    }

    const goToAddNew = (e) => {
        e.preventDefault()
        if (addressArray.length >= 3) {
            return toast.warn("Can not add more than 3 address", {
                position: toast.POSITION.TOP_CENTER
            })
        }
        else {
            return navigate("/add-new-address")
        }
    }

    const createOrder = () => {
        showConfirmOrderLoading(true)
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        let userAddress = (!address ? addressArray[0] : address)
        const totalPrice = selectedItem.reduce((acc, item) => acc + item.totalPrice, 90);
        fetch("https://localhost:8080/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + userInfo.token
            },
            body: JSON.stringify({
                orderDetails: selectedItem,
                shippingAddress: userAddress,
                totalPrice: totalPrice,
            })
        })
            .then(res => res.json())
            .then(result => {
                showConfirmOrderLoading(false)
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
                if (result.message) {
                    toast.success(result.message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                    return navigate("/view-order")
                }
            })
            .catch(err => {
                console.log(err);
            })

    }
    return (
        <>
            {showSlidingBar && <div className={`w-3/4 font-Montserrat bg-white absolute  h-full z-30 ${showSlidingBar ? "right-0 sliding-bar-right" : " sliding-bar-left "} `}>
                <div className='flex justify-between px-8 bg-[#5861AE] text-white font-semibold xxl:py-5 xl:py-5 lg:py-2 md:py-2 sm:py-2 es:py-2 xxl:text-base xl:text-base lg:text-sm sm:text-xs es:text-xs'>
                    <h4>Summary</h4>
                    <AiOutlineClose onClick={handleClose} className='cursor-pointer' />

                </div>
                <div className=' flex items-center px-8 bg-[#F4F9FF] justify-between xxl:py-6 xl:py-6 lg:py-2 md:py-2  sm:py-1 es:py-1'>
                    <div className='text-[#1B2734] font-semibold xxl:w-80 xl:w-80 lg:w-40 md:w-36 sm:w-20 es:w-20'>
                        <select
                            className="bg-transparent border-b border-black px-4 focus:outline-none cursor-pointer w-full xxl:text-base xl:text-base lg:text-sm md:text-xs sm:text-xs es:text-xs"
                            value={address}
                            onChange={handleChange}
                        >
                            {/* <option value=""></option> */}
                            {addressArray.map((address, index) => (
                                <option
                                    key={index} value={address}>
                                    {address ? address.slice(0, 30) + "..." : ""}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='text-[#1B2734] xxl:text-base xl:text-base lg:text-sm md:text-xs sm:text-xs es:text-xs'>
                        <h4 className='font-semibold'>Your Address:</h4>
                        <p className='font-light'>{address ? `${address.slice(0, 20)}...` : `${addressArray[0].slice(0, 20)}...`}</p>
                    </div>
                    <div
                        className='text-[#1B2734] xxl:text-base xl:text-base lg:text-sm md:text-xs sm:text-sm es:text-xs
                        xxl:block xl:block lg:block md:block sm:hidden es:hidden'>
                        <h4 className='font-semibold'>Phone</h4>
                        <p className='font-light'>9557115385</p>
                    </div>
                </div>
                <div className='px-8 py-4 border-b-2'>
                    <h4 className='font-semibold text-[#3B3737] xxl:text-lg xl:text-lg lg:text-sm md:text-sm sm:text-xs es:text-xs'>Order Details</h4>
                    {selectedItem.map((item, i) => {
                        return <div key={i} className='grid grid-cols-4 xxl:py-3 xl:py-3 lg:py-3 md:py-3 sm:py-2 es:py-2 text-[#1B2734]'>
                            <div className='flex items-center font-semibold border-b-2 xxl:text-lg xl:text-lg lg:text-sm md:text-sm sm:text-xs es:text-xs'>{item.productName}</div>
                            <div className='flex items-center border-b-2 xxl:text-lg xl:text-lg lg:text-sm md:text-sm sm:text-xs es:text-[10px]'>{item.serviceType.join(', ')}</div>
                            <div className='font-semibold flex items-center  col-span-2 text-right border-b-2 '>
                                <span className='w-1/2 font-normal xxl:text-right xl:text-right lg:text-right md:text-right sm:text-left es:text-left xxl:text-base xl:text-base lg:text-base md:text-sm sm:text-xs es:text-[10px]'>{`${item.price} X ${item.quantity} =`}</span>
                                <span className='w-1/2 items-start text-center text-[#5861AE] xxl:text-lg xl:text-lg lg:text-base md:text-base sm:text-xs es:text-xs'>{`${item.totalPrice}`}</span>
                            </div>
                        </div>
                    })}

                    <div className='grid grid-cols-4 py-2'>
                        <div></div>
                        <div></div>
                        <div className='flex items-center font-semibold col-span-2 text-right border-b-2'>
                            <span className='w-1/2 text-[#1B2734] xxl:text-lg xl:text-lg lg:text-base md:text-sm sm:text-sm es:text-[12px]'>Subtotal</span>
                            <span className='w-1/2 text-center xxl:text-lg xl:text-lg lg:text-base md:text-base sm:text-sm es:text-xs'>{selectedItem.length ? calculateTotalPrice(selectedItem, "subTotal") : "Calculating..."}</span>
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
                            <span className='w-1/2 text-center xxl:text-lg xl:text-lg lg:text-base md:text-sm sm:text-sm es:text-sm'>₹ {selectedItem.length ? calculateTotalPrice(selectedItem, "grandTotal") : "Calculating..."}</span>
                        </div>
                    </div>
                </div>
                <div className='py-2 px-8'>
                    <h4 className='text-[#3B3737] font-semibold'>Address</h4>
                    <form className='gap-3 items-center xxl:flex xl:flex lg:flex md:flex sm:hidden es:hidden
                    xxl:flex-wrap xl:flex-wrap lg:flex-wrap md:flex-wrap'>

                        {addressArray.map((item, i) => {
                            return <div key={i} onClick={() => {
                                setBackGroundIndex(i)
                                setAddress(item)
                            }} className={`mt-4 cursor-pointer border-2 rounded-md border-[#5861AE] break-all text-sm 
                            px-2 text-ellipsis overflow-hidden overflow-y-scroll ${i == backgroundIndex ? "bg-[#767dc5] text-white font-semibold" : ""}
                            xxl:w-52 xl:w-52 lg:w-40 md:w-40 sm:w-10  xxl:h-24 xl:h-24 lg:h-24 md:h-20 `}>
                                <div className='flex justify-between'>
                                    <h3 className='text-[#3E3F40] text-lg font-bold'>{i == 0 ? "Home" : "Other"}</h3>
                                    <input
                                        readOnly
                                        checked={i == backgroundIndex ? true : false}
                                        type='checkbox' />
                                </div>
                                <div>{item}</div>
                            </div>
                        })}

                        <div className='flex gap-2 items-center font-bold text-[#5861AE]'>
                            <button onClick={goToAddNew} >Add New</button>
                            <BsFillPlusCircleFill />
                        </div>

                    </form>
                    <form className={`mt-4 cursor-pointer border-2 rounded-md py-2 border-[#5861AE] h-24 break-all text-sm 
                            px-2 text-ellipsis overflow-hidden bg-[#767dc5] text-white font-semibold"
                            xxl:hidden xl:hidden lg:hidden md:hidden sm:block es:block`}>
                        <div className='flex justify-between'>
                            <h3 className='text-[#3E3F40] font-bold'>Selected Address</h3>
                            <input
                                readOnly
                                checked={true}
                                type='checkbox' />
                        </div>
                        <div className='text-xs'>{!address ? addressArray[0] : address}</div>
                    </form>
                    <div className='flex gap-2 py-4 items-center justify-center font-bold text-[#5861AE] xxl:hidden xl:hidden lg:hidden md:hidden sm:flex es:flex'>
                        <button onClick={goToAddNew} >Add New</button>
                        <BsFillPlusCircleFill />
                    </div>
                </div>
                {/* <div className='absolute bottom-0 border w-full text-right py-2 px-8 bg-[#F4F4F4] text-white font-semibold xxl:text-base  xl:text-base  lg:text-base  md:text-base sm:text-sm es:text-sm'>
                    <button onClick={createOrder} className='border-2 py-2 rounded-md bg-[#5861AE] xxl:px-10  xl:px-10  lg:px-10  md:px-10 sm:px-5 es:px-5'>Confirm</button>
                </div> */}
                {
                    !confirmLoading ? (
                        <div className='absolute bottom-0 border w-full text-right py-2 px-8 bg-[#F4F4F4] text-white font-semibold xxl:text-base  xl:text-base  lg:text-base  md:text-base sm:text-sm es:text-sm'>
                            <button onClick={createOrder} className='border-2 py-2 rounded-md bg-[#5861AE] xxl:px-10  xl:px-10  lg:px-10  md:px-10 sm:px-5 es:px-5'>Confirm</button>
                        </div>
                    ) : (
                        <div
                            className='absolute bottom-0 border w-full text-right py-2 px-8 bg-[#F4F4F4] text-white font-semibold xxl:text-base  xl:text-base  lg:text-base  md:text-base sm:text-sm es:text-sm cursor-not-allowed'>
                            <div className='w-36 flex justify-center items-center float-right border-2 py-2 rounded-md bg-[#818399] xxl:px-10  xl:px-10  lg:px-10  md:px-10 sm:px-2 es:px-2'>
                                <ReactLoading type='spin' color='white' height={20} width={20} />
                            </div>
                        </div>
                    )
                }

            </div>}
            <div className='py-5'>

                {loading ? (
                    <div className='flex w-full h-[600px] justify-center items-center'>
                        <ReactLoading type='spin' color='#5861AE' height={30} width={30} />
                    </div>
                ) : (
                    <>
                        <div className='flex justify-between '>
                            <p className='xxl:text-base xl:text-base lg:text-base md:text-base sm:text-sm es:text-xs'>Create order</p>
                            <div className='xxl:text-base xl:text-base lg:text-base md:text-base sm:text-sm es:text-xs'>
                                <span className='absolute'><AiOutlineSearch /></span>
                                <input className='border-b-2 focus:outline-none xxl:w-36 xl:w-36 lg:w-36 md:w-36 sm:w-20 es:w-20' type='text' />
                            </div>
                        </div>
                        <div className='py-4'>
                            <div className='p-3 grid grid-cols-4 bg-[#2F2F2F] text-[#FFFFFF] xxl:text-lg xl:text-base lg:text-sm md:text-sm sm:text-xs es:text-xs
                            xxl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 es:grid-cols-3'>
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Wash Type</p>
                                <p className='xxl:block xl:block lg:block md:hidden sm:hidden es:hidden'>Price</p>
                            </div>
                            <div className='p-3 grid  border-2 gap-y-4 xxl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-3 es:grid-cols-3 '>
                                {productArray.map((item, i) => (
                                    <React.Fragment key={i}>
                                        <div className='relative'>
                                            <div className='w-14 h-14 flex items-center'>
                                                <img
                                                    className={' xxl:w-14 xl:w-14 lg:w-10 md:w-10 sm:w-9 es:w-9 xxl:h-14 xl:h-14 lg:h-10 md:h-10 sm:h-9 es:h-9'}
                                                    src={item.productImage} alt='shirt.webp' />
                                            </div>
                                            <div
                                                className='absolute bottom-7 left-16 text-sm xxl:block xl:block lg:block md:hidden sm:hidden es:hidden'>
                                                {item.productName}</div>
                                            <div className='absolute bottom-2 left-16 text-xs xxl:text-block xl:block lg:block md:hidden sm:hidden es:hidden '>{item.productDescription ? item.productDescription.slice(0, 16) + "..." : "Loading..."}</div>
                                        </div>
                                        <div className='flex items-center'>
                                            <input
                                                name={item.productName}
                                                onChange={(e) => calculatePrice(item.productName, e.target.value)}
                                                className='border-2 focus:outline-none no-arrows text-center xxl:w-14 xl:w-14 lg:w-10 md:w-10 sm:w-8 es:w-8 xxl:h-14 xl:h-14 lg:h-10 md:h-10 sm:h-8 es:h-8'
                                                type='number'
                                                value={
                                                    item.productName === 'Shirt' ? shirt.quantity :
                                                        item.productName === 'TShirt' ? tShirt.quantity :
                                                            item.productName === 'Pants' ? pants.quantity :
                                                                item.productName === 'Jeans' ? Jeans.quantity :
                                                                    item.productName === 'Boxers' ? Boxers.quantity :
                                                                        item.productName === 'Joggers' ? Joggers.quantity :
                                                                            item.productName === 'Suit' ? Suit.quantity : ''}
                                            />
                                        </div>
                                        <div className='flex  xxl:gap-10 xl:gap-10 lg:gap-8 md:gap-8 sm:gap-2 es:gap-2  items-center'>
                                            <img
                                                onClick={() => handleServiceClick(item.productName, 0, item.price[0])}
                                                className={` cursor-pointer xxl:w-8 xl:w-8 lg:w-8 md:w-8 sm:w-8 es:w-8 xxl:h-8 xl:h-8 lg:h-8 md:h-8 sm:h-6 es:h-6
                                    
                                    `}
                                                alt='washing.png'
                                                src={
                                                    item.productName === 'Shirt' && shirt.services.includes(0)
                                                        ? washingMachineColored
                                                        : item.productName === 'TShirt' && tShirt.services.includes(0)
                                                            ? washingMachineColored
                                                            : item.productName === 'Pants' && pants.services.includes(0)
                                                                ? washingMachineColored
                                                                : item.productName === 'Jeans' && Jeans.services.includes(0)
                                                                    ? washingMachineColored
                                                                    : item.productName === 'Boxers' && Boxers.services.includes(0)
                                                                        ? washingMachineColored
                                                                        : item.productName === 'Joggers' && Joggers.services.includes(0)
                                                                            ? washingMachineColored
                                                                            : item.productName === 'Suit' && Suit.services.includes(0)
                                                                                ? washingMachineColored
                                                                                : washingMachine

                                                }
                                            />
                                            <img
                                                onClick={() => handleServiceClick(item.productName, 1, item.price[1])}
                                                className={`h-8 w-8 cursor-pointer xxl:w-8 xl:w-8 lg:w-8 md:w-8 sm:w-8 es:w-8 xxl:h-8 xl:h-8 lg:h-8 md:h-8 sm:h-6 es:h-6`}
                                                src={
                                                    item.productName === 'Shirt' && shirt.services.includes(1)
                                                        ? ironColored
                                                        : item.productName === 'TShirt' && tShirt.services.includes(1)
                                                            ? ironColored
                                                            : item.productName === 'Pants' && pants.services.includes(1)
                                                                ? ironColored
                                                                : item.productName === 'Jeans' && Jeans.services.includes(1)
                                                                    ? ironColored
                                                                    : item.productName === 'Boxers' && Boxers.services.includes(1)
                                                                        ? ironColored
                                                                        : item.productName === 'Joggers' && Joggers.services.includes(1)
                                                                            ? ironColored
                                                                            : item.productName === 'Suit' && Suit.services.includes(1)
                                                                                ? ironColored
                                                                                : ironing
                                                }
                                                alt='iron.png'
                                            />
                                            <img
                                                onClick={() => handleServiceClick(item.productName, 2, item.price[2])}
                                                className={`h-8 w-8 cursor-pointer xxl:w-8 xl:w-8 lg:w-8 md:w-8 sm:w-8 es:w-8 xxl:h-8 xl:h-8 lg:h-8 md:h-8 sm:h-6 es:h-6`}
                                                src={
                                                    item.productName === 'Shirt' && shirt.services.includes(2)
                                                        ? bleachColored
                                                        : item.productName === 'TShirt' && tShirt.services.includes(2)
                                                            ? bleachColored
                                                            : item.productName === 'Pants' && pants.services.includes(2)
                                                                ? bleachColored
                                                                : item.productName === 'Jeans' && Jeans.services.includes(2)
                                                                    ? bleachColored
                                                                    : item.productName === 'Boxers' && Boxers.services.includes(2)
                                                                        ? bleachColored
                                                                        : item.productName === 'Joggers' && Joggers.services.includes(2)
                                                                            ? bleachColored
                                                                            : item.productName === 'Suit' && Suit.services.includes(2)
                                                                                ? bleachColored
                                                                                : bleach
                                                }
                                                alt='bleach.png'
                                            />
                                        </div>
                                        <p className=' items-center justify-between pr-8 font-Montserrat font-bold text-[#5861AE]
                                        xxl:flex xl:flex lg:flex md:hidden sm:hidden es:hidden'>
                                            {item.productName === 'Shirt' && shirt.quantity && shirt.price ? `${shirt.quantity} x ₹${shirt.price} = ₹${shirt.quantity * shirt.price}` : ''}
                                            {item.productName === 'TShirt' && tShirt.quantity && tShirt.price ? `${tShirt.quantity} x ₹${tShirt.price} = ₹${tShirt.quantity * tShirt.price}` : ''}
                                            {item.productName === 'Pants' && pants.quantity && pants.price ? `${pants.quantity} x ₹${pants.price} = ₹${pants.quantity * pants.price}` : ''}
                                            {item.productName === 'Jeans' && Jeans.quantity && Jeans.price ? `${Jeans.quantity} x ₹${Jeans.price} = ₹${Jeans.quantity * Jeans.price}` : ''}
                                            {item.productName === 'Boxers' && Boxers.quantity && Boxers.price ? `${Boxers.quantity} x ₹${Boxers.price} = ₹${Boxers.quantity * Boxers.price}` : ''}
                                            {item.productName === 'Joggers' && Joggers.quantity && Joggers.price ? `${Joggers.quantity} x ₹${Joggers.price} = ₹${Joggers.quantity * Joggers.price}` : ''}
                                            {item.productName === 'Suit' && Suit.quantity && Suit.price ? `${Suit.quantity} x ₹${Suit.price} = ₹${Suit.quantity * Suit.price}` : ''}

                                            {item.productName === "Shirt" && shirt.quantity && (
                                                <button
                                                    onClick={() => handleReset(item.productName)}
                                                    className='bg-[#5861AE] text-white font-normal px-3 text-sm py-1 rounded-sm'
                                                >
                                                    Reset
                                                </button>
                                            )}
                                            {item.productName === "TShirt" && tShirt.quantity && (
                                                <button
                                                    onClick={() => handleReset(item.productName)}
                                                    className='bg-[#5861AE] text-white font-normal px-3 text-sm py-1 rounded-sm'
                                                >
                                                    Reset
                                                </button>
                                            )}
                                            {item.productName === "Pants" && pants.quantity && (
                                                <button
                                                    onClick={() => handleReset(item.productName)}
                                                    className='bg-[#5861AE] text-white font-normal px-3 text-sm py-1 rounded-sm'
                                                >
                                                    Reset
                                                </button>
                                            )}
                                            {item.productName === "Jeans" && Jeans.quantity && (
                                                <button
                                                    onClick={() => handleReset(item.productName)}
                                                    className='bg-[#5861AE] text-white font-normal px-3 text-sm py-1 rounded-sm'
                                                >
                                                    Reset
                                                </button>
                                            )}
                                            {item.productName === "Boxers" && Boxers.quantity && (
                                                <button
                                                    onClick={() => handleReset(item.productName)}
                                                    className='bg-[#5861AE] text-white font-normal px-3 text-sm py-1 rounded-sm'
                                                >
                                                    Reset
                                                </button>
                                            )}
                                            {item.productName === "Joggers" && Joggers.quantity && (
                                                <button
                                                    onClick={() => handleReset(item.productName)}
                                                    className='bg-[#5861AE] text-white font-normal px-3 text-sm py-1 rounded-sm'
                                                >
                                                    Reset
                                                </button>
                                            )}
                                            {item.productName === "Suit" && Suit.quantity && (
                                                <button
                                                    onClick={() => handleReset(item.productName)}
                                                    className='bg-[#5861AE] text-white font-normal px-3 text-sm py-1 rounded-sm'
                                                >
                                                    Reset
                                                </button>
                                            )}

                                        </p>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        <div className='flex justify-end items-center xxl:gap-6  xl:gap-6 lg:gap-6 md:gap-4 sm:gap-2 es:gap-2'>
                            <Link to="/dashboard"><button className='py-1 border border-[#5861AE] rounded-sm text-[#5861AE] xxl:px-4  xl:px-4 lg:px-4 md:px-4 sm:px-2 es:px-2'>Cancel</button></Link>
                            <div><button onClick={handleProceed} className='bg-[#5861AE] border border-[#5861AE] text-white px-4 py-1 rounded-sm'>Proceed</button></div>
                        </div>
                    </>
                )}

            </div>

        </>
    );
};

export default Order;
