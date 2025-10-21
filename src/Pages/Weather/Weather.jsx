import React, { useEffect, useState } from 'react'
import cities from '../../ir.json';
import Swal from 'sweetalert2';
import WeatherResultBox from '../../Components/WeatherResultBox/WeatherResultBox';
import PageTitle from '../../Components/PageTitle/PageTitle';

export default function Weather() {

    const [query, setQuery] = useState('')
    const [suggestion, setSuggestion] = useState([])
    const [queryResult, setQueryResult] = useState([])
    const [isShowResult, setIsShowResult] = useState(false)
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)

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
                confirmButtonColor: "#357ABD",
            })
            return
        } else if (!cityData) {
            Swal.fire({
                title: "جستجوی شهر",
                text: "هیچ شهری پیدا نشد",
                icon: "error",
                confirmButtonText: "باشه",
                confirmButtonColor: "#357ABD",
            })
            return
        } else {
            setLoading(true)
            setIsShowResult(false)
            setSuggestion([])
            setQuery('')
            try {
                const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${cityData.lat}&longitude=${cityData.lng}&current_weather=true`);
                const data = await res.json();

                setWeatherData({ ...data, cityName: cityData.city });
                setIsShowResult(true);
            } catch (error) {
                Swal.fire({
                    title: "خطا",
                    text: "مشکلی در دریافت اطلاعات پیش آمد",
                    icon: "error",
                    confirmButtonText: "باشه",
                    confirmButtonColor: "#357ABD",
                });
            } finally {
                setLoading(false)
                setIsShowResult(true)
            }
        }
    }

    return (
        <>
            <div className='flex justify-center'>
                <PageTitle title={"آب و هوا"} />
            </div>
            <div className='flex flex-col gap-y-10 '>
                <div className='flex justify-evenly mt-10'>
                    <div className='flex flex-col lg:w-[30%] gap-y-1.5'>
                        <input value={query} onKeyDown={e => searchHandler(e)} onChange={e => setQuery(e.target.value)} type="text" placeholder='نام شهرتان را وارد کنید ...' className='h-[40px] rounded-[8px] border border-neutral-400 px-3 outline-0 bg-white focus:border-[#357ABD] focus:placeholder:text-[#357ABD]' />
                        <ul className={`p-2 rounded-[8px] border border-neutral-400 flex flex-col gap-y-1.5 bg-white dark:bg-[#2D3748] ${suggestion.length ? "inline" : "hidden"}`}>
                            {suggestion.slice(0, 10).map((suggest, index) => (
                                <li key={index} onClick={() => {
                                    showResult(suggest)
                                }} className='w-full hover:bg-[#82C1F0] p-1 transition-colors rounded-[8px] cursor-pointer text-black dark:text-white dark:hover:bg-[#3A4A6B]'>{suggest.city}</li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={() => showResult()} className='w-[100px] h-[40px] text-[#FFFFFF] dark:text-[#1F2A44] rounded-[8px]  transition-colors cursor-pointer bg-[#4A90E2] dark:bg-[#5DADEC] dark:hover:bg-[#82C1F0] hover:bg-[#357ABD]'>جستجو</button>
                </div>
                <div className='flex justify-center'>
                    {(loading || isShowResult) && <WeatherResultBox data={weatherData} loading={loading} />}
                </div>
            </div>
        </>
    )
}
