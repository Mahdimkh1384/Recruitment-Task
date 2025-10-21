import React from 'react'

export default function TimeBox({value}) {
    return (
        <div className='lg:py-10 lg:px-5 sm:py-7 sm:px-3 rounded-[8px] bg-[#357ABD] dark:bg-white'>
            <h1 className='lg:text-9xl sm:text-6xl text-white font-bold dark:text-[#357ABD]'>
                {value} 
            </h1>
        </div>
    )
}
