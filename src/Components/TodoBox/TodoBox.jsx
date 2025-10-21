import React from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { GiConfirmed, GiCancel } from "react-icons/gi";


export default function TodoBox({ id, title, isComplete, deleteTodo, completeTodo }) {

    return (
        <div className={`w-full h-[45px] ${isComplete ? "bg-green-200" : "bg-[#cde8fc]"}  border border-neutral-500 rounded-[8px] px-4 flex justify-between items-center`}>
            {isComplete ? <p className='text-neutral-600'><s>{title}</s></p> : <p>{title}</p>}
            <div className='flex items-center gap-5'>
                <FaRegTrashCan className='text-black hover:text-red-600 text-[27px] transition-colors cursor-pointer' onClick={() => {
                    deleteTodo(id)
                }} />
                <button onClick={() => {
                    completeTodo(id)
                }}>
                    {isComplete ? (
                        <GiCancel className='text-black hover:text-red-600 text-[27px] transition-colors cursor-pointer' />
                    ) : (
                        <GiConfirmed className='text-black hover:text-green-500 text-[27px] transition-colors cursor-pointer' />
                    )}
                </button>
            </div>
        </div>
    )
}
