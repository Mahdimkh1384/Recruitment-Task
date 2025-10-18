import React, { useEffect, useState } from 'react'
import cities from '../../ir.json';
import Swal from 'sweetalert2';
import WeatherResultBox from '../../Components/WeatherResultBox/WeatherResultBox';

export default function Weather() {

    const [query, setQuery] = useState('')
    const [suggestion, setSuggestion] = useState([])
    const [queryResult, setQueryResult] = useState([])
    const [isShowResult, setIsShowResult] = useState(false)
    const [weatherData, setWeatherData] = useState('')

    const searchHandler = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            showResult()
        }
    }

    useEffect(() => {
        const filteredCity = cities.filter(city => {
            return city.city.toLowerCase().includes(query.toLowerCase())
        })
        if (filteredCity.length <= 1) {
            setQueryResult(filteredCity)
        }

        if (query.length) {
            setSuggestion(filteredCity)
            setIsShowResult(false)

        } else {
            setSuggestion([])
        }
    }, [query])

    const showResult = async (selectedCity) => {
        const cityData = selectedCity || queryResult[0];
        if (!query) {
            Swal.fire({
                title: "جستجوی شهر",
                text: "لطفا نام شهر را وارد کنید",
                icon: "error",
                confirmButtonText: "باشه",
            })
            return
        } else if (!cityData) {
            Swal.fire({
                title: "جستجوی شهر",
                text: "هیچ شهری پیدا نشد",
                icon: "error",
                confirmButtonText: "باشه",
            })
            return
        } else {
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cityData.lat}&longitude=${cityData.lng}&current_weather=true`)
            const data = await res.json()
            setIsShowResult(true)
            setWeatherData({ ...data, cityName: cityData.city })
        }
        setQuery('')
        setSuggestion([])
    }

    return (
        <div className='flex justify-center'>
            <div className='w-[40%] flex flex-col gap-y-7'>
                <h1 className='text-3xl text-purple-600 dark:text-purple-500'>جستجوی شهر</h1>
                <div className='flex gap-3 justify-between'>
                    <div className='flex flex-col w-[80%] gap-y-1.5'>
                        <input value={query} onKeyDown={e => searchHandler(e)} onChange={e => setQuery(e.target.value)} type="text" placeholder='نام شهرتان را وارد کنید ...' className='h-[40px] rounded-[8px] border border-neutral-400 px-3 outline-0 focus:placeholder:text-purple-600 focus:border-purple-600 bg-white dark:bg-neutral-500 dark:placeholder:text-white placeholder:text-neutral-500 text-black dark:text-white dark:focus:placeholder:text-white dark:focus:border-white' />
                        <ul className={`p-2 rounded-[8px] border border-neutral-400 flex flex-col gap-y-1.5 bg-white dark:bg-neutral-500 ${suggestion.length ? "inline" : "hidden"}`}>
                            {suggestion.slice(0, 10).map((suggest, index) => (
                                <li key={index} onClick={() => {
                                    showResult(suggest)
                                }} className='w-full hover:bg-purple-200 p-1.5 transition-colors rounded-[8px] cursor-pointer text-black dark:text-white dark:hover:bg-purple-500'>{suggest.city}</li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={() => showResult()} className='w-[100px] h-[40px] bg-purple-600 text-white rounded-[8px] hover:bg-purple-700 transition-colors cursor-pointer dark:bg-purple-500 dark:hover:bg-purple-600'>جستجو</button>
                </div>
                {isShowResult && <WeatherResultBox data={weatherData} />}
            </div>
        </div>
    )
}
