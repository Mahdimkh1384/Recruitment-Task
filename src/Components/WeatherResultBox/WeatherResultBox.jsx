import React, { useEffect, useState } from 'react'
import { FaWind, FaThermometerFull, FaThermometerHalf, FaThermometerQuarter } from "react-icons/fa";
import { CiLineHeight } from "react-icons/ci";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function WeatherResultBox({ data, loading }) {

    if (loading || !data) {
        return (
            <div className='w-[95%] h-[40vh] flex lg:flex-row sm:flex-col-reverse justify-around items-center p-3 border border-neutral-400 rounded-[8px] dark:border-white bg-white dark:bg-[#2D3748] shadow shadow-neutral-400'>
                <div className='flex flex-col flex-2 h-full justify-around items-center gap-y-5'>
                    <Skeleton width={200} height={60} />
                    <div className='flex flex-col gap-y-5'>
                        <Skeleton width={250} height={25} />
                        <Skeleton width={250} height={25} />
                    </div>
                </div>
                <div className='flex flex-col flex-2 items-center justify-center gap-y-4 h-full'>
                    <Skeleton width={250} height={80} />
                    <Skeleton width={100} height={40} />
                </div>
            </div>
        )
    }

    const { current_weather, current_weather_units, elevation, cityName } = data
    const [temperatureStatus, setTemperatureStatus] = useState('')

    useEffect(() => {
        if (current_weather.temperature > 35) {
            setTemperatureStatus("hot")
        } else if (current_weather.temperature < 35 && current_weather.temperature > 15) {
            setTemperatureStatus("normal")
        } else {
            setTemperatureStatus("cold")
        }
    }, [current_weather.temperature])

    return (
        <div className=' w-[95%] h-[40vh] flex lg:flex-row sm:flex-col-reverse justify-around items-center p-3 border border-neutral-400 rounded-[8px] dark:border-white bg-white dark:bg-[#2D3748] shadow shadow-neutral-400'>
            <div className='flex flex-col flex-2 h-full justify-around items-center gap-y-5'>
                <h3 className='lg:text-7xl sm:text-3xl font-bold text-black dark:text-white text-center'>{cityName}</h3>
                <div className='flex flex-col gap-y-5'>
                    <p className='text-black dark:text-white lg:text-[20px] sm:text-[17px] flex items-center gap-3'> <FaWind />سرعت باد : {current_weather.windspeed} کیلومتر بر ساعت</p>
                    <p className='text-black dark:text-white lg:text-[20px] sm:text-[17px] flex items-center gap-3'> <CiLineHeight />ارتفاع :{elevation} متر</p>
                </div>
            </div>
            <div className='flex flex-col flex-2 items-center justify-center gap-y-4 h-full'>
                <h1 className='lg:text-9xl font-bold  text-center sm:text-6xl text-black dark:text-white'>{current_weather.temperature}{current_weather_units.temperature}</h1>
                {temperatureStatus === "hot" ? <h2 className='flex gap-x-2 items-center text-3xl text-red-600'><FaThermometerFull />گرم </h2> : temperatureStatus === "normal" ? <h2 className='flex gap-x-2 items-center text-3xl text-green-600'><FaThermometerHalf />معمولی </h2> : <h2 className='flex gap-x-2 items-center text-3xl text-blue-600'><FaThermometerQuarter />سرد </h2>}
            </div>
        </div>
    )
}
