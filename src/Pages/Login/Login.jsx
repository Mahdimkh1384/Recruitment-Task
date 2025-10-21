import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import PageTitle from '../../Components/PageTitle/PageTitle';



export default function Login() {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    //check for is user login or not
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const loginHandler = () => {
        if (userName.length < 3) {
            Swal.fire({
                title: "ورود",
                text: "نام شما باید حداقل 3 کاراکتر داشته باشد",
                icon: "error",
                confirmButtonText: "باشه",
            });
        } else {
            localStorage.setItem("user", userName);

            Swal.fire({
                title: "ورود",
                text: "شما با موفقیت وارد شدید",
                icon: "success",
                confirmButtonText: "باشه",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/", { replace: true });
                }
            });
        }
    };

    return (
        <>
            <div className='flex flex-col justify-center items-center gap-y-20'>
                <PageTitle title={"ورود"} />
                <div className='w-[350px] h-[200px] bg-white dark:bg-[#2D3748] flex flex-col justify-around items-center rounded-[15px] border border-[#ccddf0] dark:border-[#3A4A6B]'>
                    <div className=' relative w-[90%] group'>
                        <span className=' absolute right-1.5 top-4 text-neutral-500 group-focus-within:text-[#357ABD]'> <FaRegUser /> </span>
                        <input type="text" placeholder='نام' value={userName} onChange={e => setUserName(e.target.value)} className='w-full h-[50px] bg-white border border-neutral-400 rounded-[8px] px-7 focus:border-[#357ABD] outline-0 focus:placeholder:text-[#357ABD]' />
                    </div>
                    <button onClick={loginHandler} className='w-[90%] h-[40px] bg-[#357ABD] dark:bg-white dark:text-[#357ABD] text-white rounded-[8px] cursor-pointer hover:bg-[#51a6e7] hover:dark:bg-[#cfe2f1] transition-colors'>ورود</button>
                </div>
            </div>
        </>
    )
}
