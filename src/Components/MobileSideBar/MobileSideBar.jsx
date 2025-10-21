import React, { useState } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCloudMoon, FaUserAlt } from "react-icons/fa";
import { IoMenu, IoHome } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { CgOptions } from "react-icons/cg";




export default function MobileSideBar({ user }) {

    const [isShowMenuChild, setIsShowMenuChild] = useState(false)

    return (
        <div className='z-50 fixed top-0 right-0 border border-[#E0E6ED] dark:border-[#3A4A6B] w-[70%] h-[100vh] bg-[#ced2d4] dark:bg-[#2D3748]'>
            <div className='w-full bg-[#357ABD] text-white dark:text-[#1F2A44] h-[70px] flex justify-center items-center'>
                <h1 className='text-xl font-bold'>{user} عزیز خوش آمدی !</h1>
            </div>
            <ul className='flex flex-col gap-6 p-7 dark:text-white text-xl '>
                <Link to="/" className='flex items-center gap-x-2'> <IoHome />صفحه اصلی</Link>
                <Link to="/my-account" className='flex items-center gap-x-2'> <FaUserAlt />پروفایل</Link>
                <li onClick={() => setIsShowMenuChild(prev => !prev)} className='flex items-center gap-2'> <CgOptions/>گزینه ها <IoMdArrowDropdown /></li>
                {isShowMenuChild && <div className='relative'>
                    <ul className='absolute flex flex-col gap-y-4 rounded-[8px] top-[-6px] p-2'>
                        <Link to="/todos" className='flex items-center gap-x-2'> <IoMenu />لیست تسک ها</Link>
                        <Link to="/weather" className='flex items-center gap-x-2'> <FaCloudMoon />آب و هوا</Link>
                    </ul>
                </div>}
            </ul>
        </div>
    )
}
