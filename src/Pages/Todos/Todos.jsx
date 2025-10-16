import React, { useEffect, useState } from 'react'
import TodoBox from '../../Components/TodoBox/TodoBox'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";


export default function Todos() {

    const [todo, setTodo] = useState('')
    const [allTodos, setAllTodos] = useState([])
    const navigate = useNavigate();


    const getAllTodos = () => {
        try {
            const todos = JSON.parse(localStorage.getItem('todos'))
            setAllTodos(Array.isArray(todos) ? todos : [])
        } catch {
            setAllTodos([])
        }
    }

    useEffect(() => {
        const user = localStorage.getItem('user')
        if (!user) {
            navigate("/login")
        }
        getAllTodos()
    }, [])

    const addTodo = () => {

        if (!todo.trim()) {
            Swal.fire({
                title: "افزودن وظیفه",
                text: "لطفا مقادیر را وارد کنید",
                icon: "error",
                confirmButtonText: "باشه",
            })
        } else {
            const newTodo = {
                id: allTodos.length + 1,
                title: todo
            }

            const updatedTodos = [...(Array.isArray(allTodos) ? allTodos : []), newTodo]
            setAllTodos(updatedTodos)
            localStorage.setItem('todos', JSON.stringify(updatedTodos))

            Swal.fire({
                title: "افزودن تسک",
                text: "تسک با موفقیت اضافه شد",
                icon: "success",
                confirmButtonText: "باشه",
            })

            setTodo('')
        }
    }

    const deleteTodo = (id) => {

        Swal.fire({
            title: "حذف تسک",
            text: "آیا از حذف تسک اطمینان دارید ؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "انصراف",
            confirmButtonColor: "#e11d48",
        }).then(result => {
            if (result.isConfirmed) {
                const mainTodos = allTodos.filter(todo => todo.id !== id)

                setAllTodos(mainTodos)
                localStorage.setItem('todos', JSON.stringify(mainTodos))

                Swal.fire({
                    title: "حذف تسک",
                    text: " تسک مورد نظر با موفقیت حذف شد",
                    icon: "success",
                    confirmButtonText: "باشه",
                })
            }
        })
    }
    return (
        <div className='flex flex-col items-center gap-y-10'>
            <div className='flex w-[55%] justify-between'>
                <input type="text" value={todo} className='border border-neutral-500 dark:border-white w-[50%] rounded-[8px] px-2 focus:border-purple-600 outline-0 placeholder:text-neutral-500 dark:placeholder:text-white text-black dark:text-white bg-white dark:bg-neutral-600' onChange={e => setTodo(e.target.value)} placeholder='عنوان تسک جدید...' />
                <button onClick={addTodo} className='w-[150px] h-[40px] bg-purple-600 text-white rounded-[8px] cursor-pointer hover:bg-purple-700 transition-colors'>ثبت</button>
            </div>
            <div className='w-[55%] flex flex-col gap-y-6'>
                <h1 className='text-3xl text-purple-600 dark:text-purple-500'>لیست تسک ها</h1>
                <div className='flex flex-wrap gap-1.5'>
                    {!allTodos.length && <h2 className='text-center text-xl text-red-500 mt-3 w-full font-bold'>هیچ تسکی وجود ندارد</h2>}
                    {allTodos.map(todo => (
                        <TodoBox key={todo.id} {...todo} deleteTodo={deleteTodo} />
                    ))}
                </div>
            </div>
        </div>
    )
}
