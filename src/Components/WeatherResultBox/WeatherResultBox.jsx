import React from 'react'

export default function WeatherResultBox({ data }) {

    const { current_weather, current_weather_units, elevation, cityName } = data

    return (
        <div className='flex justify-between items-center p-3 border border-neutral-400 rounded-[8px] dark:border-white bg-white dark:bg-neutral-600 shadow shadow-neutral-400'>
            <div className='flex flex-col gap-y-5'>
                <h3 className='text-3xl font-bold text-black dark:text-white'>{cityName}</h3>
                <p className='text-black dark:text-white'>سرعت باد : {current_weather.windspeed} کیلومتر بر ساعت</p>
                <p className='text-black dark:text-white'>ارتفاع :{elevation} متر</p>
            </div>
            <h1 className='text-8xl text-black dark:text-white'>{current_weather.temperature}{current_weather_units.temperature}</h1>
        </div>
    )
}
