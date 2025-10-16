import React, { useEffect, useState } from 'react'
import RouteBox from '../../Components/RouteBox/RouteBox';
import { TiWeatherCloudy } from "react-icons/ti";
import { FaListCheck } from "react-icons/fa6";


export default function Index() {

    const [time, setTime] = useState('');
    const [period, setPeriod] = useState("")

    const routeData = [
        { id: 1, title: "لیست وظایف", icon: <FaListCheck /> , href : "/todos"},
        { id: 2, title: "آب و هوا", icon: <TiWeatherCloudy /> , href : "/weather"}
    ]

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
        <div className='flex flex-col gap-7'>
            <div className='flex flex-col justify-evenly items-center gap-y-15'>
                <h1 className='lg:text-9xl sm:text-7xl text-black font-bold dark:text-white'>
                    {time}
                </h1>
                <h2 className='lg:text-6xl sm:text-5xl  text-black dark:text-white'>{period}</h2>
            </div>
            <div className='flex lg:flex-row flex-col justify-center items-center gap-5 mt-10'>
                {routeData.map(data => (
                    <RouteBox key={data.id} {...data}/>
                ))}
            </div>
        </div>
    )
}
