import React from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'

export function Landing() {
    return (
        <div className='bg-cyan-100 h-[70vh] flex flex-col justify-center items-center rounded-3xl'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold'>ทำให้การกรอกเเบบฟอร์มเป็นเรื่องง่าย</h1>
                <p className='text-xl'>ตัวช่วยในการกรอกเเบบฟอร์มของมหาวิทยาลัยสงขลานครินทร์</p>
            </div>
            <div>
                <button type="button" className="mt-6 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">ไปกันเลย !!</button>
            </div>
        </div>
    )
}

function HomePage() {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            {Landing()}
            <div className='flex h-screen lg:px-10 items-start'>
                <div className='flex flex-col'>
                <div className='space-y-7'>
                    <div className='pt-10 space-x-3 flex flex-row'>
                        <div className='flex space-x-3'>
                            <div className='bg-cyan-100 w-[7vw] rounded-full max-lg:hidden'></div>
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9 7H7V9H9V7Z" fill="currentColor" />
                                <path d="M7 13V11H9V13H7Z" fill="currentColor" />
                                <path d="M7 15V17H9V15H7Z" fill="currentColor" />
                                <path d="M11 15V17H17V15H11Z" fill="currentColor" />
                                <path d="M17 13V11H11V13H17Z" fill="currentColor" />
                                <path d="M17 7V9H11V7H17Z" fill="currentColor" />
                            </svg>
                            <span className='text-2xl font-semibold'>แบบฟอร์มทั่วไป</span>
                            <div className='bg-cyan-100 w-[70vw] rounded-full'></div>
                        </div>
                    </div>
                    <div className='lg:px-24 flex flex-wrap space-x-5'>
                        <Link href="/">
                            <div className='flex flex-col items-center hover:bg-slate-100 p-4 rounded-full'>
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                                    <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                                    <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <h1>คำร้องทั่วไป</h1>
                            </div>
                        </Link>
                        <Link href="/">
                            <div className='flex flex-col items-center hover:bg-slate-100 p-4 rounded-full'>
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                                    <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                                    <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <h1>คำร้องขอทำบัตรประจำตัวนักศึกษา</h1>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='space-y-7'>
                    <div className='pt-10 space-x-3 flex flex-row'>
                        <div className='flex space-x-3'>
                            <div className='bg-cyan-100 w-[7vw] rounded-full max-lg:hidden'></div>
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9 7H7V9H9V7Z" fill="currentColor" />
                                <path d="M7 13V11H9V13H7Z" fill="currentColor" />
                                <path d="M7 15V17H9V15H7Z" fill="currentColor" />
                                <path d="M11 15V17H17V15H11Z" fill="currentColor" />
                                <path d="M17 13V11H11V13H17Z" fill="currentColor" />
                                <path d="M17 7V9H11V7H17Z" fill="currentColor" />
                            </svg>
                            <span className='text-2xl font-semibold'>แบบฟอร์มคนที่เจ็บ</span>
                            <div className='bg-cyan-100 w-[68vw] rounded-full'></div>
                        </div>
                    </div>
                    <div className='lg:px-24 flex flex-wrap space-x-5'>
                        <Link href="/">
                            <div className='flex flex-col items-center hover:bg-slate-100 p-4 rounded-full'>
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                                    <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                                    <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <h1>คำร้องที่จะลืมเธอ</h1>
                            </div>
                        </Link>
                        <Link href="/">
                            <div className='flex flex-col items-center hover:bg-slate-100 p-4 rounded-full'>
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                                    <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                                    <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <h1>คำร้องให้เขากลับมา</h1>
                            </div>
                        </Link>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage