import React, { useState } from 'react';
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserRegister = () => {
    const indianStatesAndUTs = [
        "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];
    const [passwordType, showPassWordType] = useState("password")
    const [confirmPasswordType, showConfirmPassWordType] = useState("password")
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        state: '',
        district: '',
        address: '',
        pincode: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        for (let items in formData) {
            if (!formData[items]) {
                return toast.error("All fields are mandatory", {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        }
        if (formData.phone.length !== 10) {
            return toast.error("Invalid Phone number", {
                position: toast.POSITION.TOP_CENTER
            })
        }
        if (formData.password !== formData.confirmPassword) {
            return toast.error("Password Missmatch", {
                position: toast.POSITION.TOP_CENTER
            })
        }
        console.log(formData);
        fetch("https://localhost:8080/user-register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.error) {
                    return toast.error(result.error, {
                        position: toast.POSITION.TOP_CENTER
                    })
                }
                toast.success(result.message, {
                    position: toast.POSITION.TOP_CENTER
                })
                return navigate("/")
            })
    };

    return (
        <div className='flex justify-between'>
            <div className='xxl:w-1/4 xl:w-1/4 lg:w-1/4 md:w-1/2 xxl:block xl:block lg:block md:block sm:hidden es:hidden py-52 bg-[#c2b9b90f] border-2 border-[#c2b9b90f]'>
                <div className='font-Montserrat font-semibold text-[#5861AE] ml-16'>
                    <div className='text-6xl'>Laundry</div>
                    <div className='text-6xl mt-4'>Service</div>
                    <p className='text-[#565657] mt-4 text-lg font-light '>
                        Doorstep Wash &
                    </p>
                    <p className='text-[#565657] mt-2 text-lg font-light'>
                        Dryclean Service
                    </p>
                    <div className='text-[#565657] mt-11 text-xs'>Already Have Account</div>
                    <div className='text-[#4552C1] mt-3'>
                        <Link to="/">
                            <button className='border border-[#4552C1] w-28 h-10 rounded-sm hover:bg-[#5861AE] hover:text-white'>
                                <span className='text-xs'>Sign</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='xxl:w-3/4 xl:w-3/4 lg:w-3/4 md:w-3/4 sm:w-full es:w-full bg-[#B9C0FD1A] border-2 border-[#B9C0FD1A] border-l-0'>
                <div className='py-10 px-2 ml-36 xxl:ml-36 xl:ml-36 lg:ml-36 md:ml-10 sm:ml-0 es:ml-0 font-Montserrat'>
                    <div className='text-4xl text-[#4552C1] font-semibold'>Register</div>
                    <div className='grid grid-cols-2 py-8'>
                        <div className='py-5'>
                            <label className='block text-[#77838F]'>Name</label>
                            <input
                                onChange={handleChange}
                                value={formData.name}
                                name="name"
                                className='bg-transparent w-5/6 border-b-2 border-[#5861AE] focus:outline-none'
                            />
                        </div>
                        <div className='py-5'>
                            <label className='block text-[#77838F]'>Email</label>
                            <input
                                onChange={handleChange}
                                value={formData.email}
                                name="email"
                                className='bg-transparent w-5/6 border-b-2 border-[#5861AE] focus:outline-none'
                            />
                        </div>
                        <div className='py-5'>
                            <label className='block text-[#77838F]'>Phone</label>
                            <input
                                value={formData.phone}
                                onChange={handleChange}
                                name="phone"
                                type='number'
                                className='no-arrows bg-transparent w-5/6 border-b-2 border-[#5861AE] focus:outline-none'
                            />
                        </div>
                        <div className='py-5'>
                            <label className='block text-[#77838F]'>State</label>
                            <select
                                className='cursor-pointer bg-transparent w-5/6 border-b-2 border-[#5861AE] focus:outline-none'
                                id="indianStatesSelect"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            >
                                <option value=''></option>
                                {indianStatesAndUTs.map((state, index) => (
                                    <option key={index} value={state} >
                                        {state}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='py-5'>
                            <label className='block text-[#77838F]'>District</label>
                            <input
                                onChange={handleChange}
                                value={formData.district}
                                name="district"
                                className='bg-transparent w-5/6 border-b-2 border-[#5861AE] focus:outline-none'
                            />
                        </div>
                        <div className='py-5'>
                            <label className='block text-[#77838F]'>Address</label>
                            <input
                                onChange={handleChange}
                                value={formData.address}
                                name="address"
                                className='bg-transparent w-5/6 border-b-2 border-[#5861AE] focus:outline-none'
                            />
                        </div>
                        <div className='py-5'>
                            <label className='block text-[#77838F]'>Pincode</label>
                            <input
                                onChange={handleChange}
                                value={formData.pincode}
                                name="pincode"
                                type='number'
                                className='no-arrows bg-transparent w-5/6 border-b-2 border-[#5861AE] focus:outline-none'
                            />
                        </div>
                        <div className='py-5'>
                            <label className='block text-[#77838F]'>Password</label>
                            <span
                                onClick={() => showPassWordType(passwordType == "text" ? "password" : "text")}
                                className='w-5/6 flex justify-end cursor-pointer'>
                                <RiLockPasswordLine className='h-4 w-4 absolute' />

                            </span>
                            <input
                                onChange={handleChange}
                                value={formData.password}
                                name="password"
                                type={`${passwordType}`}
                                className='bg-transparent w-5/6 border-b-2 border-[#5861AE] focus:outline-none'
                            />
                        </div>
                        <div className='py-5'>
                            <label className='block text-[#77838F]'>Confirm Password</label>
                            <span
                                onClick={() => showConfirmPassWordType(confirmPasswordType == "text" ? "password" : "text")}
                                className='w-5/6 flex justify-end cursor-pointer'>
                                <RiLockPasswordLine className='h-4 w-4 absolute' />

                            </span>
                            <input
                                onChange={handleChange}
                                value={formData.confirmPassword}
                                name="confirmPassword"
                                type={`${confirmPasswordType}`}
                                className='bg-transparent w-5/6 border-b-2 border-[#5861AE] focus:outline-none'
                            />
                        </div>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className='flex justify-center items-center gap-2 text-sm text-[#5861AE]'>
                            <input
                                required
                                className='w-4 h-8 cursor-pointer'
                                type='checkbox'
                            />
                            <p className='underline text-xs cursor-pointer border-[#5861AE] '>I agree to Terms & Condition receiving marketing and promotional materials</p>
                        </div>
                        <div className='flex justify-center py-3'>
                            <button type='submit' className='border px-6 py-2 text-sm bg-[#5861AE] text-white rounded-sm'>Register</button>
                        </div>
                        <Link to="/">
                            <div className='mt-4 text-center text-blue-700 text-xs xxl:hidden xl:hidden lg:hidden md:hidden sm:block es:block'>Don't Have An Account?</div>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
