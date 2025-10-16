import React from 'react'
import { Link } from 'react-router-dom'

export default function RouteBox({title , icon , href}) {
    return (
        <Link to={href} className='lg:w-[200px] sm:w-[300px] h-[100px] bg-white dark:bg-neutral-400 border border-purple-600 rounded-[10px] shadow shadow-purple-500 hover:bg-purple-50 flex flex-col items-center justify-around'>
            <span className='text-3xl text-black dark:text-white'>{icon}</span>
            <p className='text-2xl text-black dark:text-white'>{title}</p>
        </Link>
    )
}
