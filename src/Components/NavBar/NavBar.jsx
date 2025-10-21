import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IoSunnyOutline, IoMoonOutline, IoMenu } from "react-icons/io5";
import { FaListCheck } from "react-icons/fa6";
import { FaRegUser, FaCloudMoon } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import MobileSideBar from '../MobileSideBar/MobileSideBar';


export default function NavBar() {

    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const [isUserLogin, setIsUserLogin] = useState(false)
    const [isShowMobileMenu, setIsShowMobileMenu] = useState(false)
    const [user, setUser] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const menuRef = useRef(null);

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
        const handleStorageChange = () => {
            const user = localStorage.getItem('user');
            if (!user) {
                setIsUserLogin(false);
                setUser('');
                navigate("/login", { replace: true }); // 👈 redirect
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [navigate]);

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            setIsUserLogin(true);
            setUser(user);
        } else {
            setIsUserLogin(false);
            setUser('');
            if (location.pathname !== "/login") {
                navigate("/login", { replace: true });
            }
        }
    }, [location.pathname, navigate]);

    useEffect(() => {
        const updateUser = () => {
            const updatedUser = localStorage.getItem('user');
            setUser(updatedUser);
        };
        window.addEventListener('userChanged', updateUser);
        return () => window.removeEventListener('userChanged', updateUser);
    }, []);

    // close mobile menu to click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isShowMobileMenu &&
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsShowMobileMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isShowMobileMenu]);
    // close mobile menu when route changes
    useEffect(() => {
        setIsShowMobileMenu(false);
    }, [location.pathname]);

    return (

        <>
            {isShowMobileMenu && <div ref={menuRef}><MobileSideBar user={user} /></div>}
            <div dir='rtl' className='fixed top-0 w-full h-[20vh] flex justify-between items-center bg-[#E8ECEF] dark:bg-[#2D3748] border-b-2 border-[#E0E6ED] dark:border-[#3A4A6B] px-4'>
                <div className='flex gap-10 items-center'>
                    {isUserLogin && <button className='btn lg:hidden' onClick={() => setIsShowMobileMenu(true)}> <IoMenu /> </button>}
                    <Link to="/" className='lg:text-3xl sm:text-2xl font-bold text-[#2E2E2E] dark:text-[#D3D8DE]'>Recruitment Task</Link>
                    {isUserLogin && (
                        <div className='lg:inline sm:hidden'>
                            <ul className='flex gap-x-4'>
                                <Link to="/" className='text-[#1F2A44] dark:text-white'>صفحه اصلی</Link>
                                <li className='flex items-center gap-x-2 hover:cursor-pointer relative text-[#1F2A44] dark:text-white group'>گزینه ها <IoMdArrowDropdown />
                                    <ul className=' absolute flex flex-col gap-y-2 invisible opacity-0 group-hover:visible rounded-[8px] w-[170px] top-6 bg-white dark:bg-[#2D3748] border border-[#E0E6ED] dark:border-[#3A4A6B] p-3 group-hover:opacity-100 transition-opacity duration-200 '>
                                        <Link to="/todos" className='p-1.5 text-[#1F2A44] dark:text-[#D3D8DE] hover:text-[#357ABD] hover:dark:text-[#82C1F0] flex items-center gap-x-2'> <FaListCheck />لیست تسک ها  </Link>
                                        <Link to="/weather" className='p-1.5 text-[#1F2A44] dark:text-[#D3D8DE] hover:text-[#357ABD] hover:dark:text-[#82C1F0] flex items-center gap-x-2'> <FaCloudMoon />آب و هوا</Link>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <div className='flex gap-4'>
                    {isUserLogin && <Link className='border rounded-[8px] border-[#D3E0F0] dark:border-[#3A4A6B] gap-x-2 px-3 items-center cursor-pointer text-xl lg:flex sm:hidden bg-[#4A90E2] dark:bg-[#5DADEC] dark:hover:bg-[#82C1F0] hover:bg-[#357ABD] transition-colors duration-200 text-[#FFFFFF] dark:text-[#1F2A44] ' to="/my-account"> <FaRegUser /> {user} </Link>}
                    <button className='btn' onClick={() => {
                        setIsDarkTheme(prev => !prev)
                        localStorage.setItem("theme", !isDarkTheme)
                    }}>
                        {isDarkTheme ? <IoMoonOutline /> : <IoSunnyOutline />}
                    </button>
                </div>
            </div>
        </>
    )
}
