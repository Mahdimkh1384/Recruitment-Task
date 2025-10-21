import React from 'react'

export default function PageTitle({ title }) {
    return (
        <div className=' p-3 border-b-2 border-[#ccddf0] dark:border-[#3A4A6B]'>
            <h1 className='text-3xl text-[#2E2E2E] dark:text-white'>{title}</h1>
        </div>
    )
}
