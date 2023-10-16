import React from 'react'
import { Outlet } from "react-router-dom"
import LoginRegisterHeader from '../component/LoginRegisterHeader'
import LoginRegisteFooter from '../component/LoginRegisteFooter'

const LoginRegisterLayout = () => {
    return (
        <div>
            <div>
                <LoginRegisterHeader />
            </div>
            <div>
                <Outlet />
            </div>
            <div>
                <LoginRegisteFooter />
            </div>
        </div>
    )
}

export default LoginRegisterLayout