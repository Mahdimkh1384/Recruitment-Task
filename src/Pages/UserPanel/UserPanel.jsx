import React, { useEffect, useState } from 'react'
import { GrLanguage } from "react-icons/gr";
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';

export default function UserPanel() {

    const [name, setName] = useState('')
    const [newName, setNewName] = useState('')
    const { t, i18n } = useTranslation();
    const [mainLanguage, setMainLanguage] = useState('')

    useEffect(() => {
        setName(localStorage.getItem('user'))
        const savedLang = localStorage.getItem('language') || 'fa';
        setMainLanguage(savedLang);
        i18n.changeLanguage(savedLang);
    }, [])

    const changeName = () => {
        if (!newName.trim() || newName.length < 3) {
            Swal.fire({
                title: t("changeNameTitle"),
                text: t("nameTooShort"),
                icon: "error",
                confirmButtonText: t("ok"),
            });
        } else {
            localStorage.setItem("user", newName);
            setName(localStorage.getItem("user"));
            Swal.fire({
                title: t("changeNameTitle"),
                text: t("nameChangedSuccess"),
                icon: "success",
                confirmButtonText: t("ok"),
            });
            setNewName("");
        }
    }

    const toggleLanguage = () => {
        const newLang = mainLanguage === 'fa' ? 'en' : 'fa';
        setMainLanguage(newLang)
        localStorage.setItem('language', newLang)
        i18n.changeLanguage(newLang)
    };
    
    return (
        <div className='flex justify-center' dir={mainLanguage === "fa" ? "rtl" : "ltr"}>
            <div className='w-[50%] h-[50vh] border border-neutral-400 rounded-[10px] shadow shadow-neutral-500 p-4 bg-white dark:bg-neutral-600'>
                {/* ================================= profile section ==================================== */}
                <div className='flex justify-between items-start border-b border-black dark:border-white pb-5'>
                    <div className='flex gap-5 items-center'>
                        <img src="/images/User_Icon.png" alt="profile" className='size-[150px] bg-neutral-200 rounded-[50%]' />
                        <h3 className='text-3xl text-black dark:text-white'>{name}</h3>
                    </div>
                    <button onClick={toggleLanguage} className='size-[50px] bg-neutral-200 rounded-[8px] flex justify-center items-center cursor-pointer hover:bg-neutral-300 transition-colors'> <GrLanguage className='text-2xl' /> </button>
                </div>
                {/* ===================================== change name section ============================ */}
                <div className='p-4 flex flex-col justify-between h-[40%]'>
                    <h4 className='text-purple-600 text-2xl dark:text-purple-400'>{t('changeName')}</h4>
                    <div className='flex justify-between'>
                        <input type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder={t('newNamePlaceholder')} className='w-[50%] h-[40px] border border-neutral-400 px-2 rounded-[8px] outline-0 focus:border-purple-600 focus:placeholder:text-purple-600 bg-white dark:bg-neutral-400 placeholder:text-neutral-500 dark:placeholder:text-white dark:focus:border-white dark:focus:placeholder:text-white text-black dark:text-white' />
                        <button onClick={changeName} className='w-[100px] h-[40px] bg-purple-600 dark:bg-purple-500 text-white rounded-[8px] cursor-pointer hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors'>{t('submit')}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
