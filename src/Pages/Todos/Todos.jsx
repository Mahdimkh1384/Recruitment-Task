import React, { useEffect, useState } from 'react'
import TodoBox from '../../Components/TodoBox/TodoBox'
import Swal from 'sweetalert2'
import PageTitle from '../../Components/PageTitle/PageTitle';


export default function Todos() {

    const [todo, setTodo] = useState('')
    const [allTodos, setAllTodos] = useState([])

    const getAllTodos = () => {
        try {
            const todos = JSON.parse(localStorage.getItem('todos'))
            setAllTodos(Array.isArray(todos) ? todos : [])
        } catch {
            setAllTodos([])
        }
    }

    useEffect(() => {
        getAllTodos()
    }, [])

    const addTodo = () => {

        if (!todo.trim()) {
            Swal.fire({
                title: "افزودن وظیفه",
                text: "لطفا مقادیر را وارد کنید",
                icon: "error",
                confirmButtonText: "باشه",
                confirmButtonColor: "#357ABD",
            })
        } else {
            const newTodo = {
                id: allTodos.length + 1,
                title: todo,
                isComplete: false
            }

            const updatedTodos = [newTodo, ...(Array.isArray(allTodos) ? allTodos : [])]
            setAllTodos(updatedTodos)
            localStorage.setItem('todos', JSON.stringify(updatedTodos))

            Swal.fire({
                title: "افزودن تسک",
                text: "تسک با موفقیت اضافه شد",
                icon: "success",
                confirmButtonText: "باشه",
                confirmButtonColor: "#357ABD",
            })
            setTodo('')
        }
    }

    const addTodoWithEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            addTodo()
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
                    confirmButtonColor: "#357ABD",
                })
            }
        })
    }

    const completeTodo = (id) => {
        const todos = allTodos.map(todo => {
            if (todo.id === id) {
                return { ...todo, isComplete: !todo.isComplete }
            }
            return todo
        })
        setAllTodos(todos)
        localStorage.setItem('todos', JSON.stringify(todos))
    }
    return (
        <>
            <div className='flex justify-center'>
                <PageTitle title={"لیست تسک ها"} />
            </div>
            <div className='p-5 flex flex-col py-10 gap-y-10'>
                <div className='flex justify-evenly'>
                    <input onKeyDown={e => addTodoWithEnter(e)} type="text" value={todo} className='border border-neutral-500 dark:border-white lg:w-[30%] sm:w-[60%] rounded-[8px] px-2 outline-0 focus:border-[#357ABD] focus:placeholder:text-[#357ABD] bg-white' onChange={e => setTodo(e.target.value)} placeholder='عنوان تسک جدید...' />
                    <button onClick={addTodo} className='lg:w-[150px] sm:w-[100px] h-[40px] bg-[#4A90E2] dark:bg-[#5DADEC] text-white  dark:text-[#1F2A44] dark:hover:bg-[#82C1F0] hover:bg-[#357ABD] rounded-[8px] cursor-pointer transition-colors'>ثبت</button>
                </div>
                <div className='flex flex-col gap-y-2 p-3 border border-[#d4e0ed] dark:border-[#3A4A6B] rounded-[8px] dark:bg-[#2D3748]'>
                    {!allTodos.length && <h2 className='text-center text-xl text-red-500 mt-3 w-full font-bold'>هیچ تسکی وجود ندارد</h2>}
                    {allTodos.map(todo => (
                        <TodoBox key={todo.id} {...todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
                    ))}
                </div>
            </div>
        </>
    )
}
