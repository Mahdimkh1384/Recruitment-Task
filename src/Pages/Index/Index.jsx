import React, { useEffect, useState } from 'react'

export default function Index() {

    const [time, setTime] = useState('');
    const [period, setPeriod] = useState("")

    // check time
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setTime(` ${seconds} : ${minutes} : ${hours}`)

            const periodHours = now.getHours()

            if (periodHours >= 5 && periodHours < 12) {
                setPeriod("صبحتان بخیر😊")
            } else if (periodHours >= 12 && periodHours < 17) {
                setPeriod("ظهرتان بخیر 😊")
            } else if (periodHours >= 17 && periodHours < 20) {
                setPeriod("عصرتان بخیر 😊")
            } else {
                setPeriod("شبتان بخیر😊")
            }
        }

        updateClock()
        const interval = setInterval(updateClock, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='flex flex-col justify-evenly items-center gap-y-15'>
            <h1 className='text-9xl text-black dark:text-white'>
                {time}
            </h1>
            <h2 className='text-6xl  text-black dark:text-white'>{period}</h2>
        </div>
    )
}
