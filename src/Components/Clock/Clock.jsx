import React, { useEffect, useState } from 'react';
import TimeBox from '../TimeBox/TimeBox'

export default function Clock({user}) {

    const [time, setTime] = useState({ hours: '', minutes: '', seconds: '' })
    const [period, setPeriod] = useState("")
    
    // check time
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0')
            const minutes = String(now.getMinutes()).padStart(2, '0')
            const seconds = String(now.getSeconds()).padStart(2, '0')
            setTime({ hours, minutes, seconds })

            const periodHours = now.getHours()

            if (periodHours >= 5 && periodHours < 12) {
                setPeriod(`صبحت بخیر ${user} 😊`)
            } else if (periodHours >= 12 && periodHours < 17) {
                setPeriod(`ظهرت بخیر ${user} 😊`)
            } else if (periodHours >= 17 && periodHours < 20) {
                setPeriod(`عصرت بخیر ${user} 😊`)
            } else {
                setPeriod(`شبت بخیر ${user} 😊`)
            }
        }

        updateClock()
        const interval = setInterval(updateClock, 1000)
        return () => clearInterval(interval)
    }, [user])

    const parts = [
        { id: 1, key: 'seconds' },
        { id: 2, key: 'minutes' },
        { id: 3, key: 'hours' },
    ]

    return (
        <>
            <div className='flex gap-x-5 items-center'>
                {parts.map(part => (
                    <div key={part.id} className="flex items-center">
                        <TimeBox value={time[part.key]} />
                        {part.id < 3 && <span className='lg:text-9xl sm:text-7xl dark:text-white text-[#2D3748] font-bold'>:</span>}
                    </div>
                ))}
            </div>
            <h2 className='lg:text-6xl sm:text-4xl  text-black dark:text-white'>{period}</h2>
        </>
    )
}
