import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import Swal from 'sweetalert2';


export default function Login() {

    const [userName, setUserName] = useState('')

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            window.location.href = "/"
        }
    }, [])

    const loginHandler = () => {
        if (userName.length <= 3) {
            Swal.fire({
                title: "ورود",
                text: "نام شما باید حداقل 3 کاراکتر داشته باشد",
                icon: "error",
                confirmButtonText: "باشه",
            })
        } else {
            localStorage.setItem("user", userName)
            Swal.fire({
                title: "ورود",
                text: "شما با موفقیت وارد شدید",
                icon: "success",
                confirmButtonText: "باشه",
            }).then(() => {
                window.location.href = "/"
            })
        }
    }
    return (
        <div className='flex justify-center'>
            <div className='w-[350px] h-[450px] bg-white dark:bg-neutral-600 flex flex-col justify-around items-center rounded-[15px] border border-neutral-400 shadow shadow-purple-300'>
                <h1 className='text-3xl text-purple-600 dark:text-white'>فرم ورود</h1>
                <div className=' relative w-[90%] group'>
                    <span className=' absolute right-1.5 top-4 text-neutral-500 group-focus-within:text-purple-600'> <FaRegUser /> </span>
                    <input type="text" placeholder='نام' value={userName} onChange={e => setUserName(e.target.value)} className='w-full h-[50px] bg-white border border-neutral-400 rounded-[8px] px-7 focus:border-purple-600 outline-0 focus:placeholder:text-purple-600' />
                </div>
                <button onClick={loginHandler} className='w-[90%] h-[40px] bg-purple-600 dark:bg-white dark:text-purple-600 border border-purple-600 text-white rounded-[8px] cursor-pointer'>ورود</button>
            </div>
        </div>
    )
}
