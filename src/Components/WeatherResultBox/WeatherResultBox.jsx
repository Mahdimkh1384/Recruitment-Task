import React from 'react'

export default function WeatherResultBox({ data }) {

    const { current_weather, current_weather_units, elevation, cityName } = data

    return (
        <div className='flex justify-between items-center p-3 border border-neutral-400 rounded-[8px] dark:border-white bg-white dark:bg-neutral-600 shadow shadow-neutral-400'>
            <div className='flex flex-col gap-y-5'>
                <h3 className='lg:text-3xl sm:text-2xl font-bold text-black dark:text-white'>{cityName}</h3>
                <p className='text-black dark:text-white lg:text-[18px] sm:text-[15px]'>سرعت باد : {current_weather.windspeed} کیلومتر بر ساعت</p>
                <p className='text-black dark:text-white lg:text-[18px] sm:text-[15px]'>ارتفاع :{elevation} متر</p>
            </div>
            <h1 className='lg:text-8xl sm:text-4xl text-black dark:text-white'>{current_weather.temperature}{current_weather_units.temperature}</h1>
        </div>
    )
}
