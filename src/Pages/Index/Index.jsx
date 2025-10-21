import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Clock from '../../Components/Clock/Clock';

export default function Index() {

    const [user, setUser] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    
    //check for is user login or not
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setUser(user)
        } else {
            navigate("/login")
        }

    }, [location])

    return (
        <div className='flex flex-col justify-center gap-7 h-[70vh]'>
            <div className='flex flex-col justify-evenly items-center gap-y-15'>
                <Clock user = {user}/>
            </div>
            <div className='flex lg:flex-row flex-col justify-center items-center gap-5 mt-10'>
            </div>
        </div>
    )
}
