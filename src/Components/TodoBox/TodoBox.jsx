import React from 'react'
import { FaRegTrashCan } from "react-icons/fa6";


export default function TodoBox({ id, title , deleteTodo}) {

    return (
        <div className='w-[49%] h-[45px] bg-white dark:bg-neutral-300 border border-neutral-500 rounded-[8px] px-4 flex justify-between items-center'>
            <p>{title}</p>
            <FaRegTrashCan className='text-black hover:text-red-600 text-[18px] transition-colors cursor-pointer' onClick={() => {
                deleteTodo(id)
            }} />
        </div>
    )
}
