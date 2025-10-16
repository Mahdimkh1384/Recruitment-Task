import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useNavigate , useLocation } from "react-router-dom";


export default function NavBar() {

    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const [isUserLogin, setIsUserLogin] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();

    // for dark mode and light mode 👇
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "true") setIsDarkTheme(true);
    }, []);

    useEffect(() => {
        if (isDarkTheme) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkTheme]);

    //check for is user login or not
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setIsUserLogin(true)
        } else {
            navigate("/login")
        }

    }, [location])
    return (
        <div className='fixed top-0 w-full h-[20vh] flex justify-around items-center bg-neutral-200 dark:bg-neutral-500 rounded-b-[50%] px-4'>
            <Link to="/" className='text-3xl font-bold text-purple-600 dark:text-purple-800'>Recruitment Task</Link>
            <div className='flex gap-4'>
                {isUserLogin && <Link className='btn' to="/my-account"> <FaRegUser className='text-black dark:text-white' /> </Link>}
                <button className='btn' onClick={() => {
                    setIsDarkTheme(prev => !prev)
                    localStorage.setItem("theme", !isDarkTheme)
                }}>
                    {isDarkTheme ? <IoMoonOutline className='text-black dark:text-white' /> : <IoSunnyOutline className='text-black dark:text-white' />}
                </button>
            </div>
        </div>
    )
}
